import React, { memo, useState } from 'react';
import { RouteItem } from '../../../types/map';
import style from './NavigationPanel.module.scss';
import { Button, Modal } from 'antd';
import {
  IconClock,
  IconClose,
  IconDown,
  IconGeo,
  IconRight,
  IconRoad,
} from '../../Icons';
import { DragList } from '../../DragDropList/DragList';
import { UserPosition } from './UserPosition/UserPosition';
import cn from 'classnames';
import { NavigationItemList } from './NavigationItem/NavigationItem';
import { getFormatNavigationInfo } from '../../../helpers/map';
import { useNavigationOrder } from './useNavigationOrder';
import { useOpenCloseToggle } from '../../../hooks/useOpenCloseToggle';
import { DeleteItem } from './DeleteItem/DeleteItem';
import {
  CreateTripRequestBody,
  useCreateTripQuery,
  useUpdateTripQuery,
} from '../../../services/trip';
import { useGetPoiListQuery } from '../../../services/poi';
import { Image } from '../../Image/Image';

export type NavigationInfo =
  | {
      distance: number;
      duration: number;
    }
  | undefined;

export type NavigationItem = {
  checked: boolean;
  item: RouteItem;
};

export type NavigationProps = {
  routes: NavigationItem[];
  setRoutes: React.Dispatch<React.SetStateAction<NavigationItem[]>>;
  onClickClose: () => void;
  navigationInfo?: NavigationInfo;
  userCoords: [number, number] | null;
  isCheckedUserPosition: boolean;
  setCheckedUserPosition: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  tripId: string;
};

export const NavigationPanel: React.FC<NavigationProps> = memo(
  ({
    isOpen,
    tripId,
    navigationInfo,
    routes,
    setRoutes,
    userCoords,
    isCheckedUserPosition,
    setCheckedUserPosition,
    onClickClose,
  }) => {
    const { km, hourMinutes } = getFormatNavigationInfo(navigationInfo);
    const getOrder = useNavigationOrder({ routes, isCheckedUserPosition });
    const checkedRoutes = routes.filter((r) => r.checked);
    const hasChecked = checkedRoutes.length > 0;
    const lastCheckedRoute = checkedRoutes[checkedRoutes.length - 1];

    const [isExpand, , , toggleExpand] = useOpenCloseToggle(true);
    const [deleteItem, setDelete] = useState<number | null>(null);

    const [isOpenSaveDialog, openSaveDialog, closeSaveDialog] = useOpenCloseToggle(false);

    const [createTrip, { isLoading }] = useCreateTripQuery();
    const [updateTrip] = useUpdateTripQuery();
    const { data: poiData = { items: [] } } = useGetPoiListQuery();

    return (
      <>
        <div
          className={cn(style.navigation, {
            [style.isActive]: isOpen,
            [style.isExpand]: !isExpand,
          })}
        >
          <div className={style.header}>
            <div className={style.expand} onClick={toggleExpand}>
              {!isExpand ? <IconRight /> : <IconDown />}

              <div>Маршрут</div>
            </div>

            <div className={style.info}>
              {routes.length > 0 && (
                <div className={style.infoItem}>
                  <IconGeo />
                  {routes.length}
                </div>
              )}

              {navigationInfo && (
                <>
                  <div className={style.infoItem}>
                    <IconClock />
                    {hourMinutes}
                  </div>

                  <div className={style.infoItem}>
                    <IconRoad />
                    {km}
                  </div>
                </>
              )}
            </div>

            <div className={style.close} onClick={onClickClose}>
              <IconClose />
            </div>
          </div>

          {isExpand && (
            <>
              {routes.length > 0 && (
                <div className={style.cover}>
                  {hasChecked && (
                    <>
                      <div className={style.text}>{lastCheckedRoute.item.data.name}</div>

                      <Image src={String(lastCheckedRoute.item.data.photo_link)} />
                    </>
                  )}
                </div>
              )}
              {userCoords && (
                <UserPosition
                  coords={userCoords}
                  isChecked={isCheckedUserPosition}
                  onChange={(checked) => setCheckedUserPosition(checked)}
                />
              )}
              <DragList
                items={routes}
                setItems={setRoutes}
                getDragId={(item) => item.item.coordinates.join('')}
                renderItem={(route, index, dragHandlers) => {
                  return (
                    <NavigationItemList
                      route={route}
                      onChange={(checked) => {
                        const newRoutes = [...routes];
                        newRoutes[index].checked = checked;

                        setRoutes(newRoutes);
                      }}
                      dragHandleProps={dragHandlers}
                      orderIndex={getOrder(index)}
                      onClick={() => setDelete(index)}
                    />
                  );
                }}
              />
              <div className={style.footer}>
                <Button
                  disabled={routes.length < 2}
                  className={style.button}
                  onClick={openSaveDialog}
                >
                  Сохранить
                </Button>
              </div>
            </>
          )}
        </div>
        {routes.length > 1 && (
          <Modal
            className={style.modal}
            centered
            title={`Сохранить маршрут ${routes[0].item.data.name}-${
              routes[routes.length - 1].item.data.name
            }?`}
            open={isOpenSaveDialog}
            onCancel={closeSaveDialog}
            footer={[
              <Button key="back" onClick={closeSaveDialog}>
                Отмена
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={isLoading}
                onClick={() => {
                  const tripBodyRequest: CreateTripRequestBody = {
                    name: `${routes[0].item.data.name} \u2013 ${
                      routes[routes.length - 1].item.data.name
                    }`,
                    spacing: '',
                    points: routes.map((r, index) => {
                      return {
                        arriveDate: '2023-06-27T07:43:55.876Z',
                        index,
                        visible: r.checked,
                        notes: '',
                        poiId: String(r.item.data.id || r.item.data.poi_id),
                        poiTypeId:
                          poiData.items.find(
                            (i) => i.nameEn === r.item.data.poi_type_name_en,
                          )?.id || '',
                      };
                    }),
                  };

                  if (tripId) {
                    updateTrip({ tripId, ...tripBodyRequest });
                  } else {
                    createTrip(tripBodyRequest);
                  }

                  closeSaveDialog();
                }}
              >
                Сохранить
              </Button>,
            ]}
          />
        )}

        {deleteItem !== null && (
          <DeleteItem
            onClickCancel={() => setDelete(null)}
            onClickDelete={() => {
              const newRoutes = routes.filter((r, index) => {
                return index !== deleteItem;
              });

              setRoutes(newRoutes);
            }}
          />
        )}
      </>
    );
  },
);

NavigationPanel.displayName = 'NavigationPanel';
