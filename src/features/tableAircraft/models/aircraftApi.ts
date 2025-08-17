import { baseAPI } from '@shared/api/baseAPI';
import { DEFAULT_PAGE_LIMIT } from '@shared/config/pagination';
import type { IContentAircraftTable, IDataSource } from '@shared/types';
import type { PaginationParams } from '@shared/types/pagination';

const aircraftAPI = baseAPI.injectEndpoints({
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
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled, getState }) {
        try {
          await queryFulfilled;
          const state = getState() as any;
          const cacheEntries = state.api.queries;

          Object.keys(cacheEntries).forEach(key => {
            if (key.startsWith('getAircraftList(')) {
              const match = key.match(/getAircraftList\((.+)\)/);
              if (match) {
                try {
                  const params = JSON.parse(match[1]);
                  dispatch(
                    aircraftAPI.util.updateQueryData('getAircraftList', params, (draft) => {
                      const item = draft.content.find(aircraft => aircraft.id === id);
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
  }),
});

export const { useGetAircraftListQuery, useUpdateAircraftMutation } = aircraftAPI;