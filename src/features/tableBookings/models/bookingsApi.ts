import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Booking {
  id: number;
  passengerId: number;
  bookingDate: string;
  bookingStatus: 'PAID' | 'PENDING' | 'CANCELLED';
  flightId: number;
}

export interface BookingResponse {
  content: Booking[];
  totalPages: number;
  totalElements: number;
  number: number; // current page
  size: number;
}

interface GetBookingsParams {
  page: number;
  size: number;
}

export const bookingsApi = createApi({
  reducerPath: 'bookingsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://92.118.114.29:8080/api/' }),
  endpoints: (builder) => ({
    getBookings: builder.query<BookingResponse, GetBookingsParams>({
      query: ({ page, size }) => `bookings?page=${page}&size=${size}`,
    }),

    // ✅ Добавляем обновление бронирования
    updateBooking: builder.mutation<Booking, Booking>({
      query: (updatedBooking) => ({
        url: `bookings/${updatedBooking.id}`,
        method: 'PUT',
        body: updatedBooking,
      }),
    }),
  }),
});

export const { useGetBookingsQuery, useUpdateBookingMutation } = bookingsApi;
