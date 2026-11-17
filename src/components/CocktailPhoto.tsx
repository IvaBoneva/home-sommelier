import Skeleton from "@mui/material/Skeleton";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import { useGetCocktailPhoto } from "../hooks/useGetCocktailPhoto";

interface CocktailPhotoProps {
  name: string;
  className?: string;
}

function CocktailPhoto({ name, className = "" }: CocktailPhotoProps) {
  const { data: photoUrl, isLoading } = useGetCocktailPhoto(name);

  if (isLoading) {
    return <Skeleton variant="rounded" className={`!h-auto ${className}`} />;
  }

  if (!photoUrl) {
    return (
      <div
        className={`flex items-center justify-center bg-curtain border border-muted/20 ${className}`}
      >
        <LocalBarIcon className="text-brass/60" sx={{ fontSize: 56 }} />
      </div>
    );
  }

  return (
    <img
      src={photoUrl}
      alt={name}
      loading="lazy"
      className={`object-cover ${className}`}
    />
  );
}

export default CocktailPhoto;
