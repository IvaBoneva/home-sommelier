import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { useGetMoviesByGenre } from "./hooks/useGetMoviesByGenre";

function App() {
  const { data: movies, isLoading, isError } = useGetMoviesByGenre(35); // 35 = комедия

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-bold text-rose-700 text-center mb-6">
        HomeSommelier
      </h1>

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

export default App;
