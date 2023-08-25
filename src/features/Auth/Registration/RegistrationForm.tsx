import { FC } from 'react';
import styles from './RegistrationForm.module.scss';
import { Input, Modal, ConfigProvider } from 'antd';
import { IconLock, IconUserOutline } from '../../../components/Icons';
import { useOpenCloseToggle } from '../../../hooks/useOpenCloseToggle';
import { SuccessRegistration } from '../SuccessRegistration/SuccessRegistration';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../../../components/Button/Button';
import { RiLock2Line } from 'react-icons/ri';
import cn from 'classnames';

const schema = yup.object({
  name: yup.string().max(6, 'Максимум 6 символов').required('Введите имя'),
  email: yup.string().email().required('Введите email'),
  password: yup.string().required('Введите пароль').min(8, 'Пароль не менее 8 символов'),
  confirmPassword: yup
    .string()
    .required('Повторите пароль')
    .oneOf([yup.ref('password')], 'Пароли не совпадают'),
});

type Props = {
  onClose: () => void;
  toLogin: () => void;
};

export const RegistrationForm: FC<Props> = ({ onClose, toLogin }) => {
  const [isSuccess, openSuccess, closeSuccess] = useOpenCloseToggle(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
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
      {!isSuccess ? (
        <>
          <div className={styles.title}>Регистрация</div>

          <div className={styles.inputWrap}>
            <div className={styles.label}>Имя</div>

            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  status={errors.name && 'error'}
                  placeholder="Введите Имя"
                  className={styles.input}
                  prefix={
                    <IconUserOutline
                      className={cn('mr-px text-accent text-[20px]', {
                        ['text-red-500']: !!errors.name,
                      })}
                    />
                  }
                  size="large"
                  required
                />
              )}
            />

            {errors.name && <div className={styles.error}>{errors.name.message}</div>}
          </div>

          <div className={styles.inputWrap}>
            <div className={styles.label}>Email</div>

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
                        'text-accent font-semibold text-[20px] mr-1',
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

            {errors.email && <div className={styles.error}>{errors.email.message}</div>}
          </div>

          <div className={styles.inputWrap}>
            <div className={styles.label}>Пароль</div>

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

          <div className={styles.inputWrap}>
            <div className={styles.label}>Повторить пароль</div>

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  status={errors.confirmPassword && 'error'}
                  placeholder="Повторите пароль"
                  className={styles.input}
                  prefix={
                    <RiLock2Line
                      className={cn('mr-[3px] text-accent text-[20px]', {
                        ['text-red-500']: !!errors.confirmPassword,
                      })}
                    />
                  }
                  size="large"
                />
              )}
            />

            {errors.confirmPassword && (
              <div className={styles.error}>{errors.confirmPassword.message}</div>
            )}
          </div>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#6dc682',
                colorPrimaryHover: '#6dc682',
              },
            }}
          >
            <Button
              accent
              className="mt-9 h-[48px] w-full mb-8"
              onClick={handleSubmit(openSuccess)}
            >
              Зарегистрироваться
            </Button>
          </ConfigProvider>
          <div className={styles.text}>
            Уже есть учетная запись?{' '}
            <span className="cursor-pointer hover:text-accent-light" onClick={toLogin}>
              Войти
            </span>
          </div>
          <div className={styles.text}>
            Хотите стать партнёром Новитревел?{' '}
            <span>Создайте учетную запись партнера</span>
          </div>
          <div className={styles.policy}>
            Создавая учётную запись, вы соглашаетесь с{' '}
            <span>Пользовательским соглашением</span> и{' '}
            <span>Политикой конфедициальности</span> Новитревел
          </div>
        </>
      ) : (
        <SuccessRegistration
          toLogin={toLogin}
          onClose={() => {
            closeSuccess();
            onClose();
          }}
        />
      )}
    </Modal>
  );
};
