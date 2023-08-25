import * as React from 'react';
import style from './SideBarNavigations.module.scss';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../../constants/route';

type Props = {
  onClickClose?: () => void;
  targetBlank?: boolean;
};

export const SideBarNav: React.FC<Props> = ({ onClickClose, targetBlank = false }) => {
  return (
    <>
      <Link
        to={ROUTE.EXTRA}
        target={targetBlank ? '_blank' : undefined}
        className={style.link}
        onClick={onClickClose}
      >
        Уникальные места
      </Link>

      <a
        className={style.link}
        href="https://hotels.novitravel.ru/"
        onClick={onClickClose}
        target={targetBlank ? '_blank' : undefined}
        rel="noreferrer"
      >
        Забронировать отель
      </a>

      <Link
        to={ROUTE.STORIES}
        target={targetBlank ? '_blank' : undefined}
        className={style.link}
        onClick={onClickClose}
      >
        Тревел истории
      </Link>

      <Link
        to={ROUTE.ABOUT}
        target={targetBlank ? '_blank' : undefined}
        className={style.link}
        onClick={onClickClose}
      >
        О проекте
      </Link>

      <Link
        to="/login"
        target={targetBlank ? '_blank' : undefined}
        className={style.link}
        onClick={onClickClose}
      >
        Выйти
      </Link>
    </>
  );
};
