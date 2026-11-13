import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import { getMoodById } from "../utils/moods";
import { getPosterUrl } from "../utils/tmdb";
import { formatDate } from "../utils/date";
import type { Favorite } from "../types/favorite";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import EditNoteDialog from "./EditNoteDialog";
import { useUpdateFavorite } from "../hooks/useUpdateFavorite";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "./ConfirmDialog";
import { useDeleteFavorite } from "../hooks/useDeleteFavorite";

interface FavoriteCardProps {
  favorite: Favorite;
}

function FavoriteCard({ favorite }: FavoriteCardProps) {
  const mood = getMoodById(favorite.moodId);
  const posterUrl = getPosterUrl(favorite.posterPath, "w185");
  const movieUrl = `/movies/${favorite.movieId}?mood=${favorite.moodId}`;

  const [isEditOpen, setIsEditOpen] = useState(false);
  const {
    mutate: updateFavorite,
    isPending,
    isError,
    reset,
  } = useUpdateFavorite();

  const handleSaveNote = (note: string) => {
    updateFavorite(
      { ...favorite, note },
      { onSuccess: () => setIsEditOpen(false) },
    );
  };

  const handleCloseDialog = () => {
    setIsEditOpen(false);
    reset();
  };

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const {
    mutate: deleteFavorite,
    isPending: isDeleting,
    isError: isDeleteError,
    reset: resetDelete,
  } = useDeleteFavorite();

  const handleCloseDelete = () => {
    setIsDeleteOpen(false);
    resetDelete();
  };

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
        <div className="flex items-start gap-2">
          <Link
            to={movieUrl}
            className="text-lg font-semibold hover:underline flex-1"
          >
            {favorite.movieTitle}
          </Link>
          <IconButton
            size="small"
            onClick={() => setIsEditOpen(true)}
            aria-label="Редактирай бележката"
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setIsDeleteOpen(true)}
            aria-label="Изтрий от любими"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
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

      {isEditOpen && (
        <EditNoteDialog
          title={favorite.movieTitle}
          initialNote={favorite.note}
          isSaving={isPending}
          hasError={isError}
          onClose={handleCloseDialog}
          onSave={handleSaveNote}
        />
      )}

      {isDeleteOpen && (
        <ConfirmDialog
          title="Да изтрием ли вечерта?"
          message={`„${favorite.movieTitle}“ с коктейл ${favorite.cocktailName} ще бъде премахнат от любими.`}
          isLoading={isDeleting}
          hasError={isDeleteError}
          onConfirm={() => deleteFavorite(favorite.id)}
          onClose={handleCloseDelete}
        />
      )}
    </Card>
  );
}

export default FavoriteCard;
