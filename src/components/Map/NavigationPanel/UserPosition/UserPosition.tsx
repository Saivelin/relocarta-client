import React from 'react';
import style from './UserPosition.module.scss';
import { Switch, SwitchProps } from 'antd';

type Props = {
  coords: [number, number];
  onChange: SwitchProps['onChange'];
  isChecked: boolean;
};

export const UserPosition: React.FC<Props> = ({ coords, isChecked, onChange }) => {
  return (
    <div className={style.wrap}>
      <div className={style.position}>
        Текущее положение
        {/* {coords[0]}: {coords[1]} */}
      </div>

      <Switch checked={isChecked} checkedChildren={1} onChange={onChange} />
    </div>
  );
};
