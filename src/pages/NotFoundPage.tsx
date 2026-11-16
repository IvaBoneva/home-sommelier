import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function NotFoundPage() {
  return (
    <div className="text-center">
      <h2 className="text-5xl font-bold text-rose-700 mb-2">404</h2>
      <p className="mb-6">This page isn't on the sommelier's menu.</p>
      <Button variant="contained" component={Link} to="/">
        Back to Home
      </Button>
    </div>
  );
}

export default NotFoundPage;
