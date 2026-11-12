import { useState } from "react";
import MoodCard from "../components/MoodCard";
import { moods } from "../utils/moods";
import type { Mood } from "../types/mood";

function HomePage() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-2">
        Как се чувстваш днес?
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Избери настроение и ще ти подберем филм и коктейл за вечерта.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {moods.map((mood) => (
          <MoodCard
            key={mood.id}
            mood={mood}
            isSelected={selectedMood?.id === mood.id}
            onSelect={setSelectedMood}
          />
        ))}
      </div>

      {selectedMood && (
        <p className="text-center mt-6">
          Избра: {selectedMood.emoji} {selectedMood.label}
        </p>
      )}
    </div>
  );
}

export default HomePage;
