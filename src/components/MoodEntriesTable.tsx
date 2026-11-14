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

interface MoodEntriesTableProps {
  entries: MoodEntry[];
}

function MoodEntriesTable({ entries }: MoodEntriesTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Дата</TableCell>
            <TableCell>Настроение</TableCell>
            <TableCell className="hidden sm:table-cell">Бележка</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((entry) => {
            const mood = getMoodById(entry.moodId);
            return (
              <TableRow key={entry.id} hover>
                <TableCell className="whitespace-nowrap">
                  <div>{formatDate(entry.createdAt)}</div>
                  <div className="text-xs text-gray-500">
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
                </TableCell>
                <TableCell className="hidden sm:table-cell text-gray-600">
                  {entry.note || (
                    <span className="italic text-gray-400">Без бележка</span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MoodEntriesTable;
