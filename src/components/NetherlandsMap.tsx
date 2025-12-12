import { useMemo } from "react";
import { Participant } from "@/types/participant";
import { findCityCoordinates } from "@/data/dutchCities";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import netherlandsMap from "@/assets/netherlands-map.svg";

interface NetherlandsMapProps {
  participants: Participant[];
  selectedId: string | null;
  onSelectParticipant: (id: string | null) => void;
}

// Netherlands bounding box adjusted to match the SVG
// The SVG viewBox is 0 0 1727 2048
const BOUNDS = {
  north: 53.55,
  south: 50.75,
  west: 3.35,
  east: 7.25,
};

const MAP_WIDTH = 350;
const MAP_HEIGHT = 415;

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

      <div className="flex-1 flex items-center justify-center p-4 bg-map-water overflow-hidden">
        <div className="relative" style={{ width: MAP_WIDTH, height: MAP_HEIGHT }}>
          {/* Netherlands SVG map */}
          <img 
            src={netherlandsMap} 
            alt="Kaart van Nederland" 
            className="w-full h-full object-contain"
            style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.1))" }}
          />

          {/* Markers overlay */}
          {markers.map((marker) => {
            if (!marker) return null;
            
            return (
              <Tooltip key={marker.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onSelectParticipant(marker.id)}
                    className={cn(
                      "absolute w-3 h-3 rounded-full shadow-md transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 border border-card z-10",
                      selectedId === marker.id && "ring-2 ring-foreground ring-offset-2 ring-offset-card scale-125 z-20",
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
