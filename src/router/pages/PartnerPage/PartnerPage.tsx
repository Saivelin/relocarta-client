import { Outlet } from 'react-router-dom';
import { Button } from '../../../components/Button/Button';
import { SidebarMenu } from '../../../components/SidebarMenu/SidebarMenu';
import partnerMenu from '../../../data/partnerMenu.json';

interface Partner {
  name: string;
  image: string;
}

const data: Partner = {
  name: 'ОАО "Отели"',
  image: 'partner.png',
};

export const PartnerPage = () => {
  return (
    <div className="flex font-montserrat">
      <div className="w-[286px] min-h-screen shadow-sidebar flex flex-col">
        <div className="flex flex-col items-center gap-2.5 p-6 pb-5 border-bottom-gray">
          <img
            src={`/images/tmp/${data.image}`}
            alt="avatar"
            className="w-[100px] h-[100px]"
          />
          <span className="text-lg font-semibold">{data.name}</span>
        </div>
        <div className="px-6 py-5">
          <Button primary noBorder notRounded>
            Разместить объявление
          </Button>
        </div>
        <SidebarMenu data={partnerMenu} />
      </div>
      <div className="w-full p-6">
        <Outlet />
      </div>
    </div>
  );
};
