import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';
import styles from './NTInput.module.scss';

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  before?: ReactNode;
  after?: ReactNode;
}

export const NTInput = ({ before, after, className, ...props }: Props) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      {before && <div className={styles.before}>{before}</div>}
      <input
        type="text"
        className={cn(styles.input, {
          ['pl-2.5']: before,
          ['pr-2.5']: after,
        })}
        {...props}
      />
    </div>
  );
};
