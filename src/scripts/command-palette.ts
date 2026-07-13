import {
  filterCommandItems,
  nextActiveIndex,
  type CommandItem
} from "../lib/commands";

const isCommandItem = (value: unknown): value is CommandItem => {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<CommandItem>;
  return (
    typeof item.label === "string" &&
    item.label.trim().length > 0 &&
    typeof item.href === "string" &&
    item.href.length > 0 &&
    (item.external === undefined || typeof item.external === "boolean")
  );
};

const isSafeHref = (href: string): boolean => {
  if (href !== href.trim() || /[\u0000-\u001f\u007f]/.test(href)) return false;
  if (href.startsWith("#")) return href.length > 1;

  try {
    const url = new URL(href, window.location.origin);
    if (href.startsWith("/")) {
      return !href.startsWith("//") && url.origin === window.location.origin;
    }

    if (url.username || url.password) return false;
    return url.protocol === "https:" || url.protocol === "mailto:";
  } catch {
    return false;
  }
};

const parseItems = (value: string | undefined): CommandItem[] | null => {
  if (!value) return null;

  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return null;
    return parsed.filter(isCommandItem).filter((item) => isSafeHref(item.href));
  } catch {
    return null;
  }
};

document.querySelectorAll<HTMLDialogElement>("[data-command-palette]").forEach((dialog) => {
  if (dialog.dataset.enhanced === "true") return;

  const input = dialog.querySelector<HTMLInputElement>("[data-command-input]");
  const list = dialog.querySelector<HTMLElement>("[data-command-list]");
  const closeButton = dialog.querySelector<HTMLButtonElement>("[data-command-close]");
  const status = dialog.querySelector<HTMLElement>("[data-command-status]");
  const triggers = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-command-trigger]"));
  const items = parseItems(dialog.dataset.items);
  if (!input || !list || !closeButton || !status || !items || triggers.length === 0) return;

  let matches = items;
  let activeIndex = -1;

  const optionLinks = () => Array.from(list.querySelectorAll<HTMLAnchorElement>("[role='option']"));

  const setExpanded = (expanded: boolean) => {
    triggers.forEach((trigger) => trigger.setAttribute("aria-expanded", String(expanded)));
    input.setAttribute("aria-expanded", String(expanded));
  };

  const setActiveIndex = (index: number) => {
    const links = optionLinks();
    activeIndex = index;

    links.forEach((link, optionIndex) => {
      link.setAttribute("aria-selected", String(optionIndex === activeIndex));
    });

    const activeLink = links[activeIndex];
    if (!activeLink) {
      input.removeAttribute("aria-activedescendant");
      return;
    }

    input.setAttribute("aria-activedescendant", activeLink.id);
    activeLink.scrollIntoView({ block: "nearest" });
  };

  const render = (query = "") => {
    matches = filterCommandItems(items, query);
    activeIndex = -1;
    input.removeAttribute("aria-activedescendant");
    status.textContent = `${matches.length} ${matches.length === 1 ? "result" : "results"}.`;

    if (matches.length === 0) {
      const empty = document.createElement("p");
      empty.className = "px-3 py-8 text-center text-sm text-zinc-500";
      empty.textContent = "No matching destination.";
      list.replaceChildren(empty);
      return;
    }

    const links = matches.map((item) => {
      const link = document.createElement("a");
      link.className = "command-option";
      link.id = `${dialog.id || "command-palette"}-option-${items.indexOf(item)}`;
      link.href = item.href;
      link.setAttribute("role", "option");
      link.setAttribute("aria-selected", "false");
      if (item.external) {
        link.target = "_blank";
        link.rel = "noreferrer";
      }

      const label = document.createElement("span");
      label.className = "block font-medium";
      label.textContent = item.label;

      const destination = document.createElement("span");
      destination.className = "mt-0.5 block truncate text-xs text-zinc-500";
      destination.textContent = item.href;

      link.append(label, destination);
      link.addEventListener("click", () => dialog.close());
      return link;
    });

    list.replaceChildren(...links);
  };

  const close = () => {
    if (dialog.open) dialog.close();
    setExpanded(false);
    setActiveIndex(-1);
  };

  const open = () => {
    if (!dialog.open) dialog.showModal();
    setExpanded(true);
    input.value = "";
    render();
    requestAnimationFrame(() => input.focus());
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", open);
  });

  closeButton.addEventListener("click", close);
  input.addEventListener("input", () => render(input.value));
  input.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex(nextActiveIndex(activeIndex, direction, matches.length));
      return;
    }

    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      optionLinks()[activeIndex]?.click();
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }

    if (event.key === "Tab") close();
  });

  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    const inside =
      event.clientX >= bounds.left &&
      event.clientX <= bounds.right &&
      event.clientY >= bounds.top &&
      event.clientY <= bounds.bottom;
    if (!inside) close();
  });
  dialog.addEventListener("close", () => {
    setExpanded(false);
    setActiveIndex(-1);
  });

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      dialog.open ? close() : open();
    }
  });

  const isMacOS = /Macintosh|Mac OS X/.test(navigator.userAgent);
  triggers.forEach((trigger) => {
    const shortcut = trigger.querySelector<HTMLElement>("[data-command-shortcut]");
    if (shortcut) shortcut.textContent = isMacOS ? "⌘K" : "Ctrl K";
  });

  render();
  setExpanded(false);
  dialog.dataset.enhanced = "true";
  triggers.forEach((trigger) => {
    trigger.hidden = false;
  });
});
