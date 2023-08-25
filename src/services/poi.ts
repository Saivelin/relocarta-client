import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '.';

type PoiResponse = { items: { id: string; name: string; nameEn: string }[] };

export const poiAPI = createApi({
  reducerPath: 'poiAPI',
  baseQuery: axiosBaseQuery({
    baseUrl: '/api',
  }),
  tagTypes: ['Poi'],
  endpoints: (builder) => ({
    getPoiList: builder.query<PoiResponse, void>({
      query: () => ({
        url: '/poi-type?hasUniquePlace=true',
      }),
    }),
    getRegions: builder.query<PoiResponse, void>({
      query: () => ({
        url: '/country/374a485d-aadc-4fe4-9e3f-abe53da05bdf/region',
      }),
    }),
  }),
});

export const useGetPoiListQuery = poiAPI.endpoints.getPoiList.useQuery;
export const useGetRegionsQuery = poiAPI.endpoints.getRegions.useQuery;
