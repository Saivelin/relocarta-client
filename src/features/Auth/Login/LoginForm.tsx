import { FC } from 'react';
import { Input, Modal } from 'antd';
import styles from '../Auth.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../../../components/Button/Button';
import cn from 'classnames';
import { RiLock2Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  email: yup.string().email().required('Введите почту или телефон'),
  password: yup.string().required('Введите пароль').min(8, 'Пароль не менее 8 символов'),
});

type Props = {
  onClose: () => void;
  toRegistration: () => void;
  toRecovery: () => void;
};

export const LoginForm: FC<Props> = ({ onClose, toRecovery, toRegistration }: Props) => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <Modal
      open
      centered
      className={styles.form}
      footer={[]}
      onCancel={onClose}
      width={440}
    >
      <form>
        <div className="font-montserrat text-base">
          <div className="text-[32px] text-accent font-bold">Вход</div>
          <div className="mt-4 ">Введите данные учётной записи</div>

          <div className="mt-9">
            <div className="mb-1">Email</div>

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  status={errors.email && 'error'}
                  placeholder="Введите емейл"
                  className={styles.input}
                  prefix={
                    <span
                      className={cn(
                        'text-accent font-semibold text-[20px] mr-3',
                        styles.email,
                        { ['text-red-500']: !!errors.email },
                      )}
                    >
                      @
                    </span>
                  }
                  size="large"
                />
              )}
            />

            {errors.email && (
              <div className={styles.error}>Введите почту или телефон</div>
            )}
          </div>

          <div className="mt-9">
            <div className="mb-1">Пароль</div>

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  status={errors.password && 'error'}
                  placeholder="Пароль"
                  className={styles.input}
                  prefix={
                    <RiLock2Line
                      className={cn('mr-[3px] text-accent text-[20px]', {
                        ['text-red-500']: !!errors.password,
                      })}
                    />
                  }
                  size="large"
                />
              )}
            />

            {errors.password && (
              <div className={styles.error}>{errors.password.message}</div>
            )}
          </div>
        </div>

        <div className="flex justify-end text-accent mt-2.5 text-sm font-semibold cursor-pointer hover:text-accent-light" onClick={toRecovery}>
          Забыли пароль?
        </div>

        <Button
          accent
          className="mt-9 h-[48px] w-full"
          onClick={handleSubmit(() => {
            isValid ? localStorage.setItem('is-auth', 'true') : null;
            onClose();
            navigate('/');
          })}
        >
          Войти
        </Button>

        <div className="flex justify-center mt-9 gap-4">
          <div className="rounded-full w-[48px] h-[48px] shadow flex justify-center items-center cursor-pointer hover:shadow-lg">
            <img src="/icons/google.svg" alt="google" />
          </div>
          <div className="rounded-full w-[48px] h-[48px] shadow flex justify-center items-center cursor-pointer hover:shadow-lg">
            <img src="/icons/facebook.svg" alt="facebook" />
          </div>
        </div>

        <div className="text-center mt-9">
          Нет аккаунта?{' '}
          <span
            className={cn(
              'text-accent font-semibold cursor-pointer hover:text-accent-light',
              styles.a,
            )}
            onClick={toRegistration}
          >
            Зарегистрироваться
          </span>
        </div>
      </form>
    </Modal>
  );
};
