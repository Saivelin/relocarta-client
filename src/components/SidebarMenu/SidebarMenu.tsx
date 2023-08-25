import { SidebarMenuItem } from './SidebarMenuItem';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SidebarMenu = ({ data }: { data: SidebarMenuItem[] }) => {
  const navigate = useNavigate();
  const [currentTopLevel, setCurrentTopLevel] = useState<SidebarMenuItem | null>(data[0]);

  const onSelect = (item: SidebarMenuItem) => {
    if (!item?.elements) navigate(`/partner/${item.fieldName}`);
    setCurrentTopLevel(item.fieldName === currentTopLevel?.fieldName ? null : item);
  };

  return (
    <div className="flex flex-col">
      {data.map((item, idx) => {
        const items = [
          <SidebarMenuItem
            key={item.id}
            item={item}
            idx={idx}
            current={item.fieldName === currentTopLevel?.fieldName}
            onSelect={() => onSelect(item)}
          />,
        ];

        item?.elements?.forEach((i, index) => {
          items.push(
            <SidebarMenuItem
              submenu
              key={i.id}
              item={i}
              idx={index}
              visible={currentTopLevel?.fieldName === item.fieldName}
              onSelect={() => onSelect(i)}
            />,
          );
        });

        return items;
      })}
    </div>
  );
};
