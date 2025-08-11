import type { IDataSource, IFlight } from '@shared/types';

export const mockFlights: IDataSource<IFlight> = {
  empty: false,
  first: false,
  last: false,
  number: 0,
  numberOfElements: 0,
  pageable: {
    offset: 0,
    pageNumber: 0,
    pageSize: 0,
    paged: false,
    sort: [],
    unpaged: false,
  },
  size: 0,
  sort: [],
  totalElements: 0,
  totalPages: 0,
  content: [
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
  ],
};
