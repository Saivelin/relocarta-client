import React from 'react';
import style from './Footer.module.scss';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import { ROUTE } from '../../constants/route';

const Footer: React.FC = () => {
  return (
    <>
      <div className={style.container}>
        <div className={style.footer__desktop}>
          <div className={style.top}>
            <nav className={style.menu}>
              <div className={style.burger_logo}>
                <Logo white />
              </div>

              <ul className={style.top__list}>
                <li className={style.top__item}>
                  <Link to={`/map`}>
                    <span className={style.top__text}>Карта</span>
                  </Link>
                </li>

                <li className={style.top__item}>
                  <Link to={ROUTE.EXTRA}>
                    <span className={style.top__text}>Уникальные места</span>
                  </Link>
                </li>

                <li className={style.top__item}>
                  <a href="https://hotels.novitravel.ru/">
                    <span className={style.top__text}>Забронировать отель</span>
                  </a>
                </li>

                <li className={style.top__item}>
                  <Link to={ROUTE.STORIES}>
                    <span className={style.top__text}>Тревел истории</span>
                  </Link>
                </li>

                <li className={style.top__item}>
                  <Link to={ROUTE.ABOUT}>
                    <span className={style.top__text}>О проекте</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className={style.bottom}>
            <nav className={style.menu}>
              <ul className={style.bottom__list}>
                <li className={style.bottom__item}>
                  <span className={style.bottom__text}>Контакты</span>
                </li>

                <li className={style.bottom__item}>
                  <span className={style.bottom__text}>Помощь</span>
                </li>

                <li className={style.bottom__item}>
                  <span className={style.bottom__text}>Пользовательское соглашение</span>
                </li>
              </ul>
            </nav>
            <div className={style.social}>
              <div className={style.copyright}>Ⓒ ООО “Новитревел”, 2023</div>
              <div className={style.socials__items}>
                <div className={style.socials__item}>
                  <a
                    href="https://ru.wikipedia.org/wiki/Telegram"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <img src={'/icons/telegram.svg'} alt="telegram" />
                  </a>
                </div>
                <div className={style.socials__item}>
                  <a
                    href="https://ru.wikipedia.org/wiki/Vkontakte"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <img src={'/icons/vk.svg'} alt="vk" />
                  </a>
                </div>
                <div className={style.socials__item}>
                  <a
                    href="https://ru.wikipedia.org/wiki/Youtube"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <img src={'/icons/youtube.svg'} alt="youtube" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
