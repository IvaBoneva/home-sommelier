import { getMoodById } from "./moods";
import { formatDate } from "./date";
import type { MoodEntry, MoodId } from "../types/mood";

export type GroupBy = "none" | "mood" | "week";

export interface EntryGroup {
  key: string;
  title: string;
  entries: MoodEntry[];
}

export const countByMood = (entries: MoodEntry[]) =>
  entries.reduce<Partial<Record<MoodId, number>>>((counts, entry) => {
    counts[entry.moodId] = (counts[entry.moodId] ?? 0) + 1;
    return counts;
  }, {});

export const getWeekStart = (isoDate: string): string => {
  const date = new Date(isoDate);
  const daysSinceMonday = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - daysSinceMonday);
  date.setHours(0, 0, 0, 0);
  return date.toISOString();
};

export const groupEntries = (
  entries: MoodEntry[],
  groupBy: GroupBy,
): EntryGroup[] => {
  if (groupBy === "none") {
    return [{ key: "all", title: "", entries }];
  }

  const groups = entries.reduce<Record<string, MoodEntry[]>>(
    (result, entry) => {
      const key =
        groupBy === "mood" ? entry.moodId : getWeekStart(entry.createdAt);
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(entry);
      return result;
    },
    {},
  );

  const list = Object.entries(groups).map(([key, groupItems]) => {
    const mood = groupBy === "mood" ? getMoodById(key as MoodId) : undefined;
    return {
      key,
      title: mood
        ? `${mood.emoji} ${mood.label}`
        : `Седмица от ${formatDate(key)}`,
      entries: groupItems,
    };
  });

  return groupBy === "week"
    ? list.sort((a, b) => b.key.localeCompare(a.key))
    : list.sort((a, b) => b.entries.length - a.entries.length);
};
