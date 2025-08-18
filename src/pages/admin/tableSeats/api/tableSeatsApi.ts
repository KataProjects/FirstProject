import { baseAPI } from "@shared/api/baseAPI";

export const seatsApi = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getSeats: builder.query({
            query: () => '/seats',
        })
    })
})

export const { useGetSeatsQuery } = seatsApi;