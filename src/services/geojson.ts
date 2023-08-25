import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '.';
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { toQueryParams } from '../helpers/queries';

export type GeoJsonResponse = {
  poi_type_name_en: string;
  layer_index: number;
  scale: string;
  font: string;
  geojson: FeatureCollection<Geometry, GeoJsonProperties>;
}[];

export type GeoQueryParams = {
  zoom: number;
  north: number;
  south: number;
  west: number;
  east: number;
};

export const geojsonAPI = createApi({
  reducerPath: 'geojsonAPI',
  baseQuery: axiosBaseQuery({
    baseUrl: '/api',
  }),
  tagTypes: ['Geojson'],
  endpoints: (builder) => ({
    getGeoJSON: builder.query<GeoJsonResponse, GeoQueryParams>({
      query: (params) => {
        return {
          url: `/geojson${toQueryParams(params)}`,
        };
      },
    }),
    getAttraction: builder.query<GeoJsonResponse, void>({
      query: () => ({
        url: '/attraction',
      }),
    }),
  }),
});

export const useGetGeoJSONQuery = geojsonAPI.endpoints.getGeoJSON.useQuery;
export const useGetAttractionQuery = geojsonAPI.endpoints.getAttraction.useQuery;
