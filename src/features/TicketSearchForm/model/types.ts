import { Dayjs } from 'dayjs';

export type TicketSearchFormState = {
  from: string;
  to: string;
  date: Dayjs | null;
  returnDate: Dayjs | null;
  passengers: number;
  roundTrip: boolean;
  noTransfers: boolean;
  cabin: 'economy' | 'business';
};
