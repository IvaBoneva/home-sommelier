export const formatDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const formatTime = (isoDate: string) =>
  new Date(isoDate).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
