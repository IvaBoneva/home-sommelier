import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import type { Mood } from "../types/mood";

interface MoodCardProps {
  mood: Mood;
  isSelected: boolean;
  onSelect: (mood: Mood) => void;
}

function MoodCard({ mood, isSelected, onSelect }: MoodCardProps) {
  return (
    <Card
      className="ticket h-48 border-4 transition hover:-translate-y-1"
      sx={{
        borderColor: isSelected ? mood.color : "transparent",
        "&:hover": {
          borderColor: isSelected ? mood.color : `${mood.color}99`,
        },
      }}
    >
      <CardActionArea
        onClick={() => onSelect(mood)}
        className="h-full flex flex-col items-stretch"
      >
        <div className="h-[64%] flex flex-col items-center justify-center gap-1">
          <span className="text-5xl">{mood.emoji}</span>
          <span className="text-lg font-semibold">{mood.label}</span>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 text-center text-sm text-muted bg-black/15 border-t-2 border-dashed border-muted/40">
          {mood.description}
        </div>
      </CardActionArea>
    </Card>
  );
}

export default MoodCard;
