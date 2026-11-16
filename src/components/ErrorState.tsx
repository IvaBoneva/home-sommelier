import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

function ErrorState({
  message = "Something went wrong. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <Alert
      severity="error"
      action={
        onRetry && (
          <Button color="inherit" size="small" onClick={onRetry}>
            Try Again
          </Button>
        )
      }
    >
      {message}
    </Alert>
  );
}

export default ErrorState;
