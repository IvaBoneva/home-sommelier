import { useQuery } from "@tanstack/react-query";
import tmdbClient from "../api/tmdbClient";
import type { Movie, TmdbPagedResponse } from "../types/movie";

const getMoviesByGenres = async (genreIds: number[]): Promise<Movie[]> => {
  const { data } = await tmdbClient.get<TmdbPagedResponse<Movie>>(
    "/discover/movie",
    {
      params: {
        with_genres: genreIds.join("|"),
        sort_by: "popularity.desc",
        "vote_count.gte": 100,
      },
    },
  );
  return data.results;
};

export const useGetMoviesByGenres = (genreIds: number[]) =>
  useQuery({
    queryKey: ["movies", "genres", genreIds],
    queryFn: () => getMoviesByGenres(genreIds),
    enabled: genreIds.length > 0,
  });
