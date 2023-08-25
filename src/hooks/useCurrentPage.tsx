import { useLocation } from 'react-router-dom';

export const useCurrentPage = () => {
  const location = useLocation();
  const route = location.pathname.split('/')[1];

  return { isMapPage: route === 'map', isTestPage: route === 'test' };
};
