import { useMemo } from "react";
import { Participant } from "@/types/participant";
import { findCityCoordinates } from "@/data/dutchCities";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NetherlandsMapProps {
  participants: Participant[];
  selectedId: string | null;
  onSelectParticipant: (id: string | null) => void;
}

// Netherlands bounding box (approximate)
const BOUNDS = {
  north: 53.5,
  south: 50.75,
  west: 3.35,
  east: 7.25,
};

const MAP_WIDTH = 400;
const MAP_HEIGHT = 500;

function latLngToXY(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * MAP_WIDTH;
  const y = ((BOUNDS.north - lat) / (BOUNDS.north - BOUNDS.south)) * MAP_HEIGHT;
  return { x, y };
}

export function NetherlandsMap({
  participants,
  selectedId,
  onSelectParticipant,
}: NetherlandsMapProps) {
  const markers = useMemo(() => {
    return participants
      .map((p) => {
        // Use afgesprokenOphaalLocatie if available, otherwise use woonplaats
        const location = p.afgesprokenOphaalLocatie || p.woonplaats;
        if (!location) return null;

        const coords = findCityCoordinates(location);
        if (!coords) return null;

        const { x, y } = latLngToXY(coords.lat, coords.lng);

        return {
          id: p.id,
          x,
          y,
          busNr: p.busNr,
          naam: p.naam,
          location: coords.name,
          isPickupLocation: !!p.afgesprokenOphaalLocatie,
        };
      })
      .filter(Boolean);
  }, [participants]);

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border border-border overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border">
        <h2 className="font-semibold text-foreground">Kaart</h2>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-bus-1" />
            <span className="text-muted-foreground">Bus 1</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-bus-2" />
            <span className="text-muted-foreground">Bus 2</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-bus-3" />
            <span className="text-muted-foreground">Bus 3</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 bg-map-water">
        <div className="relative" style={{ width: MAP_WIDTH, height: MAP_HEIGHT }}>
          {/* Netherlands SVG outline */}
          <svg
            viewBox="0 0 400 500"
            className="w-full h-full"
            style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
          >
            {/* Simplified Netherlands outline */}
            <path
              d="M 200 20
                 C 220 20, 280 40, 320 60
                 Q 350 80, 360 120
                 C 370 160, 380 200, 375 240
                 Q 370 280, 350 320
                 C 330 360, 300 380, 280 400
                 Q 250 430, 220 450
                 C 190 470, 160 480, 140 470
                 Q 100 450, 80 420
                 C 60 390, 50 350, 45 310
                 Q 40 270, 50 230
                 C 60 190, 70 150, 90 120
                 Q 110 90, 140 60
                 C 160 40, 180 20, 200 20
                 Z"
              className="fill-map-land stroke-map-border"
              strokeWidth="2"
            />
            {/* Wadden islands simplified */}
            <ellipse cx="180" cy="35" rx="30" ry="8" className="fill-map-land stroke-map-border" strokeWidth="1" />
            <ellipse cx="230" cy="30" rx="25" ry="6" className="fill-map-land stroke-map-border" strokeWidth="1" />
            <ellipse cx="280" cy="35" rx="20" ry="5" className="fill-map-land stroke-map-border" strokeWidth="1" />
            {/* IJsselmeer */}
            <ellipse cx="200" cy="130" rx="40" ry="50" className="fill-map-water" opacity="0.6" />
            {/* Zeeland area - more water */}
            <path
              d="M 60 380 Q 80 400, 100 410 Q 90 420, 70 410 Q 50 400, 60 380"
              className="fill-map-water"
              opacity="0.4"
            />
          </svg>

          {/* Markers */}
          {markers.map((marker) => {
            if (!marker) return null;
            
            return (
              <Tooltip key={marker.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onSelectParticipant(marker.id)}
                    className={cn(
                      "absolute w-4 h-4 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 border-2 border-card",
                      selectedId === marker.id && "ring-2 ring-foreground ring-offset-2 ring-offset-card scale-125",
                      marker.busNr === 1 && "bg-bus-1",
                      marker.busNr === 2 && "bg-bus-2",
                      marker.busNr === 3 && "bg-bus-3",
                      !marker.busNr && "bg-muted-foreground"
                    )}
                    style={{
                      left: marker.x,
                      top: marker.y,
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent side="top" className="text-sm">
                  <p className="font-medium">{marker.naam || "Naamloos"}</p>
                  <p className="text-muted-foreground">
                    {marker.location}
                    {marker.isPickupLocation && " (ophaal)"}
                  </p>
                  {marker.busNr && (
                    <p className={cn(
                      "font-medium",
                      marker.busNr === 1 && "text-bus-1",
                      marker.busNr === 2 && "text-bus-2",
                      marker.busNr === 3 && "text-bus-3"
                    )}>
                      Bus {marker.busNr}
                    </p>
                  )}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>

      <div className="px-4 py-2 bg-muted/30 border-t border-border text-xs text-muted-foreground">
        {markers.length} van {participants.length} deelnemers op kaart
        {markers.length < participants.length && (
          <span className="ml-1">
            (voer een bekende plaats in voor de overige)
          </span>
        )}
      </div>
    </div>
  );
}
