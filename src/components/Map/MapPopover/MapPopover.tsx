import React from 'react';
import { Popup } from 'react-map-gl';
import { Feature, RouteItem } from '../../../types/map';
import styles from './MapPopover.module.scss';
import { isHotel, toRoute } from '../../../helpers/map';
import { Image } from '../../Image/Image';
import { IconRoute } from '../../Icons';
import { Button } from '../../Button/Button';
import { useGetHotelLinkQuery } from '../../../services/hotel';
import { Link } from 'react-router-dom';

type Props = {
  feature: Feature;
  onClose?: () => void;
  onClickAddRoute?: (item: RouteItem) => void;
};

export const MapPopover: React.FC<Props> = ({
  feature,
  onClose = () => null,
  onClickAddRoute = () => null,
}) => {
  const handleClickAddRoute = () => {
    const route = toRoute(feature);
    if (route) {
      onClickAddRoute(route);
    }
    onClose();
  };

  const { data } = useGetHotelLinkQuery(feature.properties.id, {
    skip: !isHotel(feature),
  });

  const [longitude, latitude] = feature.geometry.coordinates;
  const { photo_links, name, city_name, region_name, region_name_en, type_name_en, id } =
    feature.properties;

  console.log(data)
  console.log({ feature });

  const renderName = isHotel(feature) ? (
    <a className={styles.name} href={data?.url} target="_blank" rel="noreferrer">
      {name}
      {console.log(data)}
    </a>
  ) : (
    <Link to={`/places/${region_name_en}/${type_name_en}/${id}`} className={styles.name}>
      {name}
    </Link>
  );
  console.log(photo_links);

  const startIndex = photo_links.indexOf('"') + 1;
  const endIndex = photo_links.lastIndexOf('"');
  const fixPhoto = photo_links.substring(startIndex, endIndex);

  return (
    <Popup
      anchor="bottom"
      longitude={longitude}
      latitude={latitude}
      closeButton={false}
      onClose={onClose}
      offset={25}
    >
      <div className={styles.wrap}>
        <Image src={fixPhoto} className={styles.img} />

        <div className={styles.content}>
          <div className={styles.info}>
            {renderName}

            <div className={styles.description}>{city_name || region_name}</div>
          </div>

          <Button
            onClick={handleClickAddRoute}
            className={styles.button}
            shape="round"
            icon={<IconRoute size={12} />}
            size="small"
          >
            Маршрут
          </Button>
        </div>
      </div>
    </Popup>
  );
};
