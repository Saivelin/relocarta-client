import { memo, FC } from 'react';
import style from './MapHeader.module.scss';
import { Menu } from '../../Menu/Menu';
import { IconPlus, IconSearch, IconShare } from '../../Icons';
import { Button } from 'antd';

type Props = {
  onClickMenu: () => void;
  onClickSearch: () => void;
  onClickNewRoute: () => void;
  onClickShare: () => void;
};

export const MapHeader: FC<Props> = memo(
  ({ onClickMenu, onClickSearch, onClickNewRoute, onClickShare }) => {
    return (
      <div className={style.header}>
        <Menu onClick={onClickMenu} />

        <div className={style.search} onClick={onClickSearch}>
          <IconSearch size={20} fill="#6DC682" />
        </div>

        <Button
          onClick={onClickNewRoute}
          type="primary"
          className={style.button}
          icon={<IconPlus />}
        >
          Новый маршрут
        </Button>

        <div
          className={style.share}
          onClick={onClickShare}
          title="Скопировать URL местоположения"
        >
          <IconShare size={14} />
        </div>

        <div className={style.login}>
          <div className={style.link}>Войти</div>
        </div>
      </div>
    );
  },
  () => true,
);

MapHeader.displayName = 'MapHeader';
