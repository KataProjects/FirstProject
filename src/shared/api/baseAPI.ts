import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_API_URL } from "../config/api/baseUrl"

export const baseAPI = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL
  }),
  tagTypes: ['Aircraft'],
  endpoints: () => ({})
})