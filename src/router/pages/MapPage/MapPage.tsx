import { MapWithNavigation } from '../../../features/MapWithNavigation/MapWithNavigation';
import { useValidCoordsQueryParams } from '../../../hooks/useValidCoordsQueryParams';

const MapPage: React.FC = () => {
  const { initialViewMapProps } = useValidCoordsQueryParams();

  return <MapWithNavigation {...initialViewMapProps} />;
};

export default MapPage;
