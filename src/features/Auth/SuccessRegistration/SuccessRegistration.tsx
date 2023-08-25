import { FC } from 'react';
import styles from './SuccessRegistration.module.scss';
import { Button } from '../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

type Props = {
  toLogin: () => void;
  onClose: () => void;
};

export const SuccessRegistration: FC<Props> = ({ toLogin, onClose }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>Ваш профиль успешно зарегистрирован</div>
      <div className={styles.text}>
        Войдите в личный кабинет, чтобы управлять маршрутами, любимыми местами и профилем
      </div>

      <div className="flex flex-col">
        <Button accent className="w-full h-[48px] mt-[250px]" onClick={toLogin}>
          Войти в личный кабинет
        </Button>

        <div
          className="text-center mt-6 text-base text-gray-400 hover:text-accent-light cursor-pointer"
          onClick={() => {
            onClose();
            navigate('/');
          }}
        >
          На главную
        </div>
      </div>
    </div>
  );
};
