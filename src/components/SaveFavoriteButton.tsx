import { useState } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useGetFavorites } from "../hooks/useGetFavorites";
import { useAddFavorite } from "../hooks/useAddFavorite";
import type { MovieDetails } from "../types/movie";
import type { MoodId } from "../types/mood";

interface SaveFavoriteButtonProps {
  movie: MovieDetails;
  cocktailName: string;
  moodId: MoodId;
}

function SaveFavoriteButton({
  movie,
  cocktailName,
  moodId,
}: SaveFavoriteButtonProps) {
  const { data: favorites } = useGetFavorites();
  const { mutate: addFavorite, isPending, isError } = useAddFavorite();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const isSaved =
    favorites?.some((favorite) => favorite.movieId === movie.id) ?? false;

  const handleSave = () => {
    addFavorite(
      {
        movieId: movie.id,
        movieTitle: movie.title,
        posterPath: movie.poster_path,
        cocktailName,
        moodId,
        note: "",
        createdAt: new Date().toISOString(),
      },
      { onSuccess: () => setIsSnackbarOpen(true) },
    );
  };

  return (
    <>
      <Button
        variant={isSaved ? "outlined" : "contained"}
        color="secondary"
        startIcon={isSaved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        disabled={isSaved || isPending}
        onClick={handleSave}
      >
        {isSaved ? "Запазено в любими" : "Запази вечерта"}
      </Button>

      {isError && (
        <p className="text-sm text-red-600 mt-2">
          Не успяхме да запазим. Пуснат ли е сървърът?
        </p>
      )}

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setIsSnackbarOpen(false)}
        message="Вечерта е запазена в Любими 💕"
      />
    </>
  );
}

export default SaveFavoriteButton;
