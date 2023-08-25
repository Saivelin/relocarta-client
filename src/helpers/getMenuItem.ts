import { Key, ReactNode } from 'react';
import { MenuProps } from 'antd';

export type MenuItem = Required<MenuProps>['items'][number];

export function getMenuItem(
  label: ReactNode,
  key: Key,
  icon?: ReactNode,
  children?: MenuItem[],
  type?: 'group',
  count?: number,
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    count,
  } as MenuItem;
}
