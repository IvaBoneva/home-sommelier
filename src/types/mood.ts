export type MoodId =
  | "happy"
  | "sad"
  | "romantic"
  | "adventurous"
  | "thrilled"
  | "relaxed";

export interface Mood {
  id: MoodId;
  label: string;
  emoji: string;
  description: string;
  genreIds: number[];
  cocktailIngredient: string;
  color: string;
}

export interface MoodEntry {
  id: string;
  moodId: MoodId;
  note: string;
  createdAt: string;
}
