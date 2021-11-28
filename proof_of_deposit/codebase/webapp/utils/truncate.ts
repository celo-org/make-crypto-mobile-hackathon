export function truncateAddress(a?: string) {
  if (!a) {
    return '0x';
  }
  return `${a.slice(0, 8)}...${a.slice(36)}`;
}

export function truncate(a: string, length: number) {
  if (a.length > length) {
    return `${a.slice(0, length)}...`;
  }
  return a;
}
