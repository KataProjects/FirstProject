import { baseAPI } from "@shared/api/baseAPI";
import type { IContentTimeZoneTable, IDataSource } from '@shared/types';

const timeZonesApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getTimeZonesList: build.query <IDataSource<IContentTimeZoneTable>, void>({
      query: () => 'timezones'
    })
  })
})

export  const {useGetTimeZonesListQuery} = timeZonesApi
