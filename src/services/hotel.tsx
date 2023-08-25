import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '.';

export const hotelAPI = createApi({
  reducerPath: 'hotelAPI',
  baseQuery: axiosBaseQuery({
    baseUrl: '/api/hotel',
  }),
  tagTypes: ['Hotel'],
  endpoints: (builder) => ({
    getHotelLink: builder.query<{ url: string }, string>({
      query: (hotelId) => ({
        url: `/${hotelId}/link`,
      }),
    }),
  }),
});

export const useGetHotelLinkQuery = hotelAPI.endpoints.getHotelLink.useQuery;
