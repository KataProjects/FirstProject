import { baseAPI } from '@shared/api/baseAPI';

const aircraftApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAircraftList: build.query({
      query: () => 'aircrafts',
    }),
  }),
});

export const { useGetAircraftListQuery } = aircraftApi;
