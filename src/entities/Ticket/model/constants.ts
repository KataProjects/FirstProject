import type { ITicket } from './types.ts';

export const mockTicket: ITicket = {
  id: '1',
  airline: 'Q Globus LLC',
  flightNumber: 'GF-2025',
  isDirect: true,
  departure: {
    time: '05:00',
    city: 'Санкт-Петербург',
    date: '30 июн, Пт',
    airport: 'LED'
  },
  arrival: {
    time: '06:40',
    city: 'Москва',
    date: '30 июн, Пт',
    airport: 'DME'
  },
  duration: '1ч 40м',
  tariffs: {
    economy: {
      basic: 3787,
      standard: 5887,
      plus: 12437
    }
  },
  baggage: {
    included: false,
    price: 1500
  },
  seatsLeft: 2
};