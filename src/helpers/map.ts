import { GeoJsonProperties } from 'geojson';
import { NavigationInfo } from '../components/Map/NavigationPanel/NavigationPanel';

export const toRoute = (popupInfo: GeoJsonProperties) => {
  const data = popupInfo?.properties;
  const coordinates = popupInfo?._geometry.coordinates;

  if (!popupInfo) {
    return null;
  }

  return { data, coordinates };
};

export const isValidCoords = (lat: string | null, lng: string | null) => {
  if (!lat || !lng) {
    return false;
  }
  const regexLat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
  const regexLon = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;

  return regexLat.test(lat) && regexLon.test(lng);
};

const toValidCoords = ({
  lng,
  lat,
  byDefault,
  floor,
}: {
  lat: string | null;
  lng: string | null;
  byDefault: { lat: string; lng: string };
  floor: number;
}) => {
  if (!lat || !lng) {
    return byDefault;
  }

  if (isValidCoords(lat, lng)) {
    return { lng: toFloorParamStr(lng, floor), lat: toFloorParamStr(lat, floor) };
  }

  return byDefault;
};

export const isNumber = (numStr: string) => {
  return !isNaN(parseFloat(numStr)) && !isNaN(+numStr);
};

const toValidZoom = (
  zoom: string | null,
  {
    min,
    max,
    byDefault,
    floor,
  }: { max: number; min: number; byDefault: string; floor: number },
) => {
  if (!zoom) {
    return byDefault;
  }

  if (isNumber(zoom) && Number(zoom) < max && Number(zoom) > min) {
    return toFloorParamStr(zoom, floor);
  }

  return byDefault;
};

export const getValidCoordsParams = ({
  lng,
  lat,
  z,
  byDefault,
  floor,
  minZoom,
  maxZoom,
}: {
  lat: string | null;
  lng: string | null;
  z: string | null;
  byDefault: { lat: string; lng: string; z: string };
  floor: number;
  minZoom: number;
  maxZoom: number;
}) => {
  const { z: defaultZoom, ...defaultCoords } = byDefault;

  return {
    ...toValidCoords({ lat, lng, byDefault: defaultCoords, floor }),
    z: toValidZoom(z, { byDefault: defaultZoom, min: minZoom, max: maxZoom, floor }),
  };
};

export const floorCoordsParams = ({
  lat,
  lng,
  z,
}: {
  lat: number;
  lng: number;
  z: number;
}) => {
  return {
    lng: toFloorParamStr(String(lng), 5),
    lat: toFloorParamStr(String(lat), 5),
    z: toFloorParamStr(String(z), 5),
  };
};

const toFloorParamStr = (param: string, floor: number): string => {
  return String(parseFloat(Number(param).toFixed(floor)));
};

export function toHoursAndMinutes(totalSeconds: number) {
  const totalMinutes = Math.floor(totalSeconds / 60);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}ч ${minutes}м`;
}

export const getFormatNavigationInfo = (navigationInfo: NavigationInfo) => {
  const km = navigationInfo && `${Math.floor(navigationInfo.distance / 1000)} км`;
  const hourMinutes = navigationInfo && `${toHoursAndMinutes(navigationInfo.duration)}`;

  return { km, hourMinutes };
};

export const getIconLink = (link?: string | null) => {
  let iconLink = '/images/plug-popup.png';

  if (link && link.startsWith('/img/int')) {
    iconLink = link;
  }

  return iconLink;
};

export const getImgLink = (link?: string) => {
  return link;
};

export const isHotel = (feature: any) => {
  return feature.properties.poi_type_name_en === 'hotel';
};
