import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import FavoriteCard from "../components/FavoriteCard";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import { useGetFavorites } from "../hooks/useGetFavorites";
import { moods } from "../utils/moods";
import type { MoodId } from "../types/mood";

function FavoritesPage() {
  const { data: favorites, isLoading, isError, refetch } = useGetFavorites();
  const [moodFilter, setMoodFilter] = useState<MoodId | null>(null);

  const countsByMood = useMemo(
    () =>
      (favorites ?? []).reduce<Partial<Record<MoodId, number>>>(
        (counts, favorite) => {
          counts[favorite.moodId] = (counts[favorite.moodId] ?? 0) + 1;
          return counts;
        },
        {},
      ),
    [favorites],
  );

  const visibleFavorites = useMemo(
    () =>
      (favorites ?? [])
        .filter(
          (favorite) => moodFilter === null || favorite.moodId === moodFilter,
        )
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [favorites, moodFilter],
  );

  if (isLoading) return <LoadingState message="Отваряме любимите ти вечери…" />;
  if (isError)
    return (
      <ErrorState message="Не успяхме да заредим любимите." onRetry={refetch} />
    );

  if (!favorites || favorites.length === 0) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Любими</h1>
        <p className="text-gray-500 mb-6">Още нямаш запазени вечери.</p>
        <Button variant="contained" component={Link} to="/">
          Подбери първата
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Любими вечери</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <Chip
          label={`Всички (${favorites.length})`}
          color={moodFilter === null ? "primary" : "default"}
          onClick={() => setMoodFilter(null)}
        />
        {moods
          .filter((mood) => countsByMood[mood.id])
          .map((mood) => (
            <Chip
              key={mood.id}
              label={`${mood.emoji} ${mood.label} (${countsByMood[mood.id]})`}
              color={moodFilter === mood.id ? "primary" : "default"}
              onClick={() => setMoodFilter(mood.id)}
            />
          ))}
      </div>

      {visibleFavorites.length === 0 && (
        <Alert severity="info">Няма любими с това настроение.</Alert>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {visibleFavorites.map((favorite) => (
          <FavoriteCard key={favorite.id} favorite={favorite} />
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
