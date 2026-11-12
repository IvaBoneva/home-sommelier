import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function NotFoundPage() {
  return (
    <div className="text-center">
      <h2 className="text-5xl font-bold text-rose-700 mb-2">404</h2>
      <p className="mb-6">Тази страница не е в менюто на сомелиера.</p>
      <Button variant="contained" component={Link} to="/">
        Към началото
      </Button>
    </div>
  );
}

export default NotFoundPage;
