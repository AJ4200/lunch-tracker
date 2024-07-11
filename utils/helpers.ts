// utils/helpers.ts
export function formatTime(date: Date): string {
  return date
    .toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    })
    .replace(/:\d+\s/, " ");
}
