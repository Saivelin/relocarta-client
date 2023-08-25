export type RouteItem = {
  data: Record<string, number | string | boolean>;
  coordinates: [number, number];
};

export type Feature = {
  geometry: {
    coordinates: [number, number];
  };
  properties: {
    address: string;
    city_name: string;
    country_name: string;
    icon_link: string;
    id: string;
    name: string;
    photo_link: string;
    poi_type_name: string;
    poi_type_name_en: string;
    rate_count: number;
    region_name: string;
    region_name_en: string;
    scale_name: string;
    scale_name_en: string;
    subtype_name: string;
    subtype_name_en: string;
    type_name: string;
    type_name_en: string;
  };
};
