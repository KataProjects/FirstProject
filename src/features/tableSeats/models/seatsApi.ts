import { baseAPI } from "@shared/api/baseAPI";

export const seatsApi = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getSeats: builder.query({
            query: () => '/seats',
        }),
        getCategories: builder.query({
            query: () => '/categories'
        })
    })
})

export const { useGetSeatsQuery, useGetCategoriesQuery } = seatsApi;