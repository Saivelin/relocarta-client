import { FC, useState } from 'react';
import styles from './TestMapPage.module.scss';
import { Map } from '../../../components/Map/Map';
import { useMapData } from '../../../hooks/useMapData';
import { Input } from 'antd';

export const TestMapPage: FC = () => {
  const [viewState, setViewState] = useState({
    longitude: 47,
    latitude: 56,
    zoom: 4,
  });

  const {
    data: geoData = [],
    fetchGeoJSON,
    initializeMapWithData,
    queryParams,
    setQueryParams,
  } = useMapData();

  return (
    <div className={styles.page}>
      <Map
        data={geoData}
        viewState={viewState}
        initialize={initializeMapWithData}
        addToNavigation={() => null}
        onMove={(evt) => {
          setViewState(evt.viewState);
          fetchGeoJSON(evt.target);
        }}
      />

      <div className={styles.panel}>
        <div>east</div>
        <Input value={queryParams.east} />

        <div>north</div>
        <Input value={queryParams.north} />

        <div>south</div>
        <Input value={queryParams.south} />

        <div>west</div>
        <Input value={queryParams.west} />

        <div>zoom</div>
        <Input value={queryParams.zoom} />
      </div>
    </div>
  );
};
