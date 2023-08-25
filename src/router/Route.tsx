import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { MainPage } from './pages/Main/MainPage';
import { NotFoundPage } from './pages/404/NotFoundPage';
import { PlacePage } from './pages/PlacePage/PlacePage';
import ExtraordinaryPage from './pages/ExtraordinaryPage/ExtraordinaryPage';
import AboutProject from './pages/AboutProjectPage/AboutProject';
import TravelStoriesPage from './pages/TravelStoriesPage/TravelStoriesPage';
import MapPage from './pages/MapPage/MapPage';
import Story from './pages/TravelStoriesPage/Story/Story';
import { TestMapPage } from './pages/TestMapPage/TestMapPage';
import { ROUTE } from '../constants/route';
import { PartnerPage } from './pages/PartnerPage/PartnerPage';
import { Items } from './pages/PartnerPage/Items/Items';
import { Account } from './pages/PartnerPage/Account/Account';
import { ModeratorPage } from "./pages/ModeratorPage/ModeratorPage";
import { ModeratorOutlet } from "./pages/ModeratorPage/ModeratorOutlet";
import { AttractionList } from "./pages/ModeratorPage/Attraction/AttractionList/AttractionList";
import { AttractionCard } from "./pages/ModeratorPage/Attraction/AttractionCard/AttractionCard";
import { CARD_TYPE } from "./pages/ModeratorPage/enum/cardType";
import { RequestList } from "./pages/ModeratorPage/Request/RequestList";
import { CONTENT_TYPE } from "./pages/ModeratorPage/enum/contentType";
import { RequestCard } from "./pages/ModeratorPage/Request/RequestCard";
import { RequestEditCard } from "./pages/ModeratorPage/Request/RequestEditCard";
import { Empty } from "./pages/ModeratorPage/Empty";

export const RenderRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path={ROUTE.STORIES} element={<TravelStoriesPage />}>
          <Route index element={<Story />} />
          <Route path=":id" element={<Story />} />
        </Route>
        <Route path="map" element={<MapPage />} />
        <Route path="test" element={<TestMapPage />} />
        <Route path={ROUTE.EXTRA} element={<ExtraordinaryPage />} />
        <Route
          path="reserve"
          element={() => {
            return null;
          }}
        />
        <Route path="places/:region/:type/:id" element={<PlacePage />} />
        <Route path={ROUTE.ABOUT} element={<AboutProject />} />
        <Route path="moderator" element={<ModeratorPage />}>
          <Route path="content" element={<ModeratorOutlet />}>
            <Route path="attraction" element={<AttractionList />} />
            <Route
              path="attraction/:id"
              element={<AttractionCard type={CARD_TYPE.VIEW} />}
            />
            <Route
              path="attraction/create"
              element={<AttractionCard type={CARD_TYPE.CREATE} />}
            />
            <Route
              path="attraction/:id/edit"
              element={<AttractionCard type={CARD_TYPE.EDIT} />}
            />
          </Route>
          <Route path="request" element={<ModeratorOutlet />}>
            <Route
              path="change"
              element={<RequestList content={CONTENT_TYPE.CHANGE} />}
            />
            <Route
              path="change/:id"
              element={
                <RequestCard content={CONTENT_TYPE.CHANGE} type={CARD_TYPE.VIEW} />
              }
            />
            <Route
              path="change/:id/edit"
              element={
                <RequestEditCard content={CONTENT_TYPE.CHANGE} type={CARD_TYPE.EDIT} />
              }
            />
            <Route
              path="change/create"
              element={
                <RequestEditCard content={CONTENT_TYPE.CHANGE} type={CARD_TYPE.CREATE} />
              }
            />
            <Route
              path="map-point"
              element={<RequestList content={CONTENT_TYPE.MAP_POINT} />}
            />
            <Route
              path="map-point/:id"
              element={
                <RequestCard content={CONTENT_TYPE.MAP_POINT} type={CARD_TYPE.VIEW} />
              }
            />
            <Route
              path="map-point/:id/edit"
              element={
                <RequestEditCard content={CONTENT_TYPE.MAP_POINT} type={CARD_TYPE.EDIT} />
              }
            />
            <Route
              path="map-point/create"
              element={
                <RequestEditCard
                  content={CONTENT_TYPE.MAP_POINT}
                  type={CARD_TYPE.CREATE}
                />
              }
            />
          </Route>
          <Route path="*" element={<Empty />} />
        </Route>
        <Route path="partner" element={<PartnerPage />}>
          <Route index element={<Items />} />
          <Route path="items" element={<Items />} />
          <Route path="account" element={<Account />} />
          <Route path="*" element={<Empty />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
