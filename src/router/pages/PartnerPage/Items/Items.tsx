import { useEffect, useState } from 'react';
import adsData from '../../../../data/ads.json';
import { Image } from 'antd';
import { EnvironmentOutlined, EyeFilled } from '@ant-design/icons';
import { ImHeart } from 'react-icons/im';
import { HiUsers } from 'react-icons/hi2';
import { Tab, Tabs, TabsEnum } from '../Tabs';

interface Items {
  id: string | number;
  name: string;
  price: number;
  desc: string;
  image: string;
  location: string;
  likes: number;
  views: number;
  users: number;
}

const tabs: Tab[] = [
  {
    name: 'Активные',
    value: TabsEnum.ACTIVE,
    number: adsData.active.length,
  },
  {
    name: 'Неактивные',
    value: TabsEnum.INACTIVE,
    number: adsData.inactive.length,
  },
];

export const Items = () => {
  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);
  const [ads, setAds] = useState<Items[]>(adsData.active);

  useEffect(() => {
    setAds(activeTab.value === TabsEnum.ACTIVE ? adsData.active : adsData.inactive);
  }, [activeTab]);

  return (
    <div>
      <div>
        <h3 className="text-[28px]">Рекомендации</h3>

        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="bg-[url('/images/mini-card/mini-card-orange.png')] bg-cover h-[200px] p-6 rounded-lg relative flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-xl text-white font-bold">Подтвердите профиль</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.66699 14.5L12.667 8L5.66699 1.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
            </div>

            <span className="text-sm text-white leading-5">
              Вы получите полный пакет возможностей вашего личного кабинета.
            </span>

            <img
              src="/images/mini-card/orange-card-check.png"
              alt=""
              className="absolute bottom-0 right-0 h-[138px]"
            />
          </div>
          <div className="bg-[url('/images/mini-card/mini-card-blue.png')] bg-cover h-[200px] p-6 rounded-lg cover"></div>
          <div className="bg-[url('/images/mini-card/mini-card-blue.png')] bg-cover h-[200px] p-6 rounded-lg"></div>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-[28px]">Мои объявления</h3>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mt-9" />

      <div className="flex flex-col mt-[15px]">
        {ads.map((ad) => (
          <div key={ad.id} className="grid grid-cols-[300px_auto_1fr_1fr] gap-6 py-6">
            <div className="w-[300px] h-[220] rounded-lg overflow-hidden">
              <Image src={`/images/tmp/${ad.image}`} />
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-accent font-bold text-xl">{ad.name}</div>
              <div className="font-bold text-xl">{ad.price} ₽</div>
              <div className="text-base text-gray-400 leading-6 line-clamp-3">
                {ad.desc}
              </div>
              <div className="flex items-center gap-2 text-base text-gray-400">
                <EnvironmentOutlined />
                {ad.location}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <ImHeart className="text-red-500" />
                {ad.likes}
              </div>
              <div className="flex gap-2">
                <EyeFilled />
                {ad.views}
              </div>
              <div className="flex gap-2">
                <HiUsers />
                {ad.users}
              </div>
            </div>
            <div className="flex justify-center items-center ml-10 w-10 h-10 shadow border-gray cursor-pointer">
              <span className="-mt-2 font-semibold tracking-wider">...</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
