import type { Movie } from "../types/movie";

export type MovieSortOption = "popularity" | "rating" | "newest" | "oldest";

export const SORT_LABELS: Record<MovieSortOption, string> = {
  popularity: "Най-популярни",
  rating: "Най-висока оценка",
  newest: "Най-нови",
  oldest: "Най-стари",
};

interface MovieFilterOptions {
  search: string;
  genreId: number | null;
  sortBy: MovieSortOption;
}

export const filterAndSortMovies = (
  movies: Movie[],
  { search, genreId, sortBy }: MovieFilterOptions,
): Movie[] => {
  const query = search.trim().toLowerCase();

  const filtered = movies.filter((movie) => {
    const matchesSearch =
      !query ||
      movie.title.toLowerCase().includes(query) ||
      movie.original_title.toLowerCase().includes(query);
    const matchesGenre = genreId === null || movie.genre_ids.includes(genreId);
    return matchesSearch && matchesGenre;
  });

  return [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.vote_average - a.vote_average;
      case "newest":
        return b.release_date.localeCompare(a.release_date);
      case "oldest":
        return a.release_date.localeCompare(b.release_date);
      default:
        return b.popularity - a.popularity;
    }
  });
};
