# 🍸 HomeSommelier

Tell HomeSommelier how you feel, and it plans your evening: a movie that fits your mood and a cocktail to go with it. Save the evenings you loved and keep a journal of your moods over time.

Course project for **Web Design** — built with React, TypeScript, Material UI and Tailwind CSS.

## Features

- **Mood picker** – six moods styled as cinema tickets; every choice is saved to your mood journal.
- **Recommendations** – movies matched to your mood, with search, genre filter and sorting.
- **Movie details** – backdrop, poster, rating, genres and description, plus a cocktail paired with the movie.
- **Cocktail recipes** – ingredients, method and a photo, with a **non-alcoholic version** toggle.
- **Favorites** – save a movie + cocktail evening, add a note, edit it or delete it.
- **Mood journal** – every mood in a table, grouped by mood or by week, with statistics and a donut chart.
- Responsive layout for mobile and desktop, loading skeletons and clear error messages with retry.

## Tech stack

| Area          | Tools                                |
| ------------- | ------------------------------------ |
| UI            | React 19, TypeScript, Vite           |
| Components    | Material UI, MUI X Charts, MUI Icons |
| Styling       | Tailwind CSS v4                      |
| Routing       | React Router                         |
| Data fetching | TanStack React Query, Axios          |
| Local backend | json-server                          |

## Data sources

- [TMDB](https://www.themoviedb.org/) – movies, posters and backdrops
- [API Ninjas – Cocktail API](https://api-ninjas.com/api/cocktail) – cocktail recipes
- [TheCocktailDB](https://www.thecocktaildb.com/) – cocktail photos
- **json-server** (`db.json`) – favorites and mood journal (full CRUD)

## Getting started

### Requirements

- Node.js 20 or newer
- A free [TMDB API Read Access Token](https://www.themoviedb.org/settings/api)
- A free [API Ninjas key](https://api-ninjas.com/register)

### Setup

```bash
git clone https://github.com/IvaBoneva/home-sommelier.git
cd home-sommelier
npm install
```

Copy `.env.example` to `.env` and fill in your keys:

```
VITE_TMDB_TOKEN=your_tmdb_read_access_token
VITE_NINJAS_KEY=your_api_ninjas_key
VITE_LOCAL_API_URL=http://localhost:3001
```

### Run

The app needs two terminals:

```bash
npm run server   # json-server on http://localhost:3001
npm run dev      # the app on http://localhost:5173
```

### Other scripts

```bash
npm run build    # type-check and build for production
npm run lint     # run ESLint
```

## Project structure

```
src/
  api/          Axios clients (TMDB, API Ninjas, TheCocktailDB, json-server)
  hooks/        Custom React Query hooks — every request lives here
  components/   Reusable UI components
  pages/        Route pages
  types/        TypeScript types
  utils/        Mood config, filtering, grouping, mocktail logic, formatting
```

## Pages

| Route                     | Page                             |
| ------------------------- | -------------------------------- |
| `/`                       | Mood picker                      |
| `/recommendations?mood=…` | Movie recommendations            |
| `/movies/:id`             | Movie details + cocktail pairing |
| `/cocktails/:name`        | Cocktail recipe                  |
| `/favorites`              | Saved evenings                   |
| `/journal`                | Mood journal and statistics      |
| `*`                       | 404 page                         |

## Requests

| Operation | Method | Hooks                                                                                                                                                              |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Create    | POST   | `useAddFavorite`, `useAddMoodEntry`                                                                                                                                |
| Read      | GET    | `useGetMoviesByGenres`, `useGetMovieDetails`, `useGetCocktailsByIngredient`, `useGetCocktailByName`, `useGetCocktailPhoto`, `useGetFavorites`, `useGetMoodEntries` |
| Update    | PUT    | `useUpdateFavorite`, `useUpdateMoodEntry`                                                                                                                          |
| Delete    | DELETE | `useDeleteFavorite`, `useDeleteMoodEntry`                                                                                                                          |

## Author

Iva Boneva
