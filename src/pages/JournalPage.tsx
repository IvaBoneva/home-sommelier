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

  if (isLoading) return <LoadingState message="Opening your journal…" />;
  if (isError)
    return (
      <ErrorState
        message="We couldn't load your journal. Please try again."
        onRetry={refetch}
      />
    );

  if (sortedEntries.length === 0) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Mood Journal</h1>
        <p className="text-muted mb-6">
          No entries yet. Tell us how you feel today.
        </p>
        <Button variant="contained" component={Link} to="/">
          Go to Home
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Mood Journal</h1>

      <MoodStats entries={sortedEntries} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <p className="text-muted">Total {sortedEntries.length} entries</p>
        <ToggleButtonGroup
          value={groupBy}
          exclusive
          size="small"
          onChange={(_, value: GroupBy | null) => value && setGroupBy(value)}
        >
          <ToggleButton value="none">All</ToggleButton>
          <ToggleButton value="mood">By Mood</ToggleButton>
          <ToggleButton value="week">By Week</ToggleButton>
        </ToggleButtonGroup>
      </div>

      <div className="flex flex-col gap-6">
        {groups.map((group) => (
          <section key={group.key}>
            {group.title && (
              <h2 className="text-lg font-semibold mb-2">
                {group.title}{" "}
                <span className="text-muted font-normal">
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
