import type { Cocktail } from "../types/cocktail";

export const pickCocktailForMovie = (
  cocktails: Cocktail[],
  movieId: number,
): Cocktail | undefined =>
  cocktails.length > 0 ? cocktails[movieId % cocktails.length] : undefined;
