import { baseAPI } from '@shared/api/baseAPI';
import { DEFAULT_PAGE_LIMIT } from '@shared/config/pagination';
import type { IContentTimeZoneTable, IDataSource } from '@shared/types';
import type { PaginationParams } from '@shared/types/pagination';

const timeZonesApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getTimeZonesList: build.query<IDataSource<IContentTimeZoneTable>, PaginationParams>({
      query: ({ page = 0, size = DEFAULT_PAGE_LIMIT }: PaginationParams) =>
        `timezones?page=${page}&size=${size}`,
      providesTags: ['TimeZone'],
    }),
    updateTimeZone: build.mutation<void, Partial<IContentTimeZoneTable> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `timezones/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled, getState }) {
        try {
          await queryFulfilled;
          const state = getState() as any;
          const cacheEntries = state.api.queries;

          Object.keys(cacheEntries).forEach(key => {
            if (key.startsWith('getTimeZonesList(')) {
              const match = key.match(/getTimeZonesList\((.+)\)/);
              if (match) {
                try {
                  const params = JSON.parse(match[1]);
                  dispatch(
                    timeZonesApi.util.updateQueryData('getTimeZonesList', params, (draft) => {
                      const item = draft.content.find(timeZone => timeZone.id === id);
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

export const { useGetTimeZonesListQuery, useUpdateTimeZoneMutation } = timeZonesApi;