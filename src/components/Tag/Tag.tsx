import style from './Tag.module.scss';
import cn from 'classnames';

type Props = {
  className?: string;
};

export const Tag: React.FC<Props> = ({ className, children }) => {
  return <div className={cn(style.tag, className)}>{children}</div>;
};
