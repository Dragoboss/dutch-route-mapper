import { useState } from "react";
import { Participant } from "@/types/participant";
import { Spreadsheet } from "@/components/Spreadsheet";
import { NetherlandsMap } from "@/components/NetherlandsMap";
import { Bus, Mountain } from "lucide-react";

// Sample data
const initialData: Participant[] = [
  {
    id: "1",
    naam: "Jan de Vries",
    woonplaats: "Amsterdam",
    afgesprokenOphaalLocatie: "",
    busNr: 1,
    eigenSkis: true,
    telefoonnummer: "06-12345678",
  },
  {
    id: "2",
    naam: "Emma Bakker",
    woonplaats: "Rotterdam",
    afgesprokenOphaalLocatie: "Utrecht",
    busNr: 2,
    eigenSkis: false,
    telefoonnummer: "06-23456789",
  },
  {
    id: "3",
    naam: "Lucas Jansen",
    woonplaats: "Groningen",
    afgesprokenOphaalLocatie: "",
    busNr: 1,
    eigenSkis: true,
    telefoonnummer: "06-34567890",
  },
  {
    id: "4",
    naam: "Sophie Visser",
    woonplaats: "Eindhoven",
    afgesprokenOphaalLocatie: "Den Bosch",
    busNr: 3,
    eigenSkis: false,
    telefoonnummer: "06-45678901",
  },
  {
    id: "5",
    naam: "Daan Smit",
    woonplaats: "Maastricht",
    afgesprokenOphaalLocatie: "",
    busNr: 3,
    eigenSkis: true,
    telefoonnummer: "06-56789012",
  },
];

const Index = () => {
  const [participants, setParticipants] = useState<Participant[]>(initialData);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const busStats = participants.reduce(
    (acc, p) => {
      if (p.busNr) acc[p.busNr] = (acc[p.busNr] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Mountain className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Ski Reis Planner
                </h1>
                <p className="text-sm text-muted-foreground">
                  Beheer deelnemers en busroutes
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-bus-1/10 border border-bus-1/20">
                  <Bus className="w-4 h-4 text-bus-1" />
                  <span className="font-medium text-bus-1">
                    Bus 1: {busStats[1] || 0}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-bus-2/10 border border-bus-2/20">
                  <Bus className="w-4 h-4 text-bus-2" />
                  <span className="font-medium text-bus-2">
                    Bus 2: {busStats[2] || 0}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-bus-3/10 border border-bus-3/20">
                  <Bus className="w-4 h-4 text-bus-3" />
                  <span className="font-medium text-bus-3">
                    Bus 3: {busStats[3] || 0}
                  </span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {participants.length}
                </span>{" "}
                deelnemers totaal
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
          {/* Spreadsheet */}
          <div className="min-h-[400px] lg:min-h-0">
            <Spreadsheet
              data={participants}
              onDataChange={setParticipants}
              selectedId={selectedId}
              onSelectParticipant={setSelectedId}
            />
          </div>

          {/* Map */}
          <div className="min-h-[400px] lg:min-h-0">
            <NetherlandsMap
              participants={participants}
              selectedId={selectedId}
              onSelectParticipant={setSelectedId}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
