import { useNavigate } from 'react-router-dom';
import { toRoute } from '../helpers/map';
import { GeoJsonProperties } from 'geojson';
import { RouteItem } from '../types/map';
import { UniqPlacesQueryParams } from '../router/pages/ExtraordinaryPage/ExtraordinaryPage';
import { toQueryParams } from '../helpers/queries';
import { ROUTE } from '../constants/route';

export const useNavigateToMapPage = (feature: GeoJsonProperties) => {
  const navigate = useNavigate();

  const navigateToMapPage = (isRoute?: boolean) => {
    const route = isRoute ? feature : toRoute(feature);

    if (route) {
      const [lng, lat] = route.coordinates;

      navigate(`/map/?lng=${lng}&lat=${lat}&z=10`, { state: { route } });
    }
  };

  return { navigateToMapPage };
};

export const useNavigateExtraordinaryPage = () => {
  const navigate = useNavigate();

  const navigateToExtraordinaryPage = (params?: UniqPlacesQueryParams) => {
    if (params) {
      navigate(`${ROUTE.EXTRA}${toQueryParams(params)}`);
    } else {
      navigate(ROUTE.EXTRA);
    }
  };

  return { navigateToExtraordinaryPage };
};

export const useNavigatePlacePage = () => {
  const navigate = useNavigate();

  const navigateToPlacePage = (props: { id: string; region: string; type: string }) => {
    const { id, type, region } = props;
    navigate(`/places/${region}/${type}/${id}`);
  };

  return { navigateToPlacePage };
};

export const useAddRoute = () => {
  const navigate = useNavigate();

  const addRoute = (route: RouteItem) => {
    const [lng, lat] = route.coordinates;

    navigate(`/map/?lng=${lng}&lat=${lat}&z=10`, { state: { route } });
  };

  return { addRoute };
};
