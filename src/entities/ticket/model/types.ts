export interface Ticket {
  id: number;
  ticketNumber: string;
  passengerId: number;
  firstName: string;
  lastName: string;
  flightCode: string;
  from: string;
  to: string;
  departureDateTime: string;
  arrivalDateTime: string;
  flightSeatId: number;
  seatNumber: string;
  bookingId: number;
  boardingStartTime: string;
  boardingEndTime: string;
}