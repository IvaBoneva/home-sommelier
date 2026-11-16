import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LinearProgress from "@mui/material/LinearProgress";
import { moods } from "../utils/moods";
import { countByMood } from "../utils/moodStats";
import type { MoodEntry } from "../types/mood";
import MoodPieChart from "./MoodPieChart";

interface MoodStatsProps {
  entries: MoodEntry[];
}

function MoodStats({ entries }: MoodStatsProps) {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const counts = countByMood(entries);
  const total = entries.length;

  const topMood = moods.reduce((best, mood) =>
    (counts[mood.id] ?? 0) > (counts[best.id] ?? 0) ? mood : best,
  );
  const topCount = counts[topMood.id] ?? 0;

  return (
    <Card className="mb-6">
      <CardContent>
        <p className="text-gray-500">Most frequently you feel</p>
        <p className="text-2xl font-bold mb-4">
          {topMood.emoji} {topMood.label}
          <span className="text-base font-normal text-gray-500">
            {" "}
            · {topCount} of {total} entries
          </span>
        </p>

        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="flex flex-col gap-3">
            {moods.map((mood, index) => {
              const count = counts[mood.id] ?? 0;
              const percent = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={mood.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>
                      {mood.emoji} {mood.label}
                    </span>
                    <span className="text-gray-500">
                      {count} ({percent}%)
                    </span>
                  </div>
                  <LinearProgress
                    variant="determinate"
                    value={isAnimated ? percent : 0}
                    className="h-2 rounded"
                    sx={{
                      backgroundColor: "#eee",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: mood.color,
                        transition: "transform 1s ease-out",
                        transitionDelay: `${index * 100}ms`,
                      },
                    }}
                  />
                </div>
              );
            })}
          </div>

          <MoodPieChart entries={entries} />
        </div>
      </CardContent>
    </Card>
  );
}

export default MoodStats;
