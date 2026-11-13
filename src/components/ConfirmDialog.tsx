import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmLabel?: string;
  isLoading: boolean;
  hasError: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

function ConfirmDialog({
  title,
  message,
  confirmLabel = "Изтрий",
  isLoading,
  hasError,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
        {hasError && (
          <p className="text-sm text-red-600 mt-2">
            Не успяхме да изтрием. Опитай отново.
          </p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Откажи</Button>
        <Button
          color="error"
          variant="contained"
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? "Изтриваме…" : confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
