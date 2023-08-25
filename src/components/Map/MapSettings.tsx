import React, { useEffect } from 'react';
import { useMap, MapRef } from 'react-map-gl';

type MapRefCustom = MapRef & { setLanguage: (lang: string) => void };

export const MapSettings: React.FC = () => {
  const { current } = useMap();

  useEffect(() => {
    const map = current as MapRefCustom;

    map.setLanguage('ru');
  }, []);

  return null;
};
