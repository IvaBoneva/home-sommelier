import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import MovieCard from "../components/MovieCard";
import MovieFilters from "../components/MovieFilters";
import { useGetMoviesByGenres } from "../hooks/useGetMoviesByGenres";
import { getMoodById } from "../utils/moods";
import {
  filterAndSortMovies,
  type MovieSortOption,
} from "../utils/movieFilters";
import type { MoodId } from "../types/mood";

function RecommendationsPage() {
  const [searchParams] = useSearchParams();
  const moodId = searchParams.get("mood") as MoodId | null;
  const mood = moodId ? getMoodById(moodId) : undefined;

  const [search, setSearch] = useState("");
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<MovieSortOption>("popularity");

  const {
    data: movies,
    isLoading,
    isError,
  } = useGetMoviesByGenres(mood?.genreIds ?? []);

  const availableGenreIds = useMemo(
    () => [...new Set(movies?.flatMap((movie) => movie.genre_ids) ?? [])],
    [movies],
  );

  const visibleMovies = useMemo(
    () =>
      filterAndSortMovies(movies ?? [], {
        search,
        genreId: selectedGenreId,
        sortBy,
      }),
    [movies, search, selectedGenreId, sortBy],
  );

  if (!mood) {
    return (
      <div className="text-center">
        <p className="mb-4">
          Първо избери как се чувстваш, за да ти препоръчаме нещо.
        </p>
        <Button variant="contained" component={Link} to="/">
          Избери настроение
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {mood.emoji} Препоръки за {mood.label.toLowerCase()} настроение
      </h1>

      <MovieFilters
        search={search}
        onSearchChange={setSearch}
        genreIds={availableGenreIds}
        selectedGenreId={selectedGenreId}
        onGenreChange={setSelectedGenreId}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {isLoading && (
        <div className="flex justify-center py-10">
          <CircularProgress />
        </div>
      )}
      {isError && (
        <Alert severity="error">
          Не успяхме да заредим филмите. Опитай отново.
        </Alert>
      )}

      {movies && (
        <p className="text-sm text-gray-500 mb-3">
          Показани {visibleMovies.length} от {movies.length} филма
        </p>
      )}

      {movies && visibleMovies.length === 0 && (
        <Alert severity="info">
          Няма филми, които отговарят на търсенето. Опитай с други филтри.
        </Alert>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {visibleMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} moodId={mood.id} />
        ))}
      </div>
    </div>
  );
}

export default RecommendationsPage;
