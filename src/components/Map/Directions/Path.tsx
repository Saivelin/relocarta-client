import React from 'react';
import { Layer, LayerProps, Source } from 'react-map-gl';

const layerStyle = {
  id: 'path',
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

export const Path: React.FC<{ coordinates?: [number, number][] }> = ({ coordinates }) => {
  if (!coordinates) {
    return null;
  }

  const geojson = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates,
    },
  };

  return (
    <Source id="dir" type="geojson" data={geojson as any}>
      <Layer {...layerStyle} />
    </Source>
  );
};
