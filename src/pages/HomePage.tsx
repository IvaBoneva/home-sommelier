import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MoodCard from "../components/MoodCard";
import { moods } from "../utils/moods";
import { useAddMoodEntry } from "../hooks/useAddMoodEntry";
import type { Mood } from "../types/mood";
import ErrorState from "../components/ErrorState";

function HomePage() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [note, setNote] = useState("");
  const navigate = useNavigate();
  const { mutate: addMoodEntry, isPending, isError } = useAddMoodEntry();

  const handleSubmit = () => {
    if (!selectedMood) return;

    addMoodEntry(
      {
        moodId: selectedMood.id,
        note: note.trim(),
        createdAt: new Date().toISOString(),
      },
      {
        onSuccess: () => navigate(`/recommendations?mood=${selectedMood.id}`),
      },
    );
  };

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

      <div className="max-w-xl mx-auto mt-8 flex flex-col gap-4">
        <TextField
          label="Бележка за деня (по желание)"
          placeholder="Например: дълъг ден в университета…"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          multiline
          minRows={2}
        />

        {isError && (
          <ErrorState message="Не успяхме да запишем настроението. Пуснат ли е сървърът?" />
        )}

        <Button
          variant="contained"
          size="large"
          disabled={!selectedMood || isPending}
          onClick={handleSubmit}
        >
          {isPending ? "Записваме…" : "Подбери ми вечер"}
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
