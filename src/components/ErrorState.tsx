import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

function ErrorState({
  message = "Нещо се обърка. Опитай отново.",
  onRetry,
}: ErrorStateProps) {
  return (
    <Alert
      severity="error"
      action={
        onRetry && (
          <Button color="inherit" size="small" onClick={onRetry}>
            Опитай пак
          </Button>
        )
      }
    >
      {message}
    </Alert>
  );
}

export default ErrorState;
