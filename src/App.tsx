import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import RecommendationsPage from "./pages/RecommendationsPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import CocktailPage from "./pages/CocktailPage";
import FavoritesPage from "./pages/FavoritesPage";
import JournalPage from "./pages/JournalPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/movies/:id" element={<MovieDetailsPage />} />
        <Route path="/cocktails/:name" element={<CocktailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
