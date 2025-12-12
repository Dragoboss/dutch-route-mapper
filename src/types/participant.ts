export interface Participant {
  id: string;
  naam: string;
  woonplaats: string;
  afgesprokenOphaalLocatie: string;
  busNr: 1 | 2 | 3 | null;
  eigenSkis: boolean;
  telefoonnummer: string;
}

export type ParticipantKey = keyof Omit<Participant, 'id'>;
