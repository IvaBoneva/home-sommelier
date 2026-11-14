import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import MoodEntriesTable from "../components/MoodEntriesTable";
import { useGetMoodEntries } from "../hooks/useGetMoodEntries";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import MoodStats from "../components/MoodStats";
import { groupEntries, type GroupBy } from "../utils/moodStats";

function JournalPage() {
  const { data: entries, isLoading, isError, refetch } = useGetMoodEntries();
  const [groupBy, setGroupBy] = useState<GroupBy>("none");

  const sortedEntries = useMemo(
    () =>
      [...(entries ?? [])].sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt),
      ),
    [entries],
  );

  const groups = useMemo(
    () => groupEntries(sortedEntries, groupBy),
    [sortedEntries, groupBy],
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
      <h1 className="text-3xl font-bold mb-6">Дневник на настроенията</h1>

      <MoodStats entries={sortedEntries} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <p className="text-gray-500">Общо {sortedEntries.length} записа</p>
        <ToggleButtonGroup
          value={groupBy}
          exclusive
          size="small"
          onChange={(_, value: GroupBy | null) => value && setGroupBy(value)}
        >
          <ToggleButton value="none">Всички</ToggleButton>
          <ToggleButton value="mood">По настроение</ToggleButton>
          <ToggleButton value="week">По седмица</ToggleButton>
        </ToggleButtonGroup>
      </div>

      <div className="flex flex-col gap-6">
        {groups.map((group) => (
          <section key={group.key}>
            {group.title && (
              <h2 className="text-lg font-semibold mb-2">
                {group.title}{" "}
                <span className="text-gray-500 font-normal">
                  ({group.entries.length})
                </span>
              </h2>
            )}
            <MoodEntriesTable entries={group.entries} />
          </section>
        ))}
      </div>
    </div>
  );
}

export default JournalPage;
