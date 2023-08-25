import cn from 'classnames';
import {
  AuditOutlined,
  DownOutlined,
  FileTextOutlined,
  MessageOutlined,
  TagsOutlined,
} from '@ant-design/icons';

export interface SidebarMenuItem {
  id: string | number;
  fieldName: string;
  displayName: string;
  number?: number | string;
  elements?: SidebarMenuItem[];
}

const icons = [
  // eslint-disable-next-line react/jsx-key
  <FileTextOutlined />,
  // eslint-disable-next-line react/jsx-key
  <MessageOutlined />,
  // eslint-disable-next-line react/jsx-key
  <TagsOutlined />,
  // eslint-disable-next-line react/jsx-key
  <AuditOutlined />,
];

interface MenuProps {
  item: SidebarMenuItem;
  idx: number;
  onSelect: () => void;
  submenu?: boolean;
  visible?: boolean;
  current?: boolean;
}

export const SidebarMenuItem = ({
  item,
  idx,
  onSelect,
  submenu,
  visible,
  current,
}: MenuProps) => {
  return (
    <div
      className={cn(
        'px-6 py-3 flex justify-between items-center cursor-pointer hover:bg-primary-light border-right-primary hover:text-primary transition-all duration-300',
        {
          ['invisible hidden']: submenu && !visible,
          ['visible block']: !submenu,
          ['bg-gray-100 py-4']: submenu,
          ['text-primary']: current,
        },
      )}
      onClick={onSelect}
    >
      <div className="flex items-center">
        {!submenu && <div className="text-lg">{icons[idx]}</div>}
        <span
          className={cn('ml-2.5', {
            ['ml-[28px]']: submenu,
          })}
        >
          {item.displayName}
          {item?.number && <span className="ml-1 text-gray-400">{item.number}</span>}
        </span>
      </div>

      {item?.elements && (
        <DownOutlined
          className={cn('text-[12px] text-black', {
            ['rotate-180']: current,
          })}
        />
      )}
    </div>
  );
};
