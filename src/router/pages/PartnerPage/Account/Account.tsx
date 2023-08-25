import { Tab, Tabs, TabsEnum } from '../Tabs';
import { useState } from 'react';
import { Company } from './Company';
import { Security } from './Security';
import partner from '../../../../data/partner.json';

const tabs: Tab[] = [
  {
    name: 'Компания',
    value: TabsEnum.COMPANY,
  },
  {
    name: 'Защита профиля',
    value: TabsEnum.SECURITY,
  },
];

export const Account = () => {
  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);

  return (
    <div>
      <h3 className="text-[28px]">Настройка профиля</h3>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mt-9" />

      {activeTab.value === TabsEnum.COMPANY && <Company data={partner.company} />}
      {activeTab.value === TabsEnum.SECURITY && <Security data={partner.security} />}
    </div>
  );
};
