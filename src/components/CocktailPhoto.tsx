import Skeleton from "@mui/material/Skeleton";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import { useGetCocktailPhoto } from "../hooks/useGetCocktailPhoto";

interface CocktailPhotoProps {
  name: string;
  className?: string;
  showSimilarLabel?: boolean;
}

function CocktailPhoto({
  name,
  className = "",
  showSimilarLabel = true,
}: CocktailPhotoProps) {
  const { data: photo, isLoading } = useGetCocktailPhoto(name);

  if (isLoading) {
    return <Skeleton variant="rounded" className={`!h-auto ${className}`} />;
  }

  if (!photo) {
    return (
      <div
        className={`flex items-center justify-center bg-curtain border border-muted/20 ${className}`}
      >
        <LocalBarIcon className="text-brass/60" sx={{ fontSize: 56 }} />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={photo.url}
        alt={name}
        loading="lazy"
        className="w-full h-full object-cover"
      />
      {!photo.isExact && showSimilarLabel && (
        <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-0.5 text-xs text-ivory">
          Similar drink
        </span>
      )}
    </div>
  );
}

export default CocktailPhoto;
