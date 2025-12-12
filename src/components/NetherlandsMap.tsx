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

// Netherlands bounding box
const BOUNDS = {
  north: 53.6,
  south: 50.7,
  west: 3.3,
  east: 7.3,
};

const MAP_WIDTH = 380;
const MAP_HEIGHT = 480;

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
          {/* Accurate Netherlands SVG */}
          <svg
            viewBox="0 0 380 480"
            className="w-full h-full"
            style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.15))" }}
          >
            {/* Water background is handled by parent */}
            
            {/* Mainland Netherlands - accurate outline */}
            <path
              d="M 95 95 
                 L 105 90 L 115 88 L 125 85 L 140 82 L 155 80 L 170 78 L 185 77 
                 L 200 78 L 215 80 L 225 83 L 235 88 L 245 92 L 252 95
                 L 260 100 L 268 108 L 275 115 L 280 125 L 282 135 L 283 145
                 L 285 160 L 290 175 L 295 185 L 300 195 L 308 205 L 315 215
                 L 322 225 L 328 238 L 332 250 L 335 262 L 338 275 L 340 290
                 L 342 305 L 343 320 L 342 335 L 340 348 L 336 360
                 L 330 375 L 322 388 L 312 400 L 300 410 L 288 418 L 275 425
                 L 260 432 L 245 438 L 228 442 L 210 445 L 195 447 L 180 448
                 L 165 448 L 150 446 L 138 442 L 128 436 L 120 428
                 L 112 418 L 105 405 L 98 390 L 92 375 L 88 358
                 L 85 340 L 82 320 L 80 300 L 78 280 L 75 260
                 L 72 240 L 68 220 L 65 200 L 63 180 L 62 160
                 L 63 145 L 65 130 L 70 118 L 78 108 L 88 100 L 95 95 Z"
              className="fill-map-land stroke-map-border"
              strokeWidth="1.5"
            />

            {/* Zeeland province - southwestern islands */}
            <path
              d="M 45 380 L 55 375 L 68 372 L 78 375 L 85 382 L 80 390 L 68 395 L 55 392 L 45 385 Z"
              className="fill-map-land stroke-map-border"
              strokeWidth="1"
            />
            <path
              d="M 50 400 L 62 395 L 75 398 L 82 405 L 78 415 L 65 420 L 52 415 L 48 408 Z"
              className="fill-map-land stroke-map-border"
              strokeWidth="1"
            />
            <path
              d="M 58 425 L 72 420 L 88 422 L 98 430 L 95 440 L 82 448 L 68 445 L 58 435 Z"
              className="fill-map-land stroke-map-border"
              strokeWidth="1"
            />

            {/* Wadden Islands - northern islands */}
            {/* Texel */}
            <path
              d="M 118 42 L 130 38 L 145 40 L 152 48 L 148 58 L 135 62 L 122 58 L 118 50 Z"
              className="fill-map-land stroke-map-border"
              strokeWidth="1"
            />
            {/* Vlieland */}
            <path
              d="M 160 35 L 175 32 L 188 35 L 192 42 L 185 48 L 170 50 L 158 45 L 158 38 Z"
              className="fill-map-land stroke-map-border"
              strokeWidth="1"
            />
            {/* Terschelling */}
            <path
              d="M 198 30 L 218 26 L 238 28 L 248 35 L 242 44 L 225 48 L 205 45 L 198 38 Z"
              className="fill-map-land stroke-map-border"
              strokeWidth="1"
            />
            {/* Ameland */}
            <path
              d="M 255 28 L 275 25 L 292 28 L 298 35 L 292 42 L 275 45 L 258 42 L 255 35 Z"
              className="fill-map-land stroke-map-border"
              strokeWidth="1"
            />
            {/* Schiermonnikoog */}
            <path
              d="M 305 30 L 320 28 L 332 32 L 335 40 L 328 46 L 315 48 L 305 44 L 304 36 Z"
              className="fill-map-land stroke-map-border"
              strokeWidth="1"
            />

            {/* Flevoland - reclaimed land */}
            <path
              d="M 175 120 L 195 115 L 215 118 L 225 128 L 222 145 L 210 158 L 190 160 L 175 152 L 170 138 L 172 125 Z"
              className="fill-map-land stroke-map-border"
              strokeWidth="1"
            />

            {/* IJsselmeer lake */}
            <path
              d="M 145 85 L 165 82 L 175 90 L 172 115 L 160 135 L 140 140 L 125 135 L 120 118 L 128 100 L 140 88 Z"
              className="fill-map-water stroke-map-border"
              strokeWidth="0.5"
              opacity="0.7"
            />

            {/* Markermeer */}
            <path
              d="M 155 145 L 170 142 L 180 150 L 178 168 L 165 180 L 148 178 L 140 165 L 145 152 Z"
              className="fill-map-water stroke-map-border"
              strokeWidth="0.5"
              opacity="0.7"
            />

            {/* Major rivers indication */}
            <path
              d="M 80 320 Q 120 315, 160 310 Q 200 305, 240 300"
              className="stroke-map-border"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
            />
          </svg>

          {/* City labels for major cities */}
          <div className="absolute text-[9px] text-muted-foreground font-medium pointer-events-none" style={{ left: 118, top: 185 }}>Amsterdam</div>
          <div className="absolute text-[9px] text-muted-foreground font-medium pointer-events-none" style={{ left: 85, top: 288 }}>Rotterdam</div>
          <div className="absolute text-[9px] text-muted-foreground font-medium pointer-events-none" style={{ left: 72, top: 258 }}>Den Haag</div>
          <div className="absolute text-[9px] text-muted-foreground font-medium pointer-events-none" style={{ left: 155, top: 220 }}>Utrecht</div>
          <div className="absolute text-[9px] text-muted-foreground font-medium pointer-events-none" style={{ left: 265, top: 75 }}>Groningen</div>
          <div className="absolute text-[9px] text-muted-foreground font-medium pointer-events-none" style={{ left: 195, top: 345 }}>Eindhoven</div>
          <div className="absolute text-[9px] text-muted-foreground font-medium pointer-events-none" style={{ left: 215, top: 430 }}>Maastricht</div>

          {/* Markers */}
          {markers.map((marker) => {
            if (!marker) return null;
            
            return (
              <Tooltip key={marker.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onSelectParticipant(marker.id)}
                    className={cn(
                      "absolute w-4 h-4 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 border-2 border-card z-10",
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
