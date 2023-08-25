import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout as LayoutAntd } from 'antd';
import style from './Layout.module.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useCurrentPage } from '../../hooks/useCurrentPage';
import { SideBar } from '../../components/SideBar/SideBar';
import { useOpenCloseToggle } from '../../hooks/useOpenCloseToggle';
import { SideBarNav } from '../../components/SideBar/SideBarNavigations/SideBarNav';
import { Auth } from '../../features/Auth/Auth';

const { Header: Head, Content, Footer: Foot } = LayoutAntd;

export const Layout: React.FC = () => {
  const { isMapPage, isTestPage } = useCurrentPage();

  const [isMenuOpen, , closeMenu, toggleMenu] = useOpenCloseToggle();
  const [isFormOpen, , closeForm, toggleForm] = useOpenCloseToggle(false);

  return (
    <LayoutAntd className={style.layout}>
      {!isMapPage && !isTestPage && (
        <Head className={style.header}>
          <Header toggleMenu={toggleMenu} onClickLogin={toggleForm} />
        </Head>
      )}
      <Content className={!isMapPage && !isTestPage ? style.content : style.fullheight}>
        <Outlet />
      </Content>

      {!isMapPage && !isTestPage && (
        <Foot className={style.footer}>
          <Footer />
        </Foot>
      )}
      <SideBar withCloseButton isOpen={isMenuOpen} onClickClose={closeMenu}>
        <SideBarNav onClickClose={closeMenu} />
      </SideBar>
      {/*{isFormOpen && <RegistrationForm onClose={closeForm} />}*/}
      {isFormOpen && <Auth onClose={closeForm} />}
    </LayoutAntd>
  );
};
