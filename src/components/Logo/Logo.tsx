import * as React from 'react';
import { Link } from 'react-router-dom';
import style from './Logo.module.scss';
import cn from 'classnames';

type Props = {
  className?: string;
  white?: boolean;
  targetBlank?: boolean;
};

export const Logo: React.FC<Props> = ({
  className,
  white = false,
  targetBlank = false,
}) => {
  return (
    <div className={cn(style.wrap, className)} data-index="5">
      <Link to="/" target={targetBlank ? '_blank' : undefined}>
        <div className={style.logo}>
          <div className={style.logo__image}>
            <img
              src={'https://novitravel.ru/img/int/own/abt/01/icon_globe.png'}
              alt="logo"
            />
          </div>
          <div className={cn(style.logo__text, { [style.white]: white })}>Новитревел</div>
        </div>
      </Link>
    </div>
  );
};
