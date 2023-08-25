import { useDebounce } from './useDebounce';
import { GeoQueryParams, useGetGeoJSONQuery } from '../services/geojson';
import { MapRef } from 'react-map-gl';
import { useCallback } from 'react';

export const useMapData = () => {
  const [queryParams, setQueryParamsWithDelay, setQueryParams] =
    useDebounce<GeoQueryParams>(
      {
        zoom: 0,
        west: 0,
        south: 0,
        east: 0,
        north: 0,
      },
      500,
    );

  const { data } = useGetGeoJSONQuery(queryParams, {
    skip: queryParams.zoom === 0,
  });

  const fetchGeoJSON = (map: MapRef | mapboxgl.Map) => {
    const bounds = map.getBounds();
    const [west, south, east, north] = bounds.toArray().flat();

    const params = {
      west,
      south,
      east,
      north,
      zoom: map.getZoom(),
    };

    setQueryParamsWithDelay(params);
  };

  const initializeMapWithData = useCallback((map: MapRef | mapboxgl.Map | null) => {
    if (!map) {
      return;
    }

    fetchGeoJSON(map);
  }, []);

  return { data, fetchGeoJSON, initializeMapWithData, queryParams, setQueryParams };
};
