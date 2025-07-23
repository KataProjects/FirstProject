import type { Flight } from '@shared/types/flight';

export const mockFlights: Flight[] = [
  {
    id: 1494,
    code: 'DP-30',
    airportFrom: null,
    airportTo: 'AAQ',
    departureDateTime: '2024-06-04T05:23:02',
    arrivalDateTime: '2024-05-04T05:23:02',
    aircraftId: 1,
    flightStatus: 'ON_TIME',
  },
  {
    id: 1495,
    code: 'SU-100',
    airportFrom: 'SVO',
    airportTo: 'JFK',
    departureDateTime: '2024-07-01T10:00:00',
    arrivalDateTime: '2024-07-01T16:00:00',
    aircraftId: 3,
    flightStatus: 'COMPLETED',
  },
];