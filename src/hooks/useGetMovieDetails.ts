import { useQuery } from "@tanstack/react-query";
import tmdbClient from "../api/tmdbClient";
import type { MovieDetails } from "../types/movie";

const getMovieDetails = async (id: string): Promise<MovieDetails> => {
  const { data } = await tmdbClient.get<MovieDetails>(`/movie/${id}`);
  return data;
};

export const useGetMovieDetails = (id: string | undefined) =>
  useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieDetails(id!),
    enabled: Boolean(id),
  });
