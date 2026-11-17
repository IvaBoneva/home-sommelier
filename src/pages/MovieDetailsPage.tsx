import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { isAxiosError } from "axios";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import Skeleton from "@mui/material/Skeleton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useGetMovieDetails } from "../hooks/useGetMovieDetails";
import { getBackdropUrl, getPosterUrl } from "../utils/tmdb";
import CocktailPairingCard from "../components/CocktailPairingCard";
import { getMoodById, getMoodForGenres } from "../utils/moods";
import type { MoodId } from "../types/mood";
import ErrorState from "../components/ErrorState";

function MovieDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    data: movie,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetMovieDetails(id);

  const backButton = (
    <Button
      startIcon={<ArrowBackIcon />}
      onClick={() => navigate(-1)}
      className="mb-4"
    >
      Back
    </Button>
  );

  if (isLoading) {
    return (
      <div>
        {backButton}
        <Skeleton variant="rounded" className="!h-48 md:!h-80 mb-6" />
        <div className="relative grid md:grid-cols-[300px_1fr] gap-8 md:-mt-28">
          <Skeleton variant="rounded" className="aspect-[2/3] w-full !h-auto" />
          <div>
            <Skeleton variant="text" height={50} width="70%" />
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="rounded" height={120} className="mt-4" />
          </div>
        </div>
        <Skeleton variant="rounded" height={160} className="mt-8" />
      </div>
    );
  }

  if (isError || !movie) {
    const isNotFound = isAxiosError(error) && error.response?.status === 404;
    return (
      <div>
        {backButton}
        <ErrorState
          message={
            isNotFound
              ? "This movie doesn't exist."
              : "We couldn't load this movie."
          }
          onRetry={isNotFound ? undefined : refetch}
        />
      </div>
    );
  }

  const posterUrl = getPosterUrl(movie.poster_path);
  const backdropUrl = getBackdropUrl(movie.backdrop_path);
  const year = movie.release_date?.slice(0, 4);

  const moodIdFromUrl = searchParams.get("mood") as MoodId | null;
  const mood =
    (moodIdFromUrl && getMoodById(moodIdFromUrl)) ||
    getMoodForGenres(movie.genres.map((genre) => genre.id));

  return (
    <div>
      {backButton}

      {backdropUrl && (
        <div className="relative h-48 md:h-80 rounded-2xl overflow-hidden mb-6">
          <img
            src={backdropUrl}
            alt=""
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-linear-to-t from-velvet from-5% via-velvet/60 to-velvet/10" />
        </div>
      )}

      <div
        className={`relative grid md:grid-cols-[300px_1fr] gap-8 ${
          backdropUrl ? "md:-mt-28" : ""
        }`}
      >
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full rounded-xl shadow-2xl ring-4 ring-velvet"
          />
        ) : (
          <div className="aspect-[2/3] bg-curtain rounded-xl ring-4 ring-velvet flex items-center justify-center text-6xl">
            🎬
          </div>
        )}

        <div>
          <h1 className="text-3xl md:text-4xl font-bold">{movie.title}</h1>
          {movie.tagline && (
            <p className="italic text-muted mt-1">{movie.tagline}</p>
          )}
          <p className="text-muted mt-3">
            {year}
            {movie.runtime ? ` · ${movie.runtime} min` : ""}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Rating value={movie.vote_average / 2} precision={0.5} readOnly />
            <span className="text-muted">
              {movie.vote_average.toFixed(1)} / 10
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {movie.genres.map((genre) => (
              <Chip key={genre.id} label={genre.name} variant="outlined" />
            ))}
          </div>
          <h2 className="text-xl font-semibold mt-6 mb-2">About the movie</h2>
          <p className="leading-relaxed">
            {movie.overview || "No description available."}
          </p>
        </div>
      </div>
      <CocktailPairingCard mood={mood} movie={movie} />
    </div>
  );
}

export default MovieDetailsPage;
