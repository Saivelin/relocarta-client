import { FC } from 'react';
import styles from './PointPopover.module.scss';
import { useGetGeoQuery } from '../../../services/mapbox';
import { RouteItem } from '../../../types/map';
import { IconClose, IconGeo, IconRoute } from '../../Icons';
import { Button } from '../../Button/Button';
import { formatRegionAndCity } from '../../../helpers/format';
import { useOpenCloseToggle } from '../../../hooks/useOpenCloseToggle';
import { AddNewPointModal } from '../AddNewPointModal/AddNewPointModal';

type Props = {
  lat: number;
  lng: number;
  onClose: () => void;
  onClickAddRoute?: (item: RouteItem) => void;
};

export const PointPopover: FC<Props> = ({
  lat,
  lng,
  onClose,
  onClickAddRoute = () => null,
}) => {
  const { data } = useGetGeoQuery({ lat, lng });
  const [isNewPoint, openNewPoint, closeNewPoint] = useOpenCloseToggle(false);

  if (!data) {
    return null;
  }

  const addressFeature = (data?.features || []).find((f: any) =>
    f.id.startsWith('address'),
  );
  let address = '';
  if (addressFeature?.text_ru) {
    address += addressFeature.text_ru;
  }

  if (addressFeature?.address) {
    address += ', ' + addressFeature.address;
  }

  const localityFeature = (data?.features || []).find((f: any) =>
    f.id.startsWith('locality'),
  );
  const locality = localityFeature?.text_ru;

  const poiFeature = (data?.features || []).find((f: any) => f.id.startsWith('poi'));
  const poi = poiFeature?.text_ru;

  const placeFeature = (data?.features || []).find((f: any) => f.id.startsWith('place'));
  const place = placeFeature?.text_ru;

  const districtFeature = (data?.features || []).find((f: any) =>
    f.id.startsWith('district'),
  );
  const district = districtFeature?.text_ru;

  const regionFeature = (data?.features || []).find((f: any) =>
    f.id.startsWith('region'),
  );
  const region = regionFeature?.text_ru;

  const info = [address, place, district, region].filter(Boolean);

  const [name, ...description] = info;

  const onClick = () =>
    onClickAddRoute({
      coordinates: [lng, lat],
      data: {
        name: info[0],
        region_name: info[1] || '',
      },
    });

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.close} onClick={onClose}>
          <IconClose />
        </div>

        <div className={styles.img}>
          <IconGeo size={24} />
        </div>

        <div className={styles.content}>
          <div className={styles.text}>{name}</div>

          <div className={styles.city}>{formatRegionAndCity(region, place)}</div>

          <div className={styles.actions}>
            <Button
              onClick={onClick}
              className={styles.button}
              shape="round"
              icon={<IconRoute size={12} />}
              size="small"
            >
              Добавить в маршрут
            </Button>

            <Button
              onClick={openNewPoint}
              className={styles.button}
              shape="round"
              size="small"
              clear
            >
              Новое место
            </Button>
          </div>
        </div>
      </div>
      {isNewPoint && (
        <AddNewPointModal
          onClose={closeNewPoint}
          lat={lat}
          lng={lng}
          regionName={region}
          cityName={place}
        />
      )}
    </>
  );
};
