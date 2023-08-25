import React, { useState } from 'react';
import ReactMapGl, { NavigationControl, MapProps, Marker } from 'react-map-gl';
import { MapSettings } from './MapSettings';
import { MAPBOX_TOKEN } from '../../constants/map';
import { MapPopover } from './MapPopover/MapPopover';
import { RenderLayer } from './RenderLayer/RenderLayer';
import { Feature, RouteItem } from '../../types/map';
import { GeoJsonResponse } from '../../services/geojson';
import { PointPopover } from './PointPopover/PointPopover';

type Props = {
  viewState: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  addToNavigation?: (route: RouteItem) => void;
  onMove: MapProps['onMove'];
  data: GeoJsonResponse;
  initialize: any;
  onClick?: (feature?: mapboxgl.MapboxGeoJSONFeature[]) => void;
};

export const Map: React.FC<Props> = ({
  viewState,
  addToNavigation = () => null,
  onMove,
  children,
  data: geoData,
  initialize,
  onClick = () => null,
}) => {
  const [feature, setFeature] = React.useState<null | Feature>(null);

  // TODO: Разобраться как менять курсор в настройках слоев
  const [cursor, setCursor] = React.useState<string>('grab');
  const onMouseEnter = React.useCallback(() => setCursor('pointer'), []);
  const onMouseLeave = React.useCallback(() => setCursor('grab'), []);

  const [point, setPoint] = useState<{ lng: number; lat: number } | null>(null);

  return (
    <>
      <ReactMapGl
        {...viewState}
        maxZoom={20}
        ref={initialize}
        minZoom={1.3}
        onMove={onMove}
        cursor={cursor}
        onContextMenu={(evt) => {
          setPoint(evt.lngLat);
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        interactiveLayerIds={geoData?.map((d, index) => String(index))}
        onClick={(evt) => {
          setPoint(null);
          onClick(evt.features);
          if (!evt.features) return;

          setFeature(evt.features[0] as unknown as Feature);
        }}
        mapStyle="mapbox://styles/relocarta/clky9fr0k006s01pm1fty8zlg"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <NavigationControl />
        <MapSettings />

        {point && <Marker latitude={point.lat} longitude={point.lng} />}

        {geoData?.map(({ geojson, font, scale, poi_type_name_en }, index) => (
          <RenderLayer
            scale={scale}
            poi_type_name_en={poi_type_name_en}
            key={index}
            geojson={geojson}
            layerId={String(index)}
            sourceId={String(index)}
            font={font}
            beforeId={index > 0 ? String(index - 1) : undefined}
          />
        ))}

        {feature && (
          <MapPopover
            feature={feature}
            onClose={() => setFeature(null)}
            onClickAddRoute={addToNavigation}
          />
        )}

        {children}
      </ReactMapGl>
      {point && (
        <PointPopover
          {...point}
          onClose={() => setPoint(null)}
          onClickAddRoute={(route) => {
            addToNavigation(route);
            setPoint(null);
          }}
        />
      )}
    </>
  );
};
