// Dutch cities with their approximate coordinates
// Coordinates are in [longitude, latitude] format for Mapbox compatibility
export interface CityCoordinates {
  name: string;
  lat: number;
  lng: number;
}

export const dutchCities: Record<string, CityCoordinates> = {
  "amsterdam": { name: "Amsterdam", lat: 52.3676, lng: 4.9041 },
  "rotterdam": { name: "Rotterdam", lat: 51.9244, lng: 4.4777 },
  "den haag": { name: "Den Haag", lat: 52.0705, lng: 4.3007 },
  "the hague": { name: "Den Haag", lat: 52.0705, lng: 4.3007 },
  "utrecht": { name: "Utrecht", lat: 52.0907, lng: 5.1214 },
  "eindhoven": { name: "Eindhoven", lat: 51.4416, lng: 5.4697 },
  "tilburg": { name: "Tilburg", lat: 51.5555, lng: 5.0913 },
  "groningen": { name: "Groningen", lat: 53.2194, lng: 6.5665 },
  "almere": { name: "Almere", lat: 52.3508, lng: 5.2647 },
  "breda": { name: "Breda", lat: 51.5719, lng: 4.7683 },
  "nijmegen": { name: "Nijmegen", lat: 51.8426, lng: 5.8546 },
  "enschede": { name: "Enschede", lat: 52.2215, lng: 6.8937 },
  "haarlem": { name: "Haarlem", lat: 52.3874, lng: 4.6462 },
  "arnhem": { name: "Arnhem", lat: 51.9851, lng: 5.8987 },
  "zaanstad": { name: "Zaanstad", lat: 52.4559, lng: 4.8127 },
  "amersfoort": { name: "Amersfoort", lat: 52.1561, lng: 5.3878 },
  "apeldoorn": { name: "Apeldoorn", lat: 52.2112, lng: 5.9699 },
  "hoofddorp": { name: "Hoofddorp", lat: 52.3025, lng: 4.6892 },
  "maastricht": { name: "Maastricht", lat: 50.8514, lng: 5.6910 },
  "leiden": { name: "Leiden", lat: 52.1601, lng: 4.4970 },
  "dordrecht": { name: "Dordrecht", lat: 51.8133, lng: 4.6901 },
  "zoetermeer": { name: "Zoetermeer", lat: 52.0575, lng: 4.4931 },
  "zwolle": { name: "Zwolle", lat: 52.5168, lng: 6.0830 },
  "deventer": { name: "Deventer", lat: 52.2549, lng: 6.1630 },
  "delft": { name: "Delft", lat: 52.0116, lng: 4.3571 },
  "alkmaar": { name: "Alkmaar", lat: 52.6324, lng: 4.7534 },
  "heerlen": { name: "Heerlen", lat: 50.8882, lng: 5.9795 },
  "venlo": { name: "Venlo", lat: 51.3704, lng: 6.1724 },
  "leeuwarden": { name: "Leeuwarden", lat: 53.2012, lng: 5.7999 },
  "hilversum": { name: "Hilversum", lat: 52.2292, lng: 5.1669 },
  "amstelveen": { name: "Amstelveen", lat: 52.3114, lng: 4.8647 },
  "oss": { name: "Oss", lat: 51.7649, lng: 5.5180 },
  "schiedam": { name: "Schiedam", lat: 51.9225, lng: 4.3892 },
  "spijkenisse": { name: "Spijkenisse", lat: 51.8450, lng: 4.3291 },
  "helmond": { name: "Helmond", lat: 51.4758, lng: 5.6615 },
  "vlaardingen": { name: "Vlaardingen", lat: 51.9125, lng: 4.3419 },
  "purmerend": { name: "Purmerend", lat: 52.5050, lng: 4.9597 },
  "ede": { name: "Ede", lat: 52.0483, lng: 5.6697 },
  "alphen aan den rijn": { name: "Alphen aan den Rijn", lat: 52.1295, lng: 4.6587 },
  "hoorn": { name: "Hoorn", lat: 52.6422, lng: 5.0594 },
  "velsen": { name: "Velsen", lat: 52.4630, lng: 4.6266 },
  "katwijk": { name: "Katwijk", lat: 52.2011, lng: 4.4182 },
  "lelystad": { name: "Lelystad", lat: 52.5185, lng: 5.4714 },
  "barneveld": { name: "Barneveld", lat: 52.1379, lng: 5.5830 },
  "zeist": { name: "Zeist", lat: 52.0907, lng: 5.2316 },
  "nieuwegein": { name: "Nieuwegein", lat: 52.0308, lng: 5.0808 },
  "veenendaal": { name: "Veenendaal", lat: 52.0283, lng: 5.5583 },
  "gouda": { name: "Gouda", lat: 52.0115, lng: 4.7104 },
  "rijswijk": { name: "Rijswijk", lat: 52.0450, lng: 4.3232 },
  "capelle aan den ijssel": { name: "Capelle aan den IJssel", lat: 51.9292, lng: 4.5780 },
  "den bosch": { name: "'s-Hertogenbosch", lat: 51.6978, lng: 5.3037 },
  "'s-hertogenbosch": { name: "'s-Hertogenbosch", lat: 51.6978, lng: 5.3037 },
  "s-hertogenbosch": { name: "'s-Hertogenbosch", lat: 51.6978, lng: 5.3037 },
  "bergen op zoom": { name: "Bergen op Zoom", lat: 51.4949, lng: 4.2911 },
  "roosendaal": { name: "Roosendaal", lat: 51.5308, lng: 4.4658 },
  "waalwijk": { name: "Waalwijk", lat: 51.6831, lng: 5.0657 },
  "middelburg": { name: "Middelburg", lat: 51.4988, lng: 3.6136 },
  "vlissingen": { name: "Vlissingen", lat: 51.4536, lng: 3.5736 },
  "goes": { name: "Goes", lat: 51.5040, lng: 3.8897 },
  "terneuzen": { name: "Terneuzen", lat: 51.3356, lng: 3.8279 },
  "harderwijk": { name: "Harderwijk", lat: 52.3418, lng: 5.6200 },
  "nunspeet": { name: "Nunspeet", lat: 52.3766, lng: 5.7853 },
  "emmen": { name: "Emmen", lat: 52.7792, lng: 6.8897 },
  "assen": { name: "Assen", lat: 52.9925, lng: 6.5625 },
  "hoogeveen": { name: "Hoogeveen", lat: 52.7239, lng: 6.4762 },
  "meppel": { name: "Meppel", lat: 52.6961, lng: 6.1943 },
  "kampen": { name: "Kampen", lat: 52.5548, lng: 5.9114 },
  "hardenberg": { name: "Hardenberg", lat: 52.5750, lng: 6.6186 },
  "hengelo": { name: "Hengelo", lat: 52.2654, lng: 6.7932 },
  "almelo": { name: "Almelo", lat: 52.3570, lng: 6.6628 },
  "oldenzaal": { name: "Oldenzaal", lat: 52.3132, lng: 6.9295 },
  "doetinchem": { name: "Doetinchem", lat: 51.9655, lng: 6.2886 },
  "winterswijk": { name: "Winterswijk", lat: 51.9712, lng: 6.7197 },
  "tiel": { name: "Tiel", lat: 51.8877, lng: 5.4316 },
  "culemborg": { name: "Culemborg", lat: 51.9559, lng: 5.2284 },
  "wageningen": { name: "Wageningen", lat: 51.9692, lng: 5.6654 },
  "rhenen": { name: "Rhenen", lat: 51.9592, lng: 5.5689 },
  "soest": { name: "Soest", lat: 52.1731, lng: 5.2919 },
  "baarn": { name: "Baarn", lat: 52.2119, lng: 5.2878 },
  "bussum": { name: "Bussum", lat: 52.2741, lng: 5.1613 },
  "naarden": { name: "Naarden", lat: 52.2958, lng: 5.1623 },
  "huizen": { name: "Huizen", lat: 52.2994, lng: 5.2389 },
  "bunschoten": { name: "Bunschoten", lat: 52.2431, lng: 5.3731 },
  "schagen": { name: "Schagen", lat: 52.7879, lng: 4.7978 },
  "den helder": { name: "Den Helder", lat: 52.9533, lng: 4.7600 },
  "texel": { name: "Texel", lat: 53.0548, lng: 4.7997 },
  "enkhuizen": { name: "Enkhuizen", lat: 52.7026, lng: 5.2912 },
  "medemblik": { name: "Medemblik", lat: 52.7722, lng: 5.1074 },
  "volendam": { name: "Volendam", lat: 52.4953, lng: 5.0711 },
  "marken": { name: "Marken", lat: 52.4580, lng: 5.1038 },
  "monnickendam": { name: "Monnickendam", lat: 52.4579, lng: 5.0346 },
  "ijmuiden": { name: "IJmuiden", lat: 52.4608, lng: 4.6178 },
  "beverwijk": { name: "Beverwijk", lat: 52.4833, lng: 4.6569 },
  "heemskerk": { name: "Heemskerk", lat: 52.5106, lng: 4.6710 },
  "castricum": { name: "Castricum", lat: 52.5467, lng: 4.6578 },
  "heiloo": { name: "Heiloo", lat: 52.6000, lng: 4.7000 },
  "bergen": { name: "Bergen", lat: 52.6667, lng: 4.7000 },
  "egmond": { name: "Egmond", lat: 52.6167, lng: 4.6333 },
  "heerhugowaard": { name: "Heerhugowaard", lat: 52.6679, lng: 4.8343 },
  "langedijk": { name: "Langedijk", lat: 52.6833, lng: 4.7833 },
  "wieringerwerf": { name: "Wieringerwerf", lat: 52.8500, lng: 5.0333 },
  "anna paulowna": { name: "Anna Paulowna", lat: 52.8625, lng: 4.8233 },
  "schoorl": { name: "Schoorl", lat: 52.7000, lng: 4.6833 }
};

export function findCityCoordinates(cityName: string): CityCoordinates | null {
  if (!cityName) return null;
  
  const normalizedName = cityName.toLowerCase().trim();
  
  // Direct match
  if (dutchCities[normalizedName]) {
    return dutchCities[normalizedName];
  }
  
  // Partial match
  for (const [key, value] of Object.entries(dutchCities)) {
    if (key.includes(normalizedName) || normalizedName.includes(key)) {
      return value;
    }
  }
  
  return null;
}
