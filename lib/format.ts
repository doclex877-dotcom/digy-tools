export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function percentChange(before: number, after: number): string {
  const change = ((before - after) / before) * 100;
  const sign = change >= 0 ? "−" : "+";
  return `${sign}${Math.abs(change).toFixed(0)}%`;
}
