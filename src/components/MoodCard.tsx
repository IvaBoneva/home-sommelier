import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import type { Mood } from "../types/mood";

interface MoodCardProps {
  mood: Mood;
  isSelected: boolean;
  onSelect: (mood: Mood) => void;
}

function MoodCard({ mood, isSelected, onSelect }: MoodCardProps) {
  return (
    <Card
      className="border-4 transition-transform hover:-translate-y-1"
      sx={{ borderColor: isSelected ? mood.color : "transparent" }}
    >
      <CardActionArea onClick={() => onSelect(mood)}>
        <CardContent className="text-center">
          <div className="text-5xl mb-2">{mood.emoji}</div>
          <div className="text-lg font-semibold">{mood.label}</div>
          <div className="text-sm text-gray-500">{mood.description}</div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MoodCard;
