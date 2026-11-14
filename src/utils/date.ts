export const formatDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString("bg-BG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const formatTime = (isoDate: string) =>
  new Date(isoDate).toLocaleTimeString("bg-BG", {
    hour: "2-digit",
    minute: "2-digit",
  });
