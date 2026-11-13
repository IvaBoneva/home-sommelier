import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import { getMoodById } from "../utils/moods";
import { getPosterUrl } from "../utils/tmdb";
import { formatDate } from "../utils/date";
import type { Favorite } from "../types/favorite";

interface FavoriteCardProps {
  favorite: Favorite;
}

function FavoriteCard({ favorite }: FavoriteCardProps) {
  const mood = getMoodById(favorite.moodId);
  const posterUrl = getPosterUrl(favorite.posterPath, "w185");
  const movieUrl = `/movies/${favorite.movieId}?mood=${favorite.moodId}`;

  return (
    <Card className="flex h-full">
      <Link to={movieUrl} className="shrink-0">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={favorite.movieTitle}
            className="w-24 h-full object-cover"
          />
        ) : (
          <div className="w-24 h-full bg-gray-200 flex items-center justify-center text-3xl">
            🎬
          </div>
        )}
      </Link>

      <CardContent className="flex-1 flex flex-col gap-2">
        <Link to={movieUrl} className="text-lg font-semibold hover:underline">
          {favorite.movieTitle}
        </Link>

        {mood && (
          <Chip
            label={`${mood.emoji} ${mood.label}`}
            size="small"
            className="self-start"
            sx={{ backgroundColor: mood.color, color: "white" }}
          />
        )}

        <Link
          to={`/cocktails/${encodeURIComponent(favorite.cocktailName)}`}
          className="capitalize text-rose-700 hover:underline"
        >
          🍸 {favorite.cocktailName}
        </Link>

        <p className="text-sm italic text-gray-600">
          {favorite.note || "Без бележка"}
        </p>

        <p className="text-xs text-gray-400 mt-auto">
          Запазено на {formatDate(favorite.createdAt)}
        </p>
      </CardContent>
    </Card>
  );
}

export default FavoriteCard;
