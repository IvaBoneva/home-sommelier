export const formatDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString("bg-BG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
