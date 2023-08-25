import { FC, useCallback, useState } from 'react';
import style from './MapWithSearch.module.scss';
import { Map } from '../../components/Map/Map';
import { useAddRoute } from '../../hooks/useNavigatePage';
import { useMapData } from '../../hooks/useMapData';
import { Search } from './Search/Search';
import { MapSearch } from '../../components/Map/MapSearch';
import { useOpenCloseToggle } from '../../hooks/useOpenCloseToggle';

export const MapWithSearch: FC = () => {
  const [viewState, setViewState] = useState({
    longitude: 47,
    latitude: 56,
    zoom: 4,
  });

  const [searchViewState, setSearchViewViewState] = useState<{
    longitude: number;
    latitude: number;
    zoom: number;
  } | null>(null);

  const { addRoute } = useAddRoute();

  const { data: geoData = [], fetchGeoJSON, initializeMapWithData } = useMapData();

  const fetchGeoForSearchResult = useCallback(fetchGeoJSON, [searchViewState]);
  const [isOpenSearch, openSearch, closeSearch] = useOpenCloseToggle(true);

  console.log({ isOpenSearch });
  return (
    <div className={style.container}>
      <Search
        isOpen={isOpenSearch}
        setViewState={setViewState}
        setSearchViewViewState={setSearchViewViewState}
      />

      <Map
        data={geoData}
        initialize={initializeMapWithData}
        viewState={viewState}
        onMove={(evt) => {
          setViewState(evt.viewState);
          fetchGeoJSON(evt.target);
        }}
        addToNavigation={addRoute}
        onClick={(feature) => {
          if (feature?.length) {
            closeSearch();
          } else {
            openSearch();
          }
        }}
      >
        {searchViewState && <MapSearch fetchGeoJSON={fetchGeoForSearchResult} />}
      </Map>
    </div>
  );
};
