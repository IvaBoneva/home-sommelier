import { useQuery } from "@tanstack/react-query";
import ninjasClient from "../api/ninjasClient";
import type { Cocktail } from "../types/cocktail";

const getCocktailByName = async (name: string): Promise<Cocktail | null> => {
  const { data } = await ninjasClient.get<Cocktail[]>("/cocktail", {
    params: { name },
  });

  const exactMatch = data.find(
    (cocktail) => cocktail.name.toLowerCase() === name.toLowerCase(),
  );
  return exactMatch ?? data[0] ?? null;
};

export const useGetCocktailByName = (name: string | undefined) =>
  useQuery({
    queryKey: ["cocktail", name],
    queryFn: () => getCocktailByName(name!),
    enabled: Boolean(name),
    staleTime: Infinity,
  });
