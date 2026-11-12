import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import Skeleton from "@mui/material/Skeleton";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import { useGetCocktailsByIngredient } from "../hooks/useGetCocktailsByIngredient";
import { pickCocktailForMovie } from "../utils/cocktails";
import type { Mood } from "../types/mood";

interface CocktailPairingCardProps {
  mood: Mood;
  movieId: number;
}

function CocktailPairingCard({ mood, movieId }: CocktailPairingCardProps) {
  const {
    data: cocktails,
    isLoading,
    isError,
  } = useGetCocktailsByIngredient(mood.cocktailIngredient);
  const cocktail = pickCocktailForMovie(cocktails ?? [], movieId);

  return (
    <Card className="mt-8" sx={{ borderLeft: 6, borderColor: mood.color }}>
      <CardContent>
        <div className="flex items-center gap-2 mb-3">
          <LocalBarIcon color="primary" />
          <h2 className="text-xl font-semibold">Коктейл за вечерта</h2>
          <Chip
            label={`${mood.emoji} ${mood.label}`}
            size="small"
            className="ml-auto"
          />
        </div>

        {isLoading && (
          <>
            <Skeleton variant="text" width="50%" height={36} />
            <Skeleton variant="text" width="80%" />
          </>
        )}

        {isError && (
          <Alert severity="error">
            Сомелиерът не успя да намери коктейл. Опитай отново.
          </Alert>
        )}

        {!isLoading && !isError && !cocktail && (
          <Alert severity="info">
            Няма намерен коктейл за това настроение.
          </Alert>
        )}

        {cocktail && (
          <>
            <p className="text-2xl font-bold capitalize">{cocktail.name}</p>
            <p className="text-gray-600 mt-1">
              {cocktail.ingredients.slice(0, 3).join(" · ")}
              {cocktail.ingredients.length > 3 && " …"}
            </p>
            <Button
              variant="contained"
              className="mt-4"
              component={Link}
              to={`/cocktails/${encodeURIComponent(cocktail.name)}`}
            >
              Виж рецептата
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default CocktailPairingCard;
