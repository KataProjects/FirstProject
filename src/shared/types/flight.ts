export type Flight = {
  id: number;
  code: string;
  airportFrom: string | null;
  airportTo: string;
  departureDateTime: string; // ISO
  arrivalDateTime: string;   // ISO
  aircraftId: number;
  flightStatus: 'ON_TIME' | 'COMPLETED' | 'CANCELLED'; // возможные значения
};