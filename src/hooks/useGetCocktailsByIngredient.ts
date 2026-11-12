import { useQuery } from "@tanstack/react-query";
import ninjasClient from "../api/ninjasClient";
import type { Cocktail } from "../types/cocktail";

const getCocktailsByIngredient = async (
  ingredient: string,
): Promise<Cocktail[]> => {
  const { data } = await ninjasClient.get<Cocktail[]>("/cocktail", {
    params: { ingredients: ingredient },
  });
  return data;
};

export const useGetCocktailsByIngredient = (ingredient: string | undefined) =>
  useQuery({
    queryKey: ["cocktails", "ingredient", ingredient],
    queryFn: () => getCocktailsByIngredient(ingredient!),
    enabled: Boolean(ingredient),
    staleTime: Infinity,
  });
