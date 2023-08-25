import { ListItem } from '../ListItem';
import {
  CheckCircleFilled,
  EyeOutlined,
  FieldTimeOutlined,
  QuestionCircleFilled,
  StarOutlined,
  StarFilled,
} from '@ant-design/icons';
import { Button } from '../../../../components/Button/Button';
import { Input } from 'antd';
import { useState } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { numStr } from '../../../../helpers/numStr';

const { TextArea } = Input;

const options: string[] = [
  'Частное лицо',
  'Самозанятый',
  'Индивидуальный предприниматель',
  'Юридическое лицо',
];

export interface Company {
  id: string | number;
  name: string;
  form_name: string;
  date_created: Date | string;
  description: string;
  partner_verified: boolean;
  email_verified: boolean;
  period: number;
  rate_avr: number;
  rates_count: number;
  views_count: number;
}

interface CompanyProps {
  data: Company;
}

export const Company = ({ data }: CompanyProps) => {
  const [verified, setVerified] = useState(data.partner_verified);

  const [name, setName] = useState(data.name);
  const [form, setForm] = useState(data.form_name);

  return (
    <div className="grid grid-cols-[1fr_256px] gap-6">
      <div className="mt-6">
        <div className="flex flex-col gap-0.5">
          <ListItem
            first
            input
            name="Название компании/бренда"
            value={name}
            saveValue={setName}
          />
          <ListItem
            name="Форма деятельности"
            select
            options={options}
            value={form}
            saveValue={setForm}
          />
          <ListItem
            last
            name="Дата создания профиля"
            value={format(new Date(data.date_created), 'PPP', { locale: ru })}
          />
        </div>

        <div className="pt-5">
          <span className="text-gray-500 text-base">Описание компании</span>
          <TextArea
            rows={4}
            className="mt-2 leading-6 p-4"
            defaultValue={data.description}
          />
          <div className="flex gap-3 justify-end pt-3">
            <Button primary noBorder notRounded className="max-h-7">
              Сохранить
            </Button>
            <Button clearGray className="max-h-7">
              Отмена
            </Button>
          </div>
        </div>

        <div className="pt-9 border-bottom-gray" />

        <div className="pt-9">
          <h4 className="text-xl">Данные компании</h4>

          <div className="flex justify-between items-center mt-[44px] text-base text-gray-500 flex-wrap gap-9">
            <div className="flex items-center gap-2">
              <span>ИП / Юридическое лицо</span>
              <QuestionCircleFilled className="text-xl mt-1.5" />
            </div>
            {!verified && (
              <div className="flex items-center gap-6">
                <span>Проверка не пройдена</span>
                <Button
                  primary
                  noBorder
                  notRounded
                  className="max-h-7 p-2"
                  onClick={() => setVerified(true)}
                >
                  Пройти проверку
                </Button>
              </div>
            )}
            {verified && (
              <div className="flex items-center gap-2">
                <span>Документы проверены</span>
                <CheckCircleFilled className="text-xl mt-1.5 text-accent" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-6">
        <div className="flex flex-col gap-4 bg-gray-200 rounded-lg p-6 relative overflow-hidden">
          <span className="text-accent font-bold z-10">Время с Новитревел</span>
          <span className="text-gray-700 z-10">1 год, 5 месяцев</span>
          <FieldTimeOutlined className="absolute top-0 -right-2 flex items-center h-full text-[85px] text-gray-300" />
        </div>
        <div className="flex flex-col gap-4 bg-gray-200 rounded-lg p-6 relative overflow-hidden">
          <span className="text-accent font-bold z-10">Количество просмотров</span>
          <span className="text-gray-700 z-10">{data.views_count}</span>
          <EyeOutlined className="absolute top-0 -right-2 flex items-center h-full text-[85px] text-gray-300" />
        </div>
        <div className="flex flex-col gap-4 bg-gray-200 rounded-lg p-6 relative overflow-hidden">
          <span className="text-accent font-bold z-10">Рейтинг услуг</span>
          <div className="text-gray-700 flex items-center gap-1.5 z-10">
            <span className="text-[18px] font-semibold">{data.rate_avr}</span>
            <StarFilled className="text-yellow-500" />
            <div className="text-[18px] text-gray-400">
              {data.rates_count}{' '}
              <span>{numStr(data.rates_count, ['Отзыв', 'Отзыва', 'Отзывов'])}</span>
            </div>
            <StarOutlined className="absolute top-0 -right-2 flex items-center h-full text-[85px] text-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
};
