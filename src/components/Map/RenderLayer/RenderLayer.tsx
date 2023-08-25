import { Layer, LayerProps, Source, useMap } from 'react-map-gl';
import { useEffect } from 'react';
import { GeoJsonResponse } from '../../../services/geojson';
import { getIconLink } from '../../../helpers/map';
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

type Props = {
  layerId: string;
  sourceId: string;
  beforeId?: string;
  geojson: GeoJsonResponse[number]['geojson'];
  font?: string;
  scale: string;
  poi_type_name_en: string;
};

export const RenderLayer: React.FC<Props> = ({
  geojson,
  layerId,
  sourceId,
  beforeId,
  font,
  scale,
  poi_type_name_en,
}) => {
  const { current: map } = useMap();
  const iconLinks = geojson.features.map((item) => item.properties?.icon_link);

  const isBig = font === 'big';

  const iconMap: Record<string, any> = {
    attraction: {
      big1: 'attraction-big',
      big2: 'attraction-big',
      medium: 'attraction-medium',
      small: 'attraction-small',
    },
    hotel: {
      big1: 'hotel',
      big2: 'hotel',
      medium: 'hotel',
      small: 'hotel',
    },
    'tour-service': {
      big1: 'tour-service',
      big2: 'tour-service',
      medium: 'tour-service',
      small: 'tour-service',
    },
    'tour-event': {
      big1: 'tour-event',
      big2: 'tour-event',
      medium: 'tour-event',
      small: 'tour-event',
    },
    restaurant: {
      big1: 'restaurant-novitravel',
      big2: 'restaurant-novitravel',
      medium: 'restaurant-novitravel',
      small: 'restaurant-novitravel',
    },
    excursion: {
      big1: 'excursion',
      big2: 'excursion',
      medium: 'excursion',
      small: 'excursion',
    },
  };

  const icon = (iconMap[poi_type_name_en] || iconMap.attraction)[scale] || [
    'get',
    'icon_link',
  ];
  const textSettings = {
    'text-font': isBig ? ['DIN Pro Medium'] : ['DIN Pro Regular'],
    'text-size':
      poi_type_name_en === 'hotel'
        ? 0
        : {
            base: 60,
            stops: isBig
              ? [
                  [3, 11],
                  [6, 12],
                  [8, 12],
                  [13, 12],
                ]
              : [
                  [3, 11],
                  [6, 12],
                  [8, 12],
                  [13, 12],
                ],
          },
  };

  const layerStyleExtra: LayerProps = {
    id: layerId,
    type: 'symbol',
    // minzoom: 0,
    layout: {
      // 'icon-ignore-placement': true,
      // 'text-ignore-placement': true,
      // 'icon-image': 'attraction-big',
      'icon-image': icon, // reference the image
      'icon-size': {
        base: 0.5,
        stops: [
          [12, 0.5],
          [16, 0.45],
        ],
      },
      'text-field': ['get', 'name'],
      ...textSettings,
      'text-anchor': 'top',
      'text-offset': [0, 1.5],
      'text-max-width': 7,
      'text-letter-spacing': 0,
      'text-line-height': 1.1,
    },
    paint: {
      'text-color': '#000',
      'text-halo-color': '#fff',
      'text-halo-width': 1,
      'text-halo-blur': 1,
      'text-opacity': 1,
    },
  };

  useEffect(() => {
    if (!map) {
      return;
    }

    iconLinks.forEach((link) => {
      if (!link || map.hasImage(link)) {
        return;
      }

      const iconUrl = getIconLink(link);
      if (iconUrl === '/images/plug-popup.png') {
        return;
      }

      map?.loadImage(iconUrl, (error, image) => {
        if (error) throw error;

        map.addImage(link, image as any, { sdf: false });
      });
    });
  }, [geojson]);

  return (
    <Source
      id={sourceId}
      type="geojson"
      data={geojson as FeatureCollection<Geometry, GeoJsonProperties>}
    >
      <Layer {...layerStyleExtra} beforeId={beforeId} />
    </Source>
  );
};
