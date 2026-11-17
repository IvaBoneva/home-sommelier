import { useQuery } from "@tanstack/react-query";
import cocktailDbClient from "../api/cocktailDbClient";

interface CocktailDbResponse {
  drinks: { strDrink: string; strDrinkThumb: string }[] | null;
}

const getCocktailPhoto = async (name: string): Promise<string | null> => {
  const { data } = await cocktailDbClient.get<CocktailDbResponse>(
    "/search.php",
    {
      params: { s: name },
    },
  );

  const match = data.drinks?.find(
    (drink) => drink.strDrink.toLowerCase() === name.toLowerCase(),
  );
  return match?.strDrinkThumb ?? null;
};

export const useGetCocktailPhoto = (name: string | undefined) =>
  useQuery({
    queryKey: ["cocktailPhoto", name],
    queryFn: () => getCocktailPhoto(name!),
    enabled: Boolean(name),
    staleTime: Infinity,
  });
