import React from 'react';
import style from './MapFilter.module.scss';
import { IconRight } from '../../Icons';

export const MapFilter: React.FC = () => {
  return (
    <div className={style.filter}>
      <div className={style.row}>
        <div className={style.imgWrap}>
          <img src="/icons/icon_album/01_raw/2023-05-29_21-09-08.png" alt="" />
        </div>

        <div className={style.imgWrap}>
          <img src="/icons/icon_album/01_raw/Hotels.png" alt="" />
        </div>

        <div className={style.imgWrap}>
          <img src="/icons/icon_album/01_raw/turusluga.jpg" alt="" />
        </div>

        <div className={style.imgWrap}>
          <img src="/icons/icon_album/01_raw/2023-05-29_22-03-27.png" alt="" />
        </div>
        <div className={style.imgWrap}>
          <img src="/icons/icon_album/01_raw/kayak (1).png" alt="" />
        </div>

        <div className={style.imgWrap}>
          <img src="/icons/icon_album/01_raw/menu.jpg" alt="" />
        </div>

        <div className={style.right}>
          <IconRight />
        </div>
      </div>
      <div className={style.popup__like}>
        <div className={style.like__image}>
          <img src={'/icons/redlike.svg'} alt="like" />
        </div>
      </div>
    </div>
  );
};
