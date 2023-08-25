import { useState, useEffect, useCallback, useMemo } from 'react';
import { GeolocateControl, Marker } from 'react-map-gl';
import { RouteItem } from '../types/map';
import { useLocation } from 'react-router-dom';
import { useGetDirectionsQuery } from '../services/mapbox';
import { useOpenCloseToggle } from './useOpenCloseToggle';
import {
  NavigationInfo,
  NavigationProps,
} from '../components/Map/NavigationPanel/NavigationPanel';
import { Directions } from '../components/Map/Directions/Directions';
import { Trip } from '../services/trip';

export const useMapNavigation = () => {
  const location = useLocation();
  const route = location.state ? location.state.route : null;
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);
  const [isCheckedUserPosition, setCheckedUserPosition] = useState(false);
  const [isRouteOpen, openNavigationPanel, closeRoute] = useOpenCloseToggle(
    route ? true : false,
  );

  const [navigationList, setNavigationList] = useState<
    {
      checked: boolean;
      item: RouteItem;
    }[]
  >(route ? [{ item: route, checked: true }] : []);

  const checkedNavigationList = navigationList.filter((item) => item.checked);
  const checkedCoords = checkedNavigationList.map((route) => route.item.coordinates);
  const checkedCoordsWithUserPosition =
    isCheckedUserPosition && userCoords ? [userCoords, ...checkedCoords] : checkedCoords;

  const coordStr = checkedCoordsWithUserPosition.map((d) => d.join(',')).join(';');
  const { data, isFetching } = useGetDirectionsQuery(
    { coords: coordStr },
    { skip: checkedCoordsWithUserPosition.length < 2 },
  );

  useEffect(() => {
    if (checkedCoordsWithUserPosition.length < 2 || isFetching) {
      hideNavigation();
    }
    if (checkedCoordsWithUserPosition.length >= 2 && !isFetching) {
      showNavigation();
    }
  }, [checkedCoordsWithUserPosition.length, isFetching]);

  const [isNavigated, showNavigation, hideNavigation] = useOpenCloseToggle(true);

  const navigationInfo: NavigationInfo = useMemo(
    () =>
      isNavigated && data
        ? { distance: data.routes[0].distance, duration: data?.routes[0].duration }
        : undefined,
    [data, isNavigated],
  );
  const reset = () => {
    hideNavigation();
    setNavigationList([]);
  };

  const handleCloseNavPanel = useCallback(() => {
    closeRoute();
    reset();
  }, []);

  const navigationProps = {
    isOpen: isRouteOpen,
    userCoords: userCoords,
    isCheckedUserPosition: isCheckedUserPosition,
    setCheckedUserPosition: setCheckedUserPosition,
    routes: navigationList,
    setRoutes: setNavigationList,
    navigationInfo: navigationInfo,
  };

  const addPointToNavigation = (route: RouteItem) => {
    setNavigationList([...navigationList, { item: route, checked: true }]);

    openNavigationPanel();
  };

  const addTripToNavigation = (trip: Trip) => {
    const routeItems: { item: RouteItem; checked: boolean }[] = trip.geojson.features.map(
      (f) => ({
        item: { data: f.properties, coordinates: f.geometry.coordinates },
        checked: f.properties.visible,
      }),
    );
    setNavigationList(routeItems);

    openNavigationPanel();
  };

  const renderNavigation = () => {
    return (
      <>
        {isNavigated && <Directions data={data} />}

        {checkedCoordsWithUserPosition.map((coords, index) => (
          <Marker
            offset={[0, 5]}
            key={index}
            longitude={coords[0]}
            latitude={coords[1]}
            anchor="bottom"
          ></Marker>
        ))}

        <GeolocateControl
          showUserLocation
          trackUserLocation={false}
          showUserHeading={false}
          onGeolocate={(e) => {
            const { longitude, latitude } = e.coords;
            const coordinates = [longitude, latitude] as [number, number];

            setUserCoords(coordinates);
          }}
        />
      </>
    );
  };

  return {
    navigationProps,
    handleCloseNavPanel,
    addTripToNavigation,
    renderNavigation,
    addPointToNavigation,
    openNavigationPanel,
  };
};
