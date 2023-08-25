import cn from 'classnames';
import styles from './NTButton.module.scss';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export interface NTButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  theme?: 'outline' | 'filled';
  size?: 's' | 'm' | 'l';
  color?: 'default' | 'primary';
}

export const NTButton = ({
  theme = 'outline',
  size = 's',
  color = 'default',
  children,
  className,
  ...props
}: NTButtonProps) => {
  return (
    <button
      className={cn(
        'bg-white  cursor-pointer rounded-sm',
        {
          [styles.outline]: theme === 'outline',
          ['text-[14px] py-[7px] px-[15px]']: size === 's',
          ['bg-white']: color === 'default',
          [styles.primary]: color === 'primary',
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
