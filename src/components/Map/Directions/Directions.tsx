import React from 'react';
import { Layer, LayerProps, Source } from 'react-map-gl';

const layerStyle = {
  id: 'route',
  type: 'line',
  layout: {
    'line-join': 'round',
    'line-cap': 'round',
  },
  paint: {
    'line-color': '#3887be',
    'line-width': 5,
    'line-opacity': 0.75,
  },
} as LayerProps;

export const Directions: React.FC<{ data?: any }> = ({ data }) => {
  const geojson = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: data ? data.routes[0].geometry.coordinates : [],
    },
  };

  if (!data) {
    return null;
  }

  return (
    <Source id="dir" type="geojson" data={geojson as any}>
      <Layer {...layerStyle} />
    </Source>
  );
};
