import * as React from 'react';
import { Typography } from 'antd';
import style from './Header.module.scss';
import CustomNavLink from '../CustomLink/CustomLink';
import { Logo } from '../Logo/Logo';
import { Menu } from '../Menu/Menu';
import { Button } from '../Button/Button';
import { IconGlobe, IconUser } from '../Icons';
import { ROUTE } from '../../constants/route';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { MessageOutlined } from '@ant-design/icons';
import { UserMenu } from '../UserMenu/UserMenu';

const { Text } = Typography;

type Props = {
  toggleMenu: () => void;
  onClickLogin: () => void;
};

const Header: React.FC<Props> = ({ toggleMenu, onClickLogin }) => {
  const navigate = useNavigate();
  const [hasNewNotifications, setHasNewNotifications] = useState(true);
  const [hasNewMessages, setHasNewMessages] = useState(true);

  const isAuth = !!localStorage.getItem('is-auth');

  return (
    <>
      <div className={style.menu}>
        <div className={style.burger_logo}>
          <Menu onClick={toggleMenu} className="hide" />

          <Logo />
        </div>

        <div className={style.menu__list}>
          <div className={style.menu__item}>
            <CustomNavLink to={`/map`}>
              <IconGlobe className={style.icon} />
              <Text className={style.menu__text}>Карта</Text>
            </CustomNavLink>
          </div>

          <div className={style.menu__item}>
            <CustomNavLink to={ROUTE.EXTRA}>
              <Text className={style.menu__text}>Уникальные места</Text>
            </CustomNavLink>
          </div>

          <div className={style.menu__item}>
            <a style={{ padding: '4px 12px' }} href="https://hotels.novitravel.ru/">
              Забронировать отель
            </a>
          </div>

          <div className={style.menu__item}>
            <CustomNavLink to={ROUTE.STORIES}>
              <Text className={style.menu__text}>Тревел истории</Text>
            </CustomNavLink>
          </div>

          <div className={style.menu__item}>
            <CustomNavLink to={ROUTE.ABOUT}>
              <Text className={style.menu__text}>О проекте</Text>
            </CustomNavLink>
          </div>
        </div>

        {isAuth && (
          <div className="flex flex-row flex-nowrap gap-6 items-center">
            <div className="flex cursor-pointer relative">
              <IoMdNotificationsOutline className="text-2xl" />
              {hasNewNotifications && (
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 absolute bottom-[3px] right-[3px]" />
              )}
            </div>
            <div className="flex cursor-pointer relative">
              <MessageOutlined className="text-lg mt-1.5" />
              {hasNewMessages && (
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 absolute bottom-[8px] right-[0px]" />
              )}
            </div>
            <div className="flex items-center gap-2 cursor-pointer relative group">
              <span className="hover:text-primary">Виктор М.</span>
              <img
                src="/images/tmp/avatar.png"
                alt="Виктор М."
                className="block w-8 h-8 rounded-lg"
              />

              <UserMenu
                className="invisible group-hover:visible"
                logout={() => {
                  localStorage.setItem('is-auth', '');
                  navigate('/');
                }}
              />
            </div>
          </div>
        )}

        {!isAuth && (
          <div className={style.menu__item_login}>
            <Button shape="round" icon={<IconUser />} onClick={onClickLogin}>
              Войти
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
