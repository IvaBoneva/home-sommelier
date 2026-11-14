import { useQuery } from "@tanstack/react-query";
import localClient from "../api/localClient";
import type { MoodEntry } from "../types/mood";

const getMoodEntries = async (): Promise<MoodEntry[]> => {
  const { data } = await localClient.get<MoodEntry[]>("/moods");
  return data;
};

export const useGetMoodEntries = () =>
  useQuery({
    queryKey: ["moods"],
    queryFn: getMoodEntries,
  });
