import { useParams } from "react-router-dom";

function CocktailPage() {
  const { name } = useParams();
  return <h2 className="text-2xl font-semibold">Коктейл: {name}</h2>;
}

export default CocktailPage;
