interface CommandItem {
  label: string;
  href: string;
}

const isCommandItem = (value: unknown): value is CommandItem => {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<CommandItem>;
  return typeof item.label === "string" && typeof item.href === "string";
};

const isSafeHref = (href: string): boolean => {
  if (href.startsWith("#")) return true;
  if (href.startsWith("/") && !href.startsWith("//")) return true;

  try {
    const url = new URL(href, window.location.origin);
    return url.protocol === "https:" || url.protocol === "mailto:";
  } catch {
    return false;
  }
};

const parseItems = (value: string | undefined): CommandItem[] => {
  if (!value) return [];

  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter(isCommandItem).filter((item) => isSafeHref(item.href)) : [];
  } catch {
    return [];
  }
};

document.querySelectorAll<HTMLDialogElement>("[data-command-palette]").forEach((dialog) => {
  if (dialog.dataset.enhanced === "true") return;
  dialog.dataset.enhanced = "true";

  const input = dialog.querySelector<HTMLInputElement>("[data-command-input]");
  const list = dialog.querySelector<HTMLElement>("[data-command-list]");
  const closeButton = dialog.querySelector<HTMLButtonElement>("[data-command-close]");
  const items = parseItems(dialog.dataset.items);
  if (!input || !list || !closeButton) return;

  const render = (query = "") => {
    const normalizedQuery = query.trim().toLowerCase();
    const matches = items.filter((item) => item.label.toLowerCase().includes(normalizedQuery));

    if (matches.length === 0) {
      const empty = document.createElement("p");
      empty.className = "px-3 py-8 text-center text-sm text-zinc-500";
      empty.textContent = "No results.";
      list.replaceChildren(empty);
      return;
    }

    const links = matches.map((item) => {
      const link = document.createElement("a");
      link.className = "command-option";
      link.href = item.href;

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

  const open = () => {
    if (!dialog.open) dialog.showModal();
    input.value = "";
    render();
    requestAnimationFrame(() => input.focus());
  };

  document.querySelectorAll<HTMLButtonElement>("[data-command-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", open);
  });

  closeButton.addEventListener("click", () => dialog.close());
  input.addEventListener("input", () => render(input.value));

  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    const inside =
      event.clientX >= bounds.left &&
      event.clientX <= bounds.right &&
      event.clientY >= bounds.top &&
      event.clientY <= bounds.bottom;
    if (!inside) dialog.close();
  });

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      dialog.open ? dialog.close() : open();
    }
  });

  render();
});
