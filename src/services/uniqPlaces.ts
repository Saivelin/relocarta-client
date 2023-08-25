import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '.';
import { toQueryParams } from '../helpers/queries';
import { UniquePlacesResponse } from './places';

export type UniqPlacesQueryParams = {
  poiTypes?: string[];
  regions?: string[];
  search?: string;
  offset?: string;
  limit?: string;
};

export const uniqPlacesAPI = createApi({
  reducerPath: 'uniqPlacesAPI',
  baseQuery: axiosBaseQuery({
    baseUrl: '/api',
  }),
  tagTypes: ['Place'],
  endpoints: (builder) => ({
    getUniqPlaces: builder.query<UniquePlacesResponse, UniqPlacesQueryParams>({
      query: (params) => ({
        url: `/unique-place${toQueryParams(params)}`,
      }),
    }),
  }),
});

export const useGetUniqPlacesQuery = uniqPlacesAPI.endpoints.getUniqPlaces.useQuery;
