import { Button as Btn, ButtonProps } from 'antd';
import style from './Button.module.scss';
import cn from 'classnames';

type Props = ButtonProps & {
  opacity?: boolean;
  clear?: boolean;
  clearGray?: boolean;
  gray?: boolean;
  noBorder?: boolean;
  green?: boolean;
  orange?: boolean;
  primary?: boolean;
  notRounded?: boolean;
  sm?: boolean;
  accent?: boolean;
};

export const Button: React.FC<Props> = ({
  green = false,
  gray = false,
  clear = false,
  opacity = false,
  noBorder = false,
  orange = false,
  primary = false,
  notRounded = false,
  clearGray = false,
  sm = false,
  accent = false,
  className,
  ...props
}) => {
  const classNames = {
    [style.button]: !clear,
    [style.clear]: clear,
    [style.opacity]: opacity,
    [style.noBorder]: noBorder,
    [style.notRounded]: notRounded,

    [style.clearGray]: clearGray,

    [style.sm]: sm,

    [style.gray]: gray,
    [style.green]: green,
    [style.orange]: orange,
    [style.primary]: primary,
    [style.accent]: accent,
  };

  return <Btn {...props} className={cn(classNames, className)} />;
};
