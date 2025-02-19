export const formatDate = (date) => {
  if (!(date instanceof Date) || isNaN(date)) return "Invalid Date";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(date);
};

export function dateFormatter(dateString) {
  if (!dateString) return "Invalid Date";

  const inputDate = new Date(dateString);
  if (isNaN(inputDate)) return "Invalid Date";

  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Kolkata",
  })
    .format(inputDate)
    .split("/")
    .reverse()
    .join("-");
}

export function getInitials(fullName) {
  if (!fullName?.trim()) return "";

  const names = fullName.trim().split(/\s+/);
  return names
    .slice(0, 2)
    .map((name) => name[0].toUpperCase())
    .join("");
}

export const PRIORITY_STYLES = {
  high: "text-red-600",
  medium: "text-yellow-600",
  low: "text-green-600",
};

export const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-orange-600",
  completed: "bg-green-600",
};

export const BGS = [
  "bg-blue-600",
  "bg-yellow-600",
  "bg-red-600",
  "bg-green-600",
];
