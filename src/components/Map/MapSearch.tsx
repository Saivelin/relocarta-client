import React, { useEffect } from 'react';
import { useMap, MapRef } from 'react-map-gl';

type MapRefCustom = MapRef & { setLanguage: (lang: string) => void };

type Props = {
  fetchGeoJSON: (map: mapboxgl.Map | MapRef) => void;
};

export const MapSearch: React.FC<Props> = ({ fetchGeoJSON }) => {
  const { current } = useMap();

  useEffect(() => {
    const map = current as MapRefCustom;
    fetchGeoJSON(map);
  }, [fetchGeoJSON]);

  return null;
};
