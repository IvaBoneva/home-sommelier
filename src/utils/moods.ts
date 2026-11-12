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

export const moods: Mood[] = [
  {
    id: "happy",
    label: "Весело",
    emoji: "😄",
    description: "Искам да се смея",
    genreIds: [GENRES.comedy, GENRES.animation],
    cocktailIngredient: "rum",
    color: "#f4a261",
  },
  {
    id: "sad",
    label: "Меланхолично",
    emoji: "🌧️",
    description: "Искам да се потопя в история",
    genreIds: [GENRES.drama],
    cocktailIngredient: "whiskey",
    color: "#6c7a89",
  },
  {
    id: "romantic",
    label: "Романтично",
    emoji: "💕",
    description: "Вечер за двама",
    genreIds: [GENRES.romance],
    cocktailIngredient: "champagne",
    color: "#e5989b",
  },
  {
    id: "adventurous",
    label: "Приключенско",
    emoji: "🧭",
    description: "Искам действие",
    genreIds: [GENRES.adventure, GENRES.action],
    cocktailIngredient: "tequila",
    color: "#2a9d8f",
  },
  {
    id: "thrilled",
    label: "За тръпка",
    emoji: "😱",
    description: "Искам напрежение",
    genreIds: [GENRES.thriller, GENRES.horror],
    cocktailIngredient: "vodka",
    color: "#7b1e3a",
  },
  {
    id: "relaxed",
    label: "Спокойно",
    emoji: "😌",
    description: "Нещо леко и уютно",
    genreIds: [GENRES.family],
    cocktailIngredient: "gin",
    color: "#8ab17d",
  },
];

export const getMoodById = (id: MoodId): Mood | undefined =>
  moods.find((mood) => mood.id === id);
