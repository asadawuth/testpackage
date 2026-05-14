export function dayToMonth(days: number) {
  const months = Math.floor(days / 30);
  const remainDays = days % 30;

  if (months === 0) return `${remainDays} วัน`;
  if (remainDays === 0) return `${months} เดือน`;

  return `${months} เดือน ${remainDays} วัน`;
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("th-TH");
}

export function formatDateTime(date: string) {
  return new Date(date).toLocaleString("th-TH", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
