import type { MoodId } from "./mood";

export interface Favorite {
  id: string;
  movieId: number;
  movieTitle: string;
  posterPath: string | null;
  cocktailName: string;
  moodId: MoodId;
  note: string;
  createdAt: string;
}
