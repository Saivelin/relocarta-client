import { Outlet, useNavigate } from 'react-router-dom';
import { Menu, MenuProps } from 'antd';
import styles from './ModeratorPage.module.scss';

import { useState } from 'react';
import { useModeratorMenu } from '../../../hooks/useModeratorMenu';
import { MenuItem } from '../../../helpers/getMenuItem';

export const ModeratorPage = () => {
  const { items, rootSubmenuKeys, firstItemKey } = useModeratorMenu();
  const [openKeys, setOpenKeys] = useState([firstItemKey]);
  const navigate = useNavigate();

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const selectMenu = (item: MenuItem) => {
    navigate(`/moderator/${openKeys[0]}/${item?.key}`);
  };

  return (
    <div className="flex min-h-screen">
      <div className={styles.sidebar}>
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{ border: 'none' }}
          items={items}
          onSelect={(item) => selectMenu(item)}
        />
      </div>
      <div className="w-full p-6">
        <Outlet />
      </div>
    </div>
  );
};
