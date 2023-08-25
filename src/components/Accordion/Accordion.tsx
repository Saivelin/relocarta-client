import React, { useState } from 'react';
import style from './Accordion.module.scss';
import { IconArrowDown, IconArrowUp } from '../Icons';

type Props = {
  title: string;
  content: string;
};

const Accordion: React.FC<Props> = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={style.accordion}>
      <div className={style.item}>
        <div className={style.title} onClick={() => setIsActive(!isActive)}>
          <div>{title}</div>
          <div>{isActive ? <IconArrowUp /> : <IconArrowDown />}</div>
        </div>
        {isActive && <div className={style.content}>{content}</div>}
      </div>
    </div>
  );
};

export default Accordion;
