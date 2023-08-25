import * as React from 'react';
import style from './Search.module.scss';
import { IconSearch } from '../../Icons';
import { Input } from 'antd';

type Props = {
  items?: {
    img: string;
    name: string;
    description: string;
  }[];
};

const mockItems = [
  {
    img: '',
    name: 'Каньон Рускеала',
    description: 'Мурманск, Мурманская область',
  },
  {
    img: '',
    name: 'Каньон Рускеала',
    description: 'Мурманск, Мурманская область',
  },
  {
    img: '',
    name: 'Каньон Рускеала',
    description: 'Мурманск, Мурманская область',
  },
];

export const Search: React.FC<Props> = ({ items = mockItems }) => {
  return (
    <div className={style.search}>
      <IconSearch />
      <Input className={style.input} placeholder="Поиск впечатлений" bordered={false} />
    </div>
  );
};
