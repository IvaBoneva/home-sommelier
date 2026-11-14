import { useMemo } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import MoodEntriesTable from "../components/MoodEntriesTable";
import { useGetMoodEntries } from "../hooks/useGetMoodEntries";

function JournalPage() {
  const { data: entries, isLoading, isError, refetch } = useGetMoodEntries();

  const sortedEntries = useMemo(
    () =>
      [...(entries ?? [])].sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt),
      ),
    [entries],
  );

  if (isLoading) return <LoadingState message="Отваряме дневника…" />;
  if (isError)
    return (
      <ErrorState message="Не успяхме да заредим дневника." onRetry={refetch} />
    );

  if (sortedEntries.length === 0) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Дневник на настроенията</h1>
        <p className="text-gray-500 mb-6">
          Още няма записи. Кажи ни как се чувстваш днес.
        </p>
        <Button variant="contained" component={Link} to="/">
          Към началото
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Дневник на настроенията</h1>
      <p className="text-gray-500 mb-6">Общо {sortedEntries.length} записа</p>
      <MoodEntriesTable entries={sortedEntries} />
    </div>
  );
}

export default JournalPage;
