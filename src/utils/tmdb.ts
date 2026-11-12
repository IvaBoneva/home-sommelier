const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const getPosterUrl = (posterPath: string | null, size = "w500") =>
  posterPath ? `${IMAGE_BASE_URL}/${size}${posterPath}` : null;
