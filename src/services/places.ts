import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '.';

export type UniquePlacesResponse = {
  items: {
    address: string;
    id: string;
    image: string;
    name: string;
    city: {
      id: string;
      name: string;
    };
    poiType: {
      name: string;
      nameEn: string;
    };
    region: {
      name: string;
      nameEn: string;
    };
    scale: {
      name: string;
      nameEn: string;
    };
    subtype: string;
    type: string;
    rateAverage: number;
    rateCount: number;
    lng: number;
    lat: number;
  }[];
  total: number;
};
export type AttractionByIdResponse = {
  id: string;
  name: string;
  address: string;
  city: string;
  region: string;
  regionEn: string;
  scale: string;
  country: string;
  subtype: string;
  type: string;
  description: string;
  phone: string;
  email: string;
  features: string;
  lng: number;
  lat: number;
  rateAverage: number;
  rateCount: number;
  poiType: string;
  media: {
    id: string;
    link: string;
    main: boolean;
    type: string;
  }[];
} & { poi_type_name: string; scale_name: string };

export const placesAPI = createApi({
  reducerPath: 'placesAPI',
  baseQuery: axiosBaseQuery({
    baseUrl: '/api',
  }),
  tagTypes: ['Places'],
  endpoints: (builder) => ({
    getUniquePlaces: builder.query<UniquePlacesResponse, void>({
      query: () => ({
        url: '/unique-place',
      }),
    }),
    getAttractionById: builder.query<AttractionByIdResponse, string | undefined>({
      query: (attractionId) => ({
        url: `/attraction/${attractionId}`,
      }),
    }),
  }),
});

export const useGetUniquePlacesQuery = placesAPI.endpoints.getUniquePlaces.useQuery;
export const useGetAttractionByIdQuery = placesAPI.endpoints.getAttractionById.useQuery;
