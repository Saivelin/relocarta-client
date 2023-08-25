import Map, { Marker } from 'react-map-gl';
import { MAPBOX_TOKEN } from '../../../constants/map';
import { MapSettings } from '../../../components/Map/MapSettings';

interface MapPlacePropsType {
  longitude: number;
  latitude: number;
  onClick: () => void;
}

export const MapPlace: React.FC<MapPlacePropsType> = ({
  longitude,
  latitude,
  onClick,
}) => {
  return (
    <Map
      longitude={longitude}
      latitude={latitude}
      zoom={14}
      interactiveLayerIds={['foo', 'point']}
      onRender={(event) => event.target.resize()}
      mapStyle="mapbox://styles/relocarta/clky9fr0k006s01pm1fty8zlg"
      mapboxAccessToken={MAPBOX_TOKEN}
      onClick={onClick}
    >
      <MapSettings />
      <Marker longitude={longitude} latitude={latitude} anchor="center" color="red" />
    </Map>
  );
};
