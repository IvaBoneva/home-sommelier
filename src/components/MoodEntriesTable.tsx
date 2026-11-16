import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import { getMoodById } from "../utils/moods";
import { formatDate, formatTime } from "../utils/date";
import type { MoodEntry } from "../types/mood";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteDialog from "./EditNoteDialog";
import ConfirmDialog from "./ConfirmDialog";
import { useUpdateMoodEntry } from "../hooks/useUpdateMoodEntry";
import { useDeleteMoodEntry } from "../hooks/useDeleteMoodEntry";

interface MoodEntriesTableProps {
  entries: MoodEntry[];
}

function MoodEntriesTable({ entries }: MoodEntriesTableProps) {
  const [editingEntry, setEditingEntry] = useState<MoodEntry | null>(null);
  const [deletingEntry, setDeletingEntry] = useState<MoodEntry | null>(null);
  const updateMutation = useUpdateMoodEntry();
  const deleteMutation = useDeleteMoodEntry();

  const describe = (entry: MoodEntry) => {
    const mood = getMoodById(entry.moodId);
    return `${mood?.emoji ?? ""} ${mood?.label ?? ""}, ${formatDate(entry.createdAt)}`;
  };

  const handleSaveNote = (note: string) => {
    if (!editingEntry) return;
    updateMutation.mutate(
      { ...editingEntry, note },
      { onSuccess: () => setEditingEntry(null) },
    );
  };

  const handleDelete = () => {
    if (!deletingEntry) return;
    deleteMutation.mutate(deletingEntry.id, {
      onSuccess: () => setDeletingEntry(null),
    });
  };

  const closeEdit = () => {
    setEditingEntry(null);
    updateMutation.reset();
  };

  const closeDelete = () => {
    setDeletingEntry(null);
    deleteMutation.reset();
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Mood</TableCell>
              <TableCell className="hidden sm:table-cell">Note</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry) => {
              const mood = getMoodById(entry.moodId);
              return (
                <TableRow key={entry.id} hover>
                  <TableCell className="whitespace-nowrap">
                    <div>{formatDate(entry.createdAt)}</div>
                    <div className="text-xs text-muted">
                      {formatTime(entry.createdAt)}
                    </div>
                  </TableCell>

                  <TableCell>
                    {mood && (
                      <Chip
                        label={`${mood.emoji} ${mood.label}`}
                        size="small"
                        sx={{ backgroundColor: mood.color, color: "white" }}
                      />
                    )}
                    {entry.note && (
                      <p className="sm:hidden text-sm text-muted mt-1">
                        {entry.note}
                      </p>
                    )}
                  </TableCell>

                  <TableCell className="hidden sm:table-cell text-muted">
                    {entry.note || (
                      <span className="italic text-muted">No note</span>
                    )}
                  </TableCell>

                  <TableCell align="right" className="whitespace-nowrap">
                    <IconButton
                      size="small"
                      onClick={() => setEditingEntry(entry)}
                      aria-label="Edit note"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => setDeletingEntry(entry)}
                      aria-label="Delete entry"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {editingEntry && (
        <EditNoteDialog
          title={describe(editingEntry)}
          initialNote={editingEntry.note}
          isSaving={updateMutation.isPending}
          hasError={updateMutation.isError}
          onClose={closeEdit}
          onSave={handleSaveNote}
        />
      )}

      {deletingEntry && (
        <ConfirmDialog
          title="Delete this entry?"
          message={`The entry „${describe(deletingEntry)}“ will be removed from your journal.`}
          isLoading={deleteMutation.isPending}
          hasError={deleteMutation.isError}
          onConfirm={handleDelete}
          onClose={closeDelete}
        />
      )}
    </>
  );
}

export default MoodEntriesTable;
