import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '.';

export interface Location {
  id: string;
  name: string;
  region: {
    id: string;
    name: string;
    country: {
      id: string;
      name: string;
      nameEn: string;
    };
  };
  nameEn: string;
}

export interface Region {
  id: string;
  name: string;
  country: {
    id: string;
    name: string;
    nameEn: string;
  };
  nameEn: string;
}

export const locationApi = createApi({
  reducerPath: 'locationApi',
  baseQuery: axiosBaseQuery({
    baseUrl: '/api',
  }),
  tagTypes: ['Location'],
  endpoints: (builder) => ({
    getCountries: builder.query<Location[], void>({
      query: () => ({
        url: '/country',
      }),
    }),
    getRegions: builder.query<Region[], string>({
      query: (countryId) => ({
        url: `/country/${countryId}/region/`,
      }),
    }),
    getCities: builder.query<Location[], void>({
      query: () => ({
        url: `/city`,
      }),
    }),
  }),
});

export const useGetCountriesQuery = locationApi.endpoints.getCountries.useQuery;
export const useGetRegionsQuery = locationApi.endpoints.getRegions.useQuery;
export const useGetCitiesQuery = locationApi.endpoints.getCities.useQuery;
