import { combineReducers } from '@reduxjs/toolkit';
import { geojsonAPI } from '../services/geojson';
import { mapboxAPI } from '../services/mapbox';
import { newsAPI } from '../services/news';
import { placesAPI } from '../services/places';
import { poiAPI } from '../services/poi';
import { uniqPlacesAPI } from '../services/uniqPlaces';
import { hotelAPI } from '../services/hotel';
import { tripAPI } from '../services/trip';
import { attractionAPI, moderatorAttractionApi } from '../services/attraction';
import { locationApi } from '../services/location';

export const rootReducer = combineReducers({
  [mapboxAPI.reducerPath]: mapboxAPI.reducer,
  [geojsonAPI.reducerPath]: geojsonAPI.reducer,
  [newsAPI.reducerPath]: newsAPI.reducer,
  [placesAPI.reducerPath]: placesAPI.reducer,
  [poiAPI.reducerPath]: poiAPI.reducer,
  [uniqPlacesAPI.reducerPath]: uniqPlacesAPI.reducer,
  [hotelAPI.reducerPath]: hotelAPI.reducer,
  [tripAPI.reducerPath]: tripAPI.reducer,
  [attractionAPI.reducerPath]: attractionAPI.reducer,
  [moderatorAttractionApi.reducerPath]: moderatorAttractionApi.reducer,
  [locationApi.reducerPath]: locationApi.reducer,
});

export const RTKQueryMiddlewares = [
  mapboxAPI.middleware,
  geojsonAPI.middleware,
  newsAPI.middleware,
  placesAPI.middleware,
  poiAPI.middleware,
  uniqPlacesAPI.middleware,
  hotelAPI.middleware,
  tripAPI.middleware,
  attractionAPI.middleware,
  moderatorAttractionApi.middleware,
  locationApi.middleware,
];
