import * as React from 'react';
import style from './SideBarNavigations.module.scss';
import { IconComment, IconGeo, IconPlus, IconStar, IconUser } from '../../Icons';

type Props = {
  onClickNewRoute?: () => void;
  onClickMyTrips: () => void;
};

export const SideBarSelfNav: React.FC<Props> = ({
  onClickNewRoute = () => null,
  onClickMyTrips,
}) => {
  return (
    <div className={style.menu}>
      <div className={style.green} onClick={onClickNewRoute}>
        <IconPlus className={style.icon} />
        Новый маршрут
      </div>

      <div className={style.linkBig}>
        <IconUser className={style.icon} />
        Профиль
      </div>

      <div className={style.linkBig} onClick={onClickMyTrips}>
        <IconGeo className={style.icon} />
        Мои маршруты
      </div>

      <div className={style.linkBig}>
        <IconStar className={style.icon} />
        Избранные места
      </div>

      <div className={style.linkBig}>
        <IconComment className={style.icon} />
        Мои отзывы
      </div>
    </div>
  );
};
