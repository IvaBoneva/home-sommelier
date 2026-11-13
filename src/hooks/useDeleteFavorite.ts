import { useMutation, useQueryClient } from "@tanstack/react-query";
import localClient from "../api/localClient";

const deleteFavorite = async (id: string): Promise<void> => {
  await localClient.delete(`/favorites/${id}`);
};

export const useDeleteFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};
