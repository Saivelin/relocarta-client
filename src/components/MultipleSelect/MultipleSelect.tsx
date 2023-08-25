import { FC } from 'react';
import style from './MultipleSelect.module.scss';
import { Cascader, CascaderProps } from 'antd';
import cn from 'classnames';

type Props = {
  label?: string;
  onChange: (value: string[][]) => void;
  value: string[];
} & Omit<CascaderProps, 'onChange' | 'value'>;

export const MultipleSelect: FC<Props> = ({ className, value, label, ...props }) => {
  const selectProps = props as CascaderProps;

  props.multiple = true;
  props.maxTagCount = 'responsive';

  return (
    <div className={cn(style.select, className)}>
      {label && <div className={style.label}>{label}</div>}
      <Cascader
        value={value.map((p) => [p])}
        {...selectProps}
        className={style.select}
        showSearch
        style={{ width: '100%' }}
        expandIcon={5}
      />
    </div>
  );
};
