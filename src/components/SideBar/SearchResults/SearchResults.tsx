import * as React from 'react';
import style from './SearchResults.module.scss';
import { Scroll, ScrollWrap } from '../SideBar';

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

const item = mockItems[0];

export const SearchResults: React.FC<Props> = ({ items = mockItems }) => {
  return (
    <ScrollWrap>
      <div className={style.title}>История поиска:</div>

      <Scroll>
        {new Array(100).fill(item).map((item, index) => (
          <div key={index} className={style.item}>
            <img className={style.img} src="/images/storygrave.jpg" alt="story_img" />

            <div>
              <div className={style.name}>{item.name}</div>

              <div className={style.description}>{item.description}</div>
            </div>
          </div>
        ))}
      </Scroll>
    </ScrollWrap>
  );
};
