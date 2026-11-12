import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { useGetMoviesByGenre } from "../hooks/useGetMoviesByGenre";

function RecommendationsPage() {
  const { data: movies, isLoading, isError } = useGetMoviesByGenre(35);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Препоръки</h2>
      {isLoading && <CircularProgress />}
      {isError && (
        <Alert severity="error">Не успяхме да заредим филмите.</Alert>
      )}
      <ul className="list-disc pl-6">
        {movies?.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecommendationsPage;
