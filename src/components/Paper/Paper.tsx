import style from './Paper.module.scss';
import cn from 'classnames';

type Props = {
  className?: string;
};

export const Paper: React.FC<Props> = ({ className, children }) => {
  return <div className={cn(style.paper, className)}>{children}</div>;
};
