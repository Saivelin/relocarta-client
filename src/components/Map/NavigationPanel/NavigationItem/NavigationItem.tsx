import React from 'react';
import style from './NavigationItem.module.scss';
import { Switch, SwitchProps } from 'antd';
import { NavigationItem as NavigationItemType } from '../NavigationPanel';
import { DraggableProvided } from 'react-beautiful-dnd';
import { getIconLink } from '../../../../helpers/map';
import { Image } from '../../../Image/Image';

type Props = {
  route: NavigationItemType;
  orderIndex: number | undefined;
  onChange: SwitchProps['onChange'];
  dragHandleProps: DraggableProvided['dragHandleProps'];
  onClick: () => void;
};

export const NavigationItemList: React.FC<Props> = ({
  route,
  orderIndex,
  dragHandleProps,
  onChange,
  onClick,
}) => {
  const where = !route.item.data.city_name
    ? `${route.item.data.region_name}`
    : route.item.data.city_name === route.item.data.region_name
    ? route.item.data.region_name
    : `${route.item.data.city_name}, ${route.item.data.region_name}`;

  const iconImg = !route.item.data.icon_link
    ? '/images/plug-popup.png'
    : String(route.item.data.icon_link || route.item.data.photo_link);

  return (
    <div className={style.item}>
      <div>
        <Image
          className={style.img}
          src={String(route.item.data.icon_link || route.item.data.photo_link)}
        />
      </div>
      <div>
        <div className={style.name}>{route.item.data.name}</div>

        <div className={style.description}>{where}</div>
      </div>

      <div className={style.switch}>
        <Switch
          checked={route.checked}
          checkedChildren={orderIndex}
          onChange={onChange}
        />
      </div>
      <div className={style.dropButtonWrap} {...dragHandleProps} onClick={onClick}>
        <div className={style.dropButton}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
