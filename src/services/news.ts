import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '.';

type NewsResponse = { items: { id: string; name: string; text: string }[] };

export const newsAPI = createApi({
  reducerPath: 'newsAPI',
  baseQuery: axiosBaseQuery({
    baseUrl: '/api',
  }),
  tagTypes: ['News'],
  endpoints: (builder) => ({
    getNews: builder.query<NewsResponse, void>({
      query: () => ({
        url: '/news',
      }),
    }),
  }),
});

export const useGetNewsQuery = newsAPI.endpoints.getNews.useQuery;
