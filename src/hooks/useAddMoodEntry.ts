import { useMutation, useQueryClient } from "@tanstack/react-query";
import localClient from "../api/localClient";
import type { MoodEntry } from "../types/mood";

type NewMoodEntry = Omit<MoodEntry, "id">;

const addMoodEntry = async (entry: NewMoodEntry): Promise<MoodEntry> => {
  const { data } = await localClient.post<MoodEntry>("/moods", entry);
  return data;
};

export const useAddMoodEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addMoodEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["moods"] });
    },
  });
};
