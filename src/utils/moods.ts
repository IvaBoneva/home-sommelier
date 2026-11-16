import type { Mood, MoodId } from "../types/mood";

// Номерата на жанровете са фиксирани от TMDB
export const GENRES = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  drama: 18,
  family: 10751,
  horror: 27,
  romance: 10749,
  thriller: 53,
} as const;

export const GENRE_LABELS: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

export const moods: Mood[] = [
  {
    id: "happy",
    label: "Happy",
    emoji: "😄",
    description: "I want to laugh",
    genreIds: [GENRES.comedy, GENRES.animation],
    cocktailIngredient: "rum",
    color: "#f4a261",
  },
  {
    id: "sad",
    label: "Melancholic",
    emoji: "🌧️",
    description: "I want to get lost in a story",
    genreIds: [GENRES.drama],
    cocktailIngredient: "whiskey",
    color: "#6c7a89",
  },
  {
    id: "romantic",
    label: "Romantic",
    emoji: "💕",
    description: "A night for two",
    genreIds: [GENRES.romance],
    cocktailIngredient: "champagne",
    color: "#e5989b",
  },
  {
    id: "adventurous",
    label: "Adventurous",
    emoji: "🧭",
    description: "I want some action",
    genreIds: [GENRES.adventure, GENRES.action],
    cocktailIngredient: "tequila",
    color: "#2a9d8f",
  },
  {
    id: "thrilled",
    label: "Thrilled",
    emoji: "😱",
    description: "I want suspense",
    genreIds: [GENRES.thriller, GENRES.horror],
    cocktailIngredient: "vodka",
    color: "#7b1e3a",
  },
  {
    id: "relaxed",
    label: "Relaxed",
    emoji: "😌",
    description: "Something light and cozy",
    genreIds: [GENRES.family],
    cocktailIngredient: "gin",
    color: "#8ab17d",
  },
];

export const getMoodById = (id: MoodId): Mood | undefined =>
  moods.find((mood) => mood.id === id);

export const getMoodForGenres = (genreIds: number[]): Mood =>
  moods.find((mood) => mood.genreIds.some((id) => genreIds.includes(id))) ??
  moods.find((mood) => mood.id === "relaxed")!;
