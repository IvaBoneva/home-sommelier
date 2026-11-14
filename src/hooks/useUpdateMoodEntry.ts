import { useMutation, useQueryClient } from "@tanstack/react-query";
import localClient from "../api/localClient";
import type { MoodEntry } from "../types/mood";

const updateMoodEntry = async (entry: MoodEntry): Promise<MoodEntry> => {
  const { data } = await localClient.put<MoodEntry>(
    `/moods/${entry.id}`,
    entry,
  );
  return data;
};

export const useUpdateMoodEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMoodEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["moods"] });
    },
  });
};
