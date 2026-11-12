import { useParams } from "react-router-dom";

function MovieDetailsPage() {
  const { id } = useParams();
  return <h2 className="text-2xl font-semibold">Филм с id {id}</h2>;
}

export default MovieDetailsPage;
