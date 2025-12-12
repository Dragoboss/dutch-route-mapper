import { useState } from "react";
import { Participant, ParticipantKey } from "@/types/participant";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SpreadsheetProps {
  data: Participant[];
  onDataChange: (data: Participant[]) => void;
  selectedId: string | null;
  onSelectParticipant: (id: string | null) => void;
}

const columns: { key: ParticipantKey; label: string; width: string }[] = [
  { key: "naam", label: "Naam", width: "w-40" },
  { key: "woonplaats", label: "Woonplaats", width: "w-36" },
  { key: "afgesprokenOphaalLocatie", label: "Afgesproken ophaal locatie", width: "w-48" },
  { key: "busNr", label: "Bus nr.", width: "w-20" },
  { key: "eigenSkis", label: "Eigen ski's/snowboard", width: "w-40" },
  { key: "telefoonnummer", label: "Telefoonnummer", width: "w-36" },
];

export function Spreadsheet({
  data,
  onDataChange,
  selectedId,
  onSelectParticipant,
}: SpreadsheetProps) {
  const [editingCell, setEditingCell] = useState<{
    id: string;
    key: ParticipantKey;
  } | null>(null);

  const handleCellChange = (
    id: string,
    key: ParticipantKey,
    value: string | boolean | number | null
  ) => {
    const newData = data.map((row) => {
      if (row.id === id) {
        return { ...row, [key]: value };
      }
      return row;
    });
    onDataChange(newData);
  };

  const handleAddRow = () => {
    const newParticipant: Participant = {
      id: crypto.randomUUID(),
      naam: "",
      woonplaats: "",
      afgesprokenOphaalLocatie: "",
      busNr: null,
      eigenSkis: false,
      telefoonnummer: "",
    };
    onDataChange([...data, newParticipant]);
  };

  const handleDeleteRow = (id: string) => {
    onDataChange(data.filter((row) => row.id !== id));
    if (selectedId === id) {
      onSelectParticipant(null);
    }
  };

  const renderCell = (participant: Participant, key: ParticipantKey) => {
    const value = participant[key];
    const isEditing =
      editingCell?.id === participant.id && editingCell?.key === key;

    if (key === "busNr") {
      return (
        <select
          value={value === null ? "" : String(value)}
          onChange={(e) => {
            const newValue = e.target.value === "" ? null : Number(e.target.value) as 1 | 2 | 3;
            handleCellChange(participant.id, key, newValue);
          }}
          className={cn(
            "w-full h-full bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary/50 text-sm",
            value === 1 && "text-bus-1 font-medium",
            value === 2 && "text-bus-2 font-medium",
            value === 3 && "text-bus-3 font-medium"
          )}
        >
          <option value="">-</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      );
    }

    if (key === "eigenSkis") {
      return (
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) =>
              handleCellChange(participant.id, key, e.target.checked)
            }
            className="w-4 h-4 rounded border-border text-primary focus:ring-primary/50 cursor-pointer"
          />
        </div>
      );
    }

    if (isEditing) {
      return (
        <input
          type="text"
          value={String(value || "")}
          onChange={(e) => handleCellChange(participant.id, key, e.target.value)}
          onBlur={() => setEditingCell(null)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Escape") {
              setEditingCell(null);
            }
          }}
          autoFocus
          className="w-full h-full bg-transparent border-0 focus:outline-none text-sm"
        />
      );
    }

    return (
      <div
        onClick={() => setEditingCell({ id: participant.id, key })}
        className="w-full h-full cursor-text truncate"
      >
        {String(value || "")}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border border-border overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border">
        <h2 className="font-semibold text-foreground">Deelnemers</h2>
        <Button
          onClick={handleAddRow}
          size="sm"
          className="gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Toevoegen
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="spreadsheet-header">
              <th className="spreadsheet-cell w-10 text-center">#</th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn("spreadsheet-cell text-left", col.width)}
                >
                  {col.label}
                </th>
              ))}
              <th className="spreadsheet-cell w-12"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((participant, index) => (
              <tr
                key={participant.id}
                onClick={() => onSelectParticipant(participant.id)}
                className={cn(
                  "cursor-pointer transition-colors",
                  selectedId === participant.id
                    ? "bg-primary/10"
                    : "hover:bg-muted/50"
                )}
              >
                <td className="spreadsheet-cell text-center text-muted-foreground text-xs">
                  {index + 1}
                </td>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn("spreadsheet-cell", col.width)}
                  >
                    {renderCell(participant, col.key)}
                  </td>
                ))}
                <td className="spreadsheet-cell">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteRow(participant.id);
                    }}
                    className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="spreadsheet-cell text-center py-8 text-muted-foreground"
                >
                  Geen deelnemers. Klik op "Toevoegen" om te beginnen.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
