import { baseAPI } from '@shared/api/baseAPI';
import { DEFAULT_PAGE_LIMIT } from '@shared/config/pagination';
import type { IContentPassengerTable, IDataSource } from '@shared/types';
import type { PaginationParams } from '@shared/types/pagination';

const tablePassangersApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getPassangerList: build.query<IDataSource<IContentPassengerTable>, PaginationParams>({
      query: ({ page = 1, size = DEFAULT_PAGE_LIMIT }) => `passengers?size=${size}&page=${page}`,
    }),
  }),
});

export const { useGetPassangerListQuery } = tablePassangersApi;