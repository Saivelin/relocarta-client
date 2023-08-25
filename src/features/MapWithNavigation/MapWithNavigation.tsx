import React, { useCallback, useEffect } from 'react';
import { useOpenCloseToggle } from '../../hooks/useOpenCloseToggle';
import { MapHeader } from '../../components/Map/MapHeader/MapHeader';
import { Search } from '../../components/SideBar/Search/Search';
import { SideBarSelfNav } from '../../components/SideBar/SideBarNavigations/SideBarSelfNav';
import { SideBarNav } from '../../components/SideBar/SideBarNavigations/SideBarNav';
import { SearchResults } from '../../components/SideBar/SearchResults/SearchResults';
import { SideBar } from '../../components/SideBar/SideBar';
import { NavigationPanel } from '../../components/Map/NavigationPanel/NavigationPanel';
import { Logo } from '../../components/Logo/Logo';
import style from './MapWithNavigation.module.scss';
import { useMapData } from '../../hooks/useMapData';
import { useMapNavigation } from '../../hooks/useMapNavigation';
import { useSearchParams } from 'react-router-dom';
import { debounce } from '../../helpers/utils';
import { floorCoordsParams } from '../../helpers/map';
import { Map } from '../../components/Map/Map';
import { useDeleteTripByIdQuery, useGetTripByIdQuery } from '../../services/trip';
import { MyTrips } from './MyTrips/MyTrips';

type Props = {
  longitude: number;
  latitude: number;
  zoom: number;
};

export const MapWithNavigation: React.FC<Props> = (
  initialViewState = {
    longitude: 47,
    latitude: 56,
    zoom: 4,
  },
) => {
  const [isMenuOpen, , closeMenu, toggleMenu] = useOpenCloseToggle();
  const [isSearchOpen, , closeSearch, toggleSearch] = useOpenCloseToggle();
  const [isTripsOpen, openTrips, closeTrips] = useOpenCloseToggle();
  const [viewState, setViewState] = React.useState(initialViewState);

  const {
    navigationProps,
    renderNavigation,
    addPointToNavigation,
    addTripToNavigation,
    openNavigationPanel,
    handleCloseNavPanel,
  } = useMapNavigation();
  const [searchParams, setSearchParams] = useSearchParams();
  const tripId = searchParams.get('t') || '';

  const setViewStateToQueryParams = useCallback(
    debounce((viewState: Props) => {
      const { latitude: lat, longitude: lng, zoom: z } = viewState;

      const params: Record<string, string> = floorCoordsParams({ lat, lng, z });

      if (tripId) {
        params.t = tripId;
      }
      setSearchParams(params, { replace: true });
    }, 300),
    [tripId],
  );

  const removeTripIdQueryParam = () =>
    setSearchParams(
      {
        ...floorCoordsParams({
          lat: viewState.latitude,
          lng: viewState.longitude,
          z: viewState.zoom,
        }),
      },
      { replace: true },
    );

  const { data: trip } = useGetTripByIdQuery(tripId, {
    skip: !tripId,
  });

  useEffect(() => {
    if (trip && tripId) {
      addTripToNavigation(trip);
    }
  }, [tripId, trip]);

  const [deleteTripById] = useDeleteTripByIdQuery();
  const { data: geoData = [], fetchGeoJSON, initializeMapWithData } = useMapData();

  return (
    <>
      <MapHeader
        onClickMenu={toggleMenu}
        onClickSearch={toggleSearch}
        onClickNewRoute={() => {
          openNavigationPanel();
          closeMenu();
        }}
        onClickShare={() => {
          const link = `${window.location.href.split('?')[0]}?lng=${
            viewState.longitude
          }&lat=${viewState.latitude}&z=${viewState.zoom}`;
          navigator.clipboard.writeText(link);
        }}
      />

      {/* <MapFilter /> */}

      <Logo className={style.logo} targetBlank />

      <NavigationPanel
        {...navigationProps}
        tripId={tripId}
        onClickClose={() => {
          handleCloseNavPanel();
          removeTripIdQueryParam();
        }}
      />

      <SideBar
        withCloseButton
        isOpen={isMenuOpen}
        onClickClose={closeMenu}
        renderTop={<Logo targetBlank />}
      >
        <SideBarSelfNav
          onClickMyTrips={() => {
            openTrips();
            closeMenu();
          }}
          onClickNewRoute={() => {
            closeMenu();
            openNavigationPanel();
          }}
        />
        <SideBarNav targetBlank />
      </SideBar>

      <SideBar renderTop={<Search />} isOpen={isSearchOpen} onClickClose={closeSearch}>
        <SearchResults />
      </SideBar>

      <SideBar renderTop={<Search />} isOpen={isTripsOpen} onClickClose={closeTrips}>
        <MyTrips
          tripId={tripId}
          onClickTrip={(tripId) => {
            setSearchParams(
              {
                ...floorCoordsParams({
                  lat: viewState.latitude,
                  lng: viewState.longitude,
                  z: viewState.zoom,
                }),
                t: tripId,
              },
              { replace: true },
            );
            closeTrips();
          }}
          onClickDelete={(tripId) => {
            deleteTripById(tripId).then(removeTripIdQueryParam);
          }}
        />
      </SideBar>

      <Map
        data={geoData}
        initialize={initializeMapWithData}
        viewState={viewState}
        addToNavigation={addPointToNavigation}
        onMove={(evt) => {
          setViewState(evt.viewState);
          fetchGeoJSON(evt.target);
          setViewStateToQueryParams(evt.viewState);
        }}
      >
        {renderNavigation()}
      </Map>
    </>
  );
};
