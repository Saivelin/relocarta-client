import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '.';
import { MAPBOX_TOKEN } from '../constants/map';

type DirectionsResponse = {
  routes: {
    distance: number;
    duration: number;
    geometry: {
      coordinates: number[][];
    };
  }[];
  uuid: string;
};

export const mapboxAPI = createApi({
  reducerPath: 'mapboxAPI',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://api.mapbox.com',
  }),
  tagTypes: ['Dir'],
  endpoints: (builder) => ({
    getDirections: builder.query<DirectionsResponse, { coords: string }>({
      query: ({ coords }) => ({
        url: `/directions/v5/mapbox/driving-traffic/${coords}?geometries=geojson&steps=true&overview=full&language=ru&access_token=${MAPBOX_TOKEN}`,
      }),
    }),
    getGeo: builder.query<any, { lng: number; lat: number }>({
      query: ({ lng, lat }) => ({
        url: `/geocoding/v5/mapbox.places/${lng},${lat}.json?language=ru&access_token=${MAPBOX_TOKEN}`,
      }),
    }),
  }),
});

export const useGetDirectionsQuery = mapboxAPI.endpoints.getDirections.useQuery;
export const useGetGeoQuery = mapboxAPI.endpoints.getGeo.useQuery;
