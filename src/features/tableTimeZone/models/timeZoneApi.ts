import { baseAPI } from '@shared/api/baseAPI';
import type { IContentTimeZoneTable, IDataSource } from '@shared/types';

const timeZonesApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getTimeZonesList: build.query<IDataSource<IContentTimeZoneTable>, number>({
      query: (page) => `timezones?size=10&page=${page}`,
    }),
  }),
});

export const { useGetTimeZonesListQuery } = timeZonesApi;
