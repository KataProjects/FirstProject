import { baseAPI } from '@shared/api/baseAPI';
import { DEFAULT_PAGE_LIMIT } from '@shared/config/pagination';
import type { IContentAircraftTable, IDataSource } from '@shared/types';
import type { PaginationParams } from '@shared/types/pagination';

const aircraftApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAircraftList: build.query<IDataSource<IContentAircraftTable>, PaginationParams>({
      query: ({ page = 0, size = DEFAULT_PAGE_LIMIT }: PaginationParams) =>
        `aircrafts?page=${page}&size=${size}`,
      providesTags: ['Aircraft'],
    }),
    updateAircraft: build.mutation<void, Partial<IContentAircraftTable> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `aircrafts/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Aircraft'],
    }),
  }),
});

export const { useGetAircraftListQuery, useUpdateAircraftMutation } = aircraftApi;