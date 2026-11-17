import { useNavigate, useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useGetCocktailByName } from "../hooks/useGetCocktailByName";
import { useState } from "react";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Chip from "@mui/material/Chip";
import { toMocktailIngredients } from "../utils/mocktail";
import ErrorState from "../components/ErrorState";
import CocktailPhoto from "../components/CocktailPhoto";

function CocktailPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const {
    data: cocktail,
    isLoading,
    isError,
    refetch,
  } = useGetCocktailByName(name);
  const [isMocktail, setIsMocktail] = useState(false);

  const backButton = (
    <Button
      startIcon={<ArrowBackIcon />}
      onClick={() => navigate(-1)}
      className="mb-4"
    >
      Back
    </Button>
  );

  if (isLoading) {
    return (
      <div>
        {backButton}
        <Skeleton variant="text" width="50%" height={60} className="mb-6" />
        <div className="grid md:grid-cols-[280px_1fr] gap-6">
          <Skeleton
            variant="rounded"
            className="w-full aspect-square !h-auto"
          />
          <div className="grid lg:grid-cols-2 gap-6">
            <Skeleton variant="rounded" height={240} />
            <Skeleton variant="rounded" height={240} />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        {backButton}
        <ErrorState message="We couldn't load the recipe." onRetry={refetch} />
      </div>
    );
  }

  if (!cocktail) {
    return (
      <div>
        {backButton}
        <Alert severity="info">No cocktail named “{name}” was found.</Alert>
      </div>
    );
  }

  const ingredients = isMocktail
    ? toMocktailIngredients(cocktail.ingredients)
    : cocktail.ingredients.map((text) => ({ text, isReplaced: false }));

  return (
    <div>
      {backButton}

      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
        <div className="flex items-center gap-3">
          <LocalBarIcon color="primary" fontSize="large" />
          <h1 className="text-3xl md:text-4xl font-bold capitalize">
            {cocktail.name}
          </h1>
          {isMocktail && (
            <Chip label="non-alcoholic" color="success" size="small" />
          )}
        </div>
        <FormControlLabel
          className="md:ml-auto"
          control={
            <Switch
              checked={isMocktail}
              onChange={(e) => setIsMocktail(e.target.checked)}
            />
          }
          label="Non-alcoholic version"
        />
      </div>

      <div className="grid md:grid-cols-[280px_1fr] gap-6">
        <CocktailPhoto
          name={cocktail.name}
          className="w-full aspect-square rounded-xl"
        />
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
              <List dense>
                {ingredients.map((ingredient) => (
                  <ListItem key={ingredient.text} disableGutters>
                    <ListItemIcon className="!min-w-6">
                      <FiberManualRecordIcon
                        className="!text-xs"
                        color={ingredient.isReplaced ? "success" : "primary"}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={ingredient.text}
                      secondary={
                        ingredient.isReplaced ? "instead of alcohol" : undefined
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">Preparation</h2>
              <p className="leading-relaxed">{cocktail.instructions}</p>
              {isMocktail && (
                <Alert severity="success" className="mt-4">
                  Follow the same steps, using the ingredients from the
                  non-alcoholic version.
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CocktailPage;
