import cn from 'classnames';

export const enum TabsEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  COMPANY = 'company',
  SECURITY = 'security',
}

export interface Tab {
  name: string;
  value: TabsEnum;
  number?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: Tab;
  onChange: (value: Tab) => void;
  className?: string;
}

export const Tabs = ({ tabs, activeTab, onChange, className }: TabsProps) => {
  return (
    <div className={cn('flex gap-8 text-base border-bottom-gray', className)}>
      {tabs.map((tab: Tab) => (
        <div
          key={tab.value}
          className="flex items-center gap-1 pb-3 cursor-pointer"
          onClick={() => onChange(tab)}
        >
          <span
            className={cn({
              ['text-primary']: activeTab.value === tab.value,
            })}
          >
            {tab.name}
          </span>
          {tab?.number && (
            <div
              className={cn('text-xs rounded-full px-2 bg-gray-200', {
                ['text-gray-500']: activeTab.value !== tab.value,
                ['text-primary bg-primary-light']: activeTab.value === tab.value,
              })}
            >
              {tab.number}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};