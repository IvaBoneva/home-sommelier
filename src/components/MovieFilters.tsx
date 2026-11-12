import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import { GENRE_LABELS } from "../utils/moods";
import { SORT_LABELS, type MovieSortOption } from "../utils/movieFilters";

interface MovieFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  genreIds: number[];
  selectedGenreId: number | null;
  onGenreChange: (genreId: number | null) => void;
  sortBy: MovieSortOption;
  onSortChange: (value: MovieSortOption) => void;
}

function MovieFilters({
  search,
  onSearchChange,
  genreIds,
  selectedGenreId,
  onGenreChange,
  sortBy,
  onSortChange,
}: MovieFiltersProps) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <TextField
          label="Търси филм"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />

        <FormControl className="md:w-60">
          <InputLabel id="sort-label">Подреди по</InputLabel>
          <Select
            labelId="sort-label"
            label="Подреди по"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as MovieSortOption)}
          >
            {Object.entries(SORT_LABELS).map(([value, label]) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="flex flex-wrap gap-2">
        <Chip
          label="Всички"
          color={selectedGenreId === null ? "primary" : "default"}
          onClick={() => onGenreChange(null)}
        />
        {genreIds.map((id) => (
          <Chip
            key={id}
            label={GENRE_LABELS[id] ?? "Друго"}
            color={selectedGenreId === id ? "primary" : "default"}
            onClick={() => onGenreChange(id)}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieFilters;
