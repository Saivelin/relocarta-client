import * as React from 'react';
import style from './SideBar.module.scss';
import cn from 'classnames';
import { IconClose } from '../Icons';
import { useOutSideClick } from '../../hooks/useOutSideClick';
import { Logo } from '../Logo/Logo';

type Props = {
  isOpen: boolean;
  onClickClose: () => void;
  withCloseButton?: boolean;
  outSideClicked?: boolean;
  renderTop?: React.ReactNode;
};

export const SideBar: React.FC<Props> = ({
  isOpen,
  onClickClose,
  children,
  outSideClicked = true,
  renderTop,
  withCloseButton = false,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  useOutSideClick(ref, outSideClicked ? onClickClose : () => null);

  return (
    <>
      <div ref={ref} className={cn(style.sidebar, { [style.isActive]: isOpen })}>
        <div className={style.top}>
          {withCloseButton && (
            <div className={style.close}>
              <IconClose size={30} onClick={onClickClose} />
            </div>
          )}

          {renderTop || <Logo className={style.logo} />}
        </div>

        {children}

        <div className={style.img}></div>
      </div>
      {isOpen && <div className={style.overlay}></div>}
    </>
  );
};

export const Scroll: React.FC = ({ children }) => {
  return <div className={style.scroll}>{children}</div>;
};

export const ScrollWrap: React.FC = ({ children }) => {
  return <div className={style.scrollWrap}>{children}</div>;
};
