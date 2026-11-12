import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecommendationsPage from "./pages/RecommendationsPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import CocktailPage from "./pages/CocktailPage";
import FavoritesPage from "./pages/FavoritesPage";
import JournalPage from "./pages/JournalPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/movies/:id" element={<MovieDetailsPage />} />
        <Route path="/cocktails/:name" element={<CocktailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
