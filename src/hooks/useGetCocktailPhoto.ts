import { useQuery } from "@tanstack/react-query";
import cocktailDbClient from "../api/cocktailDbClient";

interface CocktailDbDrink {
  strDrink: string;
  strDrinkThumb: string;
}

interface CocktailDbResponse {
  drinks: CocktailDbDrink[] | null;
}

export interface CocktailPhotoResult {
  url: string;
  isExact: boolean;
}

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const getCocktailPhoto = async (
  name: string,
): Promise<CocktailPhotoResult | null> => {
  const { data } = await cocktailDbClient.get<CocktailDbResponse>(
    "/search.php",
    {
      params: { s: name },
    },
  );

  const drinks = data.drinks ?? [];
  if (drinks.length === 0) return null;

  const target = normalize(name);

  const exact = drinks.find((drink) => normalize(drink.strDrink) === target);
  if (exact) return { url: exact.strDrinkThumb, isExact: true };

  const contains = drinks.find((drink) => {
    const candidate = normalize(drink.strDrink);
    return candidate.includes(target) || target.includes(candidate);
  });
  if (contains) return { url: contains.strDrinkThumb, isExact: false };

  return { url: drinks[0].strDrinkThumb, isExact: false };
};

export const useGetCocktailPhoto = (name: string | undefined) =>
  useQuery({
    queryKey: ["cocktailPhoto", name],
    queryFn: () => getCocktailPhoto(name!),
    enabled: Boolean(name),
    staleTime: Infinity,
  });
