import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '.';

type TripsResponse = { items: { trip_id: string; name: string; points: any }[] };

export type Trip = {
  trip_id: string;
  name: string;
  spacing: string;
  date_modified: string;
  distance: number;
  duration: number;
  trip_point_count: number;
  photo_link: string;
  geojson: {
    type: string;
    features: {
      type: string;
      geometry: {
        type: string;
        coordinates: [number, number];
      };
      properties: {
        poi_id: string;
        region_name: string;
        city_name: string;
        poi_type_name_en: string;
        poi_type_name: string;
        name: string;
        address: string;
        photo_link: string;
        index: number;
        visible: boolean;
      };
    }[];
  };
};

export type CreateTripRequestBody = {
  name: string;
  spacing: string;
  points: {
    poiId: string;
    poiTypeId: string;
    index: number;
    visible: boolean;
    arriveDate: '2023-06-27T07:43:55.876Z';
    notes: string;
  }[];
};

type UpdateTripRequestBody = CreateTripRequestBody & { tripId: string };

export const tripAPI = createApi({
  reducerPath: 'tripAPI',
  baseQuery: axiosBaseQuery({
    baseUrl: '/api/trip',
  }),
  tagTypes: ['Trip'],
  endpoints: (builder) => ({
    getTrips: builder.query<TripsResponse, void>({
      query: () => ({}),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ trip_id }) => ({
                type: 'Trip' as const,
                id: trip_id,
              })),
              { type: 'Trip', id: 'LIST' },
            ]
          : [{ type: 'Trip', id: 'LIST' }],
    }),
    getTripById: builder.query<Trip, string>({
      query: (tripId) => ({
        url: `/${tripId}`,
      }),
      providesTags: (result, error, tripId) => [{ type: 'Trip', id: tripId }],
    }),
    create: builder.mutation<string, CreateTripRequestBody>({
      query: (body) => ({
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['Trip'],
    }),
    delete: builder.mutation<TripsResponse, string>({
      query: (tripId) => ({
        method: 'DELETE',
        url: `/${tripId}`,
      }),
      invalidatesTags: ['Trip'],
    }),
    update: builder.mutation<TripsResponse, UpdateTripRequestBody>({
      query: ({ tripId, ...body }) => ({
        method: 'PUT',
        url: `/${tripId}`,
        data: body,
      }),
      invalidatesTags: (result, error, { tripId }) => [
        { type: 'Trip', id: tripId },
        { type: 'Trip', id: 'LIST' },
      ],
    }),
  }),
});

export const useGetTripsQuery = tripAPI.endpoints.getTrips.useQuery;
export const useGetTripByIdQuery = tripAPI.endpoints.getTripById.useQuery;
export const useCreateTripQuery = tripAPI.endpoints.create.useMutation;
export const useUpdateTripQuery = tripAPI.endpoints.update.useMutation;
export const useDeleteTripByIdQuery = tripAPI.endpoints.delete.useMutation;
