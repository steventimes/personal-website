export interface CommandItem {
  label: string;
  href: string;
  external?: boolean;
}

export const filterCommandItems = (items: CommandItem[], query: string) => {
  const normalized = query.trim().toLowerCase();
  return items.filter((item) => item.label.toLowerCase().includes(normalized));
};

export const nextActiveIndex = (current: number, direction: 1 | -1, count: number) => {
  if (count <= 0) return -1;
  if (current < 0) return direction === 1 ? 0 : count - 1;
  return (current + direction + count) % count;
};
