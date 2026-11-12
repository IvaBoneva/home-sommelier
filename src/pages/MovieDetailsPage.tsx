import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { isAxiosError } from "axios";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import Skeleton from "@mui/material/Skeleton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useGetMovieDetails } from "../hooks/useGetMovieDetails";
import { getPosterUrl } from "../utils/tmdb";
import CocktailPairingCard from "../components/CocktailPairingCard";
import { getMoodById, getMoodForGenres } from "../utils/moods";
import type { MoodId } from "../types/mood";

function MovieDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: movie, isLoading, isError, error } = useGetMovieDetails(id);

  const backButton = (
    <Button
      startIcon={<ArrowBackIcon />}
      onClick={() => navigate(-1)}
      className="mb-4"
    >
      Назад
    </Button>
  );

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        <Skeleton variant="rounded" className="aspect-[2/3] w-full !h-auto" />
        <div>
          <Skeleton variant="text" height={50} width="70%" />
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="rounded" height={120} className="mt-4" />
        </div>
      </div>
    );
  }

  if (isError || !movie) {
    const isNotFound = isAxiosError(error) && error.response?.status === 404;
    return (
      <div>
        {backButton}
        <Alert severity="error">
          {isNotFound
            ? "Този филм не съществува."
            : "Не успяхме да заредим филма. Опитай отново."}
        </Alert>
      </div>
    );
  }

  const posterUrl = getPosterUrl(movie.poster_path);
  const year = movie.release_date?.slice(0, 4);

  const moodIdFromUrl = searchParams.get("mood") as MoodId | null;
  const mood =
    (moodIdFromUrl && getMoodById(moodIdFromUrl)) ||
    getMoodForGenres(movie.genres.map((genre) => genre.id));

  return (
    <div>
      {backButton}

      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full rounded-xl shadow-lg"
          />
        ) : (
          <div className="aspect-[2/3] bg-gray-200 rounded-xl flex items-center justify-center text-6xl">
            🎬
          </div>
        )}

        <div>
          <h1 className="text-3xl md:text-4xl font-bold">{movie.title}</h1>
          {movie.tagline && (
            <p className="italic text-gray-500 mt-1">{movie.tagline}</p>
          )}

          <p className="text-gray-600 mt-3">
            {year}
            {movie.runtime ? ` · ${movie.runtime} мин.` : ""}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <Rating value={movie.vote_average / 2} precision={0.5} readOnly />
            <span className="text-gray-600">
              {movie.vote_average.toFixed(1)} / 10
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {movie.genres.map((genre) => (
              <Chip key={genre.id} label={genre.name} variant="outlined" />
            ))}
          </div>

          <h2 className="text-xl font-semibold mt-6 mb-2">За филма</h2>
          <p className="leading-relaxed">
            {movie.overview || "Няма описание на български за този филм."}
          </p>
          <CocktailPairingCard mood={mood} movieId={movie.id} />
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
