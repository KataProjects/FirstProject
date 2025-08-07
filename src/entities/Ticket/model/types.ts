export interface ITicket {
  id: string;
  airline: string;
  flightNumber: string;
  isDirect: boolean;
  departure: {
    time: string;
    city: string;
    date: string;
    airport: string;
  };
  arrival: {
    time: string;
    city: string;
    date: string;
    airport: string;
  };
  duration: string;
  tariffs: {
    economy: {
      basic: number;
      standard: number;
      plus: number;
    };
  };
  baggage: {
    included: boolean;
    price?: number;
  };
  seatsLeft: number;
}