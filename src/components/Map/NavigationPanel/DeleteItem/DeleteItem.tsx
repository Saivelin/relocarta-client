import React from 'react';
import style from './DeleteItem.module.scss';

type Props = {
  onClickDelete: () => void;
  onClickCancel: () => void;
};

export const DeleteItem: React.FC<Props> = ({ onClickDelete, onClickCancel }) => {
  return (
    <div className={style.wrap}>
      <div className={style.title}>Удалить из маршрута?</div>

      <div
        className={style.delete}
        onClick={() => {
          onClickDelete();
          onClickCancel();
        }}
      >
        Удалить
      </div>

      <div className={style.cancel} onClick={onClickCancel}>
        Отмена
      </div>
    </div>
  );
};
