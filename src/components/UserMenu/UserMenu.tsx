import { AiOutlineSetting } from 'react-icons/ai';
import { BsBriefcase, BsGlobeAmericas } from 'react-icons/bs';
import { MdOutlineLogout } from 'react-icons/md';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { RightOutlined } from '@ant-design/icons';
import cn from 'classnames';

interface MenuProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  logout: () => void;
}

export const UserMenu = ({ logout, className }: MenuProps) => {
  return (
    <div
      className={cn(
        'absolute top-[45px] right-0 mt-7 py-6 w-[320px] bg-white rounded-lg shadow-lg flex flex-col gap-4 font-montserrat transition-all duration-300',
        className,
      )}
    >
      <div className="flex flex-col">
        <span className="text-lg font-semibold px-6">ОАО "Отели"</span>
        <div className="flex items-center gap-2 hover:bg-primary-light hover:text-primary px-6 py-2 mt-3">
          <AiOutlineSetting />
          <div className="text-sm">Настройки профиля</div>
        </div>
      </div>

      <div className="flex flex-col text-sm">
        <span className="text-gray-400 px-6 py-2">Мои компании</span>
        <div className="flex items-center gap-2 hover:bg-primary-light hover:text-primary px-6 py-2">
          <BsBriefcase />
          <span>ОАО "Отели"</span>
        </div>
        <div className="flex items-center gap-2 hover:bg-primary-light hover:text-primary px-6 py-2">
          <BsBriefcase />
          <span>ОАО "Ресторан"</span>
        </div>
      </div>

      <div className="flex flex-col text-sm">
        <span className="text-gray-400 px-6 py-2">Профиль</span>
        <div className="flex items-center gap-2 hover:bg-primary-light hover:text-primary px-6 py-2">
          <BsBriefcase />
          <span>Виктор М.</span>
        </div>
      </div>

      <div className="border-bottom-gray" />

      <div className="text-sm">
        <div className="flex justify-between items-center hover:bg-primary-light hover:text-primary px-6 py-2">
          <div className="flex items-center gap-2">
            <BsGlobeAmericas />
            <span>Новитревел</span>
          </div>
          <RightOutlined className="text-xs mt-px" />
        </div>
        <div
          className="flex items-center gap-2 hover:bg-primary-light hover:text-primary px-6 py-2"
          onClick={logout}
        >
          <MdOutlineLogout />
          <span>Выйти из профиля</span>
        </div>
      </div>
    </div>
  );
};
