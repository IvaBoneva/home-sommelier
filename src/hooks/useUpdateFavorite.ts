import { useMutation, useQueryClient } from "@tanstack/react-query";
import localClient from "../api/localClient";
import type { Favorite } from "../types/favorite";

const updateFavorite = async (favorite: Favorite): Promise<Favorite> => {
  const { data } = await localClient.put<Favorite>(
    `/favorites/${favorite.id}`,
    favorite,
  );
  return data;
};

export const useUpdateFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};
