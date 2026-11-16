import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const MAX_LENGTH = 200;

interface EditNoteDialogProps {
  title: string;
  initialNote: string;
  isSaving: boolean;
  hasError: boolean;
  onClose: () => void;
  onSave: (note: string) => void;
}

function EditNoteDialog({
  title,
  initialNote,
  isSaving,
  hasError,
  onClose,
  onSave,
}: EditNoteDialogProps) {
  const [note, setNote] = useState(initialNote);

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Note for “{title}”</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          multiline
          minRows={3}
          fullWidth
          margin="dense"
          placeholder="Who did you watch it with? Did you like the cocktail?"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          slotProps={{ htmlInput: { maxLength: MAX_LENGTH } }}
          helperText={`${note.length} / ${MAX_LENGTH}`}
        />
        {hasError && (
          <p className="text-sm text-red-300 mt-2">
            We couldn't save the note.
          </p>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() => onSave(note.trim())}
          disabled={isSaving}
        >
          {isSaving ? "Saving…" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditNoteDialog;
