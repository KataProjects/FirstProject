import { baseAPI } from "@shared/api/baseAPI";

const timeZonesApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getTimeZonesList: build.query({
      query: () => 'timezones'
    })
  })
})

export  const {useGetTimeZonesListQuery} = timeZonesApi
