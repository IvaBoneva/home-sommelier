import CircularProgress from "@mui/material/CircularProgress";

interface LoadingStateProps {
  message?: string;
}

function LoadingState({ message = "Loading…" }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-muted">
      <CircularProgress />
      <span>{message}</span>
    </div>
  );
}

export default LoadingState;
