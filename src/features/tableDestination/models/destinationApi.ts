import { baseAPI } from '@shared/api/baseAPI';
import { DEFAULT_PAGE_LIMIT } from '@shared/config/pagination';
import type { IContentDestinationTable, IDataSource } from '@shared/types';
import type { PaginationParams } from '@shared/types/pagination';

const destinationApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getDestinationList: build.query<IDataSource<IContentDestinationTable>, PaginationParams>({
      query: ({ page = 1, size = DEFAULT_PAGE_LIMIT }) => `destinations?size=${size}&page=${page}`,
    }),
  }),
});

export const { useGetDestinationListQuery } = destinationApi;
