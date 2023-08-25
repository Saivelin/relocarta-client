import {
  QuestionCircleOutlined,
  EditOutlined,
  MailOutlined,
  UnorderedListOutlined,
  HomeOutlined,
  FolderOpenOutlined,
  TagsOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { FiUsers } from 'react-icons/fi';
import moderatorMenu from '../data/moderatorMenu.json';
import { getMenuItem, MenuItem } from '../helpers/getMenuItem';
import { ReactNode } from 'react';

export interface ModeratorMenuItem {
  fieldName: string;
  displayName: string;
  count?: number;
  elements?: ModeratorMenuItem[];
}

export const useModeratorMenu = () => {
  const icons: ReactNode[] = [
    <QuestionCircleOutlined />,
    <EditOutlined />,
    <ExclamationCircleOutlined />,
    <MailOutlined />,
    <HomeOutlined />,
    <UnorderedListOutlined />,
    <FolderOpenOutlined />,
    <TagsOutlined />,
    <FiUsers />,
  ];
  const rootSubmenuKeys: string[] = [];
  let iconCounter = 0;

  const getFieldName = (displayName: string, count?: number): string => {
    return count ? `${displayName}  ${count}` : displayName;
  };

  const items: MenuItem[] = moderatorMenu.map(
    (item: ModeratorMenuItem | any): MenuItem => {
      rootSubmenuKeys.push(item.fieldName);

      return getMenuItem(
        getFieldName(item.displayName, item.count),
        item.fieldName,
        icons[iconCounter++],
        item.elements?.map((element: ModeratorMenuItem) => {
          return getMenuItem(
            getFieldName(element.displayName, element.count),
            element.fieldName,
          );
        }),
      );
    },
  );

  return { items, rootSubmenuKeys, firstItemKey: moderatorMenu[0].fieldName };
};
