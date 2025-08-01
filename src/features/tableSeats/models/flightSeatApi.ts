import { baseAPI } from '@shared/api/baseAPI';
import type { IContentSeatsTable, IDataSource } from '@shared/types';

const flightSeatApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getFlightSeatList: build.query<IDataSource<IContentSeatsTable>, number>({
      query: (page) => `timezones?size=10&page=${page}`,
    }),
  }),
});

export const { useGetFlightSeatListQuery } = flightSeatApi;