import { useQuery } from "@tanstack/react-query";
import localClient from "../api/localClient";
import type { Favorite } from "../types/favorite";

const getFavorites = async (): Promise<Favorite[]> => {
  const { data } = await localClient.get<Favorite[]>("/favorites");
  return data;
};

export const useGetFavorites = () =>
  useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });
