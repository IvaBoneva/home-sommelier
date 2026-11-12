import { Link, useSearchParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import MovieCard from "../components/MovieCard";
import { useGetMoviesByGenres } from "../hooks/useGetMoviesByGenres";
import { getMoodById } from "../utils/moods";
import type { MoodId } from "../types/mood";

function RecommendationsPage() {
  const [searchParams] = useSearchParams();
  const moodId = searchParams.get("mood") as MoodId | null;
  const mood = moodId ? getMoodById(moodId) : undefined;

  const {
    data: movies,
    isLoading,
    isError,
  } = useGetMoviesByGenres(mood?.genreIds ?? []);

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

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default RecommendationsPage;
