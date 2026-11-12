import { useQuery } from "@tanstack/react-query";
import tmdbClient from "../api/tmdbClient";
import type { Movie, TmdbPagedResponse } from "../types/movie";

const getMoviesByGenre = async (genreId: number): Promise<Movie[]> => {
  const { data } = await tmdbClient.get<TmdbPagedResponse<Movie>>(
    "/discover/movie",
    {
      params: {
        with_genres: genreId,
        sort_by: "popularity.desc",
      },
    },
  );
  return data.results;
};

export const useGetMoviesByGenre = (genreId: number) =>
  useQuery({
    queryKey: ["movies", "genre", genreId],
    queryFn: () => getMoviesByGenre(genreId),
  });
