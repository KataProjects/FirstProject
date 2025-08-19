import { baseAPI } from '@shared/api/baseAPI';
import { DEFAULT_PAGE_LIMIT } from '@shared/config/pagination';
import type { IFlight, IDataSource } from '@shared/types';
import type { PaginationParams } from '@shared/types/pagination';

const flightsAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getFlightsList: build.query<IDataSource<IFlight>, PaginationParams>({
      query: ({ page = 0, size = DEFAULT_PAGE_LIMIT }: PaginationParams) =>
        `flights?page=${page}&size=${size}`,
      providesTags: ['Flight'],
    }),
    updateFlight: build.mutation<void, Partial<IFlight> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `flights/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled, getState }) {
        try {
          await queryFulfilled;
          const state = getState() as any;
          const cacheEntries = state.api.queries;

          Object.keys(cacheEntries).forEach(key => {
            if (key.startsWith('getFlightsList(')) {
              const match = key.match(/getFlightsList\((.+)\)/);
              if (match) {
                try {
                  const params = JSON.parse(match[1]);
                  dispatch(
                    flightsAPI.util.updateQueryData('getFlightsList', params, (draft) => {
                      const item = draft.content.find(flight => flight.id === id);
                      if (item) {
                        Object.assign(item, patch);
                      }
                    })
                  );
                } catch (parseError) {
                }
              }
            }
          });
        } catch (error) {
        }
      },
    }),
    getFlightStatuses: build.query<string[], void>({
      query: () => 'flights/status',
    }),
  }),
});

export const { useGetFlightsListQuery, useUpdateFlightMutation, useGetFlightStatusesQuery } = flightsAPI;