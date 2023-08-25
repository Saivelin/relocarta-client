import React from 'react';
import style from './Menu.module.scss';

type Props = {
  onClick: () => void;
  className?: string;
};

export const Menu: React.FC<Props> = ({ onClick, className }) => {
  return (
    <div className={className && style[className]}>
      <div className={style.wrap} onClick={onClick}>
        <div className={style.burger}>
          {['-', '-', '-'].map((line, i) => (
            <div key={i}></div>
          ))}
        </div>
      </div>
    </div>
  );
};
