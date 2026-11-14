import { PieChart } from "@mui/x-charts/PieChart";
import { moods } from "../utils/moods";
import { countByMood } from "../utils/moodStats";
import type { MoodEntry } from "../types/mood";

interface MoodPieChartProps {
  entries: MoodEntry[];
}

function MoodPieChart({ entries }: MoodPieChartProps) {
  const counts = countByMood(entries);
  const total = entries.length;

  const data = moods
    .filter((mood) => counts[mood.id])
    .map((mood) => ({
      id: mood.id,
      value: counts[mood.id] ?? 0,
      label: `${mood.emoji} ${mood.label}`,
      color: mood.color,
    }));

  return (
    <PieChart
      height={240}
      series={[
        {
          data,
          innerRadius: 50,
          paddingAngle: 2,
          cornerRadius: 4,
          highlightScope: { fade: "global", highlight: "item" },
          arcLabel: (item) => `${Math.round((item.value / total) * 100)}%`,
          arcLabelMinAngle: 25,
        },
      ]}
      sx={{
        "& .MuiPieArcLabel-root": {
          fill: "white",
          fontWeight: "bold",
        },
      }}
    />
  );
}

export default MoodPieChart;
