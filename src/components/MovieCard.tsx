import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import { getPosterUrl } from "../utils/tmdb";
import type { Movie } from "../types/movie";
import type { MoodId } from "../types/mood";

interface MovieCardProps {
  movie: Movie;
}
interface MovieCardProps {
  movie: Movie;
  moodId?: MoodId;
}

function MovieCard({ movie, moodId }: MovieCardProps) {
  const posterUrl = getPosterUrl(movie.poster_path);
  const year = movie.release_date?.slice(0, 4);
  const detailsUrl = moodId
    ? `/movies/${movie.id}?mood=${moodId}`
    : `/movies/${movie.id}`;

  return (
    <Card className="h-full">
      <CardActionArea
        component={Link}
        to={detailsUrl}
        className="h-full flex flex-col items-stretch"
      >
        {posterUrl ? (
          <CardMedia
            component="img"
            image={posterUrl}
            alt={movie.title}
            className="aspect-[2/3] object-cover"
          />
        ) : (
          <div className="aspect-[2/3] bg-gray-200 flex items-center justify-center text-4xl">
            🎬
          </div>
        )}
        <CardContent className="flex-1">
          <div className="font-semibold leading-tight">{movie.title}</div>
          <div className="text-sm text-gray-500 mb-1">{year}</div>
          <Rating
            value={movie.vote_average / 2}
            precision={0.5}
            readOnly
            size="small"
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;
