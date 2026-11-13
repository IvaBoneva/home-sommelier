import { useMutation, useQueryClient } from "@tanstack/react-query";
import localClient from "../api/localClient";
import type { Favorite } from "../types/favorite";

type NewFavorite = Omit<Favorite, "id">;

const addFavorite = async (favorite: NewFavorite): Promise<Favorite> => {
  const { data } = await localClient.post<Favorite>("/favorites", favorite);
  return data;
};

export const useAddFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};
