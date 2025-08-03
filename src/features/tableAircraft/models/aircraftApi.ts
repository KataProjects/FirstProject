import { baseAPI } from '@shared/api/baseAPI';
import { DEFAULT_PAGE_LIMIT } from '@shared/config/pagination';
import type { IContentAircraftTable, IDataSource } from '@shared/types';
import type { PaginationParams } from '@shared/types/pagination';

const aircraftApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAircraftList: build.query<IDataSource<IContentAircraftTable>, PaginationParams>({
      query: ({ page = 1, size = DEFAULT_PAGE_LIMIT }) => `aircrafts?size=${size}&page=${page}`,
    }),

    updateAircraft: build.mutation<IContentAircraftTable, Partial<IContentAircraftTable> & { id: number }>({
      query: ({ id, ...body }) => ({
        url: `aircrafts/${id}`,
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const {
  useGetAircraftListQuery,
  useUpdateAircraftMutation,
} = aircraftApi;
