import { useMutation, useQueryClient } from "@tanstack/react-query";
import localClient from "../api/localClient";

const deleteMoodEntry = async (id: string): Promise<void> => {
  await localClient.delete(`/moods/${id}`);
};

export const useDeleteMoodEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMoodEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["moods"] });
    },
  });
};
