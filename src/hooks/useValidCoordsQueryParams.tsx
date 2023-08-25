import { useEffect } from 'react';
import { toQueryParams } from '../helpers/queries';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getValidCoordsParams } from '../helpers/map';

export const useValidCoordsQueryParams = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const isValidatedUrl = Boolean(location.state?.isValid);

  const lng = searchParams.get('lng');
  const lat = searchParams.get('lat');
  const z = searchParams.get('z');
  const tripId = searchParams.get('t');

  const validQueryParams = getValidCoordsParams({
    lat,
    lng,
    z,
    floor: 5,
    byDefault: { lng: '43.56969', lat: '53.17954', z: '4.25716' },
    maxZoom: 20,
    minZoom: 1.3,
  });

  const initialViewMapProps = {
    longitude: Number(validQueryParams.lng),
    latitude: Number(validQueryParams.lat),
    zoom: Number(validQueryParams.z),
  };

  useEffect(() => {
    if (isValidatedUrl) {
      return;
    }

    const validQueryParamsWithTripId: {
      z: string;
      lat: string;
      lng: string;
      t?: string;
    } = validQueryParams;

    if (tripId) {
      validQueryParamsWithTripId.t = tripId;
    }

    navigate(`${location.pathname}${toQueryParams(validQueryParamsWithTripId)}`, {
      replace: true,
      state: { isValid: true },
    });
  }, []);

  return { initialViewMapProps, coordsQueryParams: validQueryParams };
};
