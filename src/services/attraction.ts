import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '.';

interface AttractionBase {
  email: string;
  description: string;
  cityName: string;
  regionName: string;
  lat: number;
  lng: number;
}

export interface CreateAttractionRequestBody extends AttractionBase {
  name: string;
  haveCopyright: boolean;
  media: {
    type: string;
    data: string;
  }[];
}

export interface CreateAttractionMistakeRequestBody extends AttractionBase {
  attractionId: string;
  types: string[];
  haveCopyright: boolean;
  media: {
    type: string;
    data: string;
  }[];
}

export interface AttractionOption {
  id: string;
  name: string;
  nameEn: string;
}

export interface AttractionSubtypeOption extends AttractionOption {
  type: AttractionOption;
}

export interface CreateAttractionDescriptionRequestBody extends AttractionBase {
  attractionId: string;
}

export interface CreateSubTypeBody {
  attractionTypeId: string;
  name: string;
  nameEn: string;
}

export interface CreateAttractionMediaBody {
  attractionId: string;
  main: boolean;
  haveCopyright: boolean;
  type: string;
}

export interface UploadAttractionMediaBody {
  attractionId: string;
  mediaId: string;
  media: {
    type: string;
    data: string;
  }[];
}

export interface CreateAttractionModeratorBody {
  attractionId?: string;
  name: string;
  address: string;
  cityId: string;
  scaleId: string;
  poiTypeId?: string;
  typeId: string;
  subtypeId: string;
  description: string;
  phone: string;
  email: string;
  features?: string;
  lat: number;
  lng: number;
}

export interface Attraction {
  id: string;
  name: string;
  address: string;
  city: {
    id: string;
    name: string;
    region: {
      id: {
        name: string;
        country: {
          id: string;
          name: string;
          nameEn: string;
        };
        nameEn: string;
      };
    };
    scale: {
      id: string;
      name: string;
      nameEn: string;
    };
    poiType: {
      id: string;
      name: string;
      nameEn: string;
      nameMany: string;
    };
    subtype: {
      id: string;
      name: string;
      nameEn: string;
      type: {
        id: string;
        name: string;
        nameEn: string;
      };
    };
    description: string;
    phone: string;
    email: string;
    features: string;
    media: [
      {
        id: string;
        link: string;
        main: boolean;
        haveCopyright: boolean;
        type: string;
      },
    ];
    lat: number;
    lng: number;
  };
}

export interface AttractionUpdateBody {
  attractionId: string;
  name: string;
  address: string;
  cityId: string;
  scaleId: string;
  poiTypeId: string;
  subtypeId: string;
  description: string;
  phone: string;
  email: string;
  features: string;
  lat: number;
  lng: number;
}

export const attractionAPI = createApi({
  reducerPath: 'attractionAPI',
  baseQuery: axiosBaseQuery({
    baseUrl: '/api/attraction',
  }),
  tagTypes: ['Attraction'],
  endpoints: (builder) => ({
    create: builder.mutation<string, CreateAttractionRequestBody>({
      query: (body) => ({
        method: 'POST',
        url: '/request/new',
        data: body,
      }),
      invalidatesTags: ['Attraction'],
    }),
    createMistake: builder.mutation<string, CreateAttractionMistakeRequestBody>({
      query: (body) => ({
        method: 'POST',
        url: '/request/mistake',
        data: body,
      }),
      invalidatesTags: ['Attraction'],
    }),
    createDescription: builder.mutation<string, CreateAttractionDescriptionRequestBody>({
      query: (body) => ({
        method: 'POST',
        url: '/request/description',
        data: body,
      }),
      invalidatesTags: ['Attraction'],
    }),
    getAttractionScales: builder.query<AttractionOption[], void>({
      query: () => ({
        url: '/scale',
      }),
    }),
    getAttractionTypes: builder.query<AttractionOption[], void>({
      query: () => ({
        url: '/type',
      }),
    }),
  }),
});

export const moderatorAttractionApi = createApi({
  reducerPath: 'moderatorAttractionApi',
  baseQuery: axiosBaseQuery({
    baseUrl: '/moderator-api/attraction',
  }),
  tagTypes: ['ModeratorAttraction'],
  endpoints: (builder) => ({
    getAttractionSubtypes: builder.query<AttractionSubtypeOption[], string | undefined>({
      query: (attractionTypeId) => ({
        url: `/subtype?attractionTypeId=${attractionTypeId}`,
      }),
    }),
    createSubtype: builder.mutation<string, CreateSubTypeBody>({
      query: (body) => ({
        method: 'POST',
        url: '/subtype',
        data: body,
      }),
      invalidatesTags: ['ModeratorAttraction'],
    }),
    createMedia: builder.mutation<string, CreateAttractionMediaBody>({
      query: ({ attractionId, ...body }) => ({
        method: 'POST',
        url: `${attractionId}/media`,
        data: body,
      }),
      invalidatesTags: ['ModeratorAttraction'],
    }),
    uploadMedia: builder.mutation<string, UploadAttractionMediaBody>({
      query: ({ attractionId, mediaId, ...body }) => ({
        method: 'POST',
        url: `${attractionId}/media/${mediaId}/upload`,
        data: body,
      }),
      invalidatesTags: ['ModeratorAttraction'],
    }),
    createAttraction: builder.mutation<string, CreateAttractionModeratorBody>({
      query: (body) => ({
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['ModeratorAttraction'],
    }),
    getAttraction: builder.query<Attraction, string | undefined>({
      query: (attractionId) => ({
        url: `/${attractionId}`,
      }),
    }),
    getAttractions: builder.query<
      Attraction[],
      {
        regionId: string;
        search?: string;
        typeId?: string;
        subtypeId?: string;
        scaleId?: string;
      }
    >({
      query: ({ regionId, search, typeId, subtypeId, scaleId }) => ({
        url: `?regionId=${regionId}&search=${search}&typeId=${typeId}&subtypeId=${subtypeId}&scaleId=${scaleId}`,
      }),
    }),
    updateAttraction: builder.mutation<string, AttractionUpdateBody>({
      query: ({ attractionId, ...body }) => ({
        method: 'PUT',
        data: body,
        url: `/${attractionId}`,
      }),
      invalidatesTags: ['ModeratorAttraction'],
    }),
    deleteAttraction: builder.mutation<string, AttractionUpdateBody>({
      query: (attractionId) => ({
        method: 'DELETE',
        url: `/${attractionId}`,
      }),
      invalidatesTags: ['ModeratorAttraction'],
    }),
  }),
});

export const useCreateNewAttractionRequestQuery =
  attractionAPI.endpoints.create.useMutation;
export const useAttractionMistakeRequestQuery =
  attractionAPI.endpoints.createMistake.useMutation;
export const useAttractionDescriptionRequestQuery =
  attractionAPI.endpoints.createDescription.useMutation;
export const useGetAttractionScalesQuery =
  attractionAPI.endpoints.getAttractionScales.useQuery;
export const useGetAttractionTypesQuery =
  attractionAPI.endpoints.getAttractionTypes.useQuery;

export const useGetAttractionSubtypesQuery =
  moderatorAttractionApi.endpoints.getAttractionSubtypes.useQuery;
export const useCreateSubtypeRequestQuery =
  moderatorAttractionApi.endpoints.createSubtype.useMutation;
export const useCreateAttractionMediaQuery =
  moderatorAttractionApi.endpoints.createMedia.useMutation;
export const useUploadAttractionMediaQuery =
  moderatorAttractionApi.endpoints.uploadMedia.useMutation;
export const useCreateAttractionQuery =
  moderatorAttractionApi.endpoints.createAttraction.useMutation;
export const useGetAttractionQuery =
  moderatorAttractionApi.endpoints.getAttraction.useQuery;
export const useGetAttractionsQuery =
  moderatorAttractionApi.endpoints.getAttractions.useQuery;
export const useUpdateAttractionQuery =
  moderatorAttractionApi.endpoints.updateAttraction.useMutation;
export const useDeleteAttractionQuery =
  moderatorAttractionApi.endpoints.deleteAttraction.useMutation;
