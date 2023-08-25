import { FC } from 'react';
import { Input, Modal } from 'antd';
import styles from '../Auth.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../../../components/Button/Button';
import cn from 'classnames';
import { RiLock2Line } from 'react-icons/ri';

const schema = yup.object({
  password: yup.string().required('Введите пароль').min(8, 'Пароль не менее 8 символов'),
});

type Props = {
  onClose: () => void;
  toLogin: () => void;
};

export const ResetPasswordForm: FC<Props> = ({ onClose, toLogin }: Props) => {
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
      <form>
        <div className="font-montserrat text-base">
          <div className="text-[32px] text-accent font-bold">Забыли пароль?</div>
          <div className="mt-4 ">Введите новый пароль для входа</div>

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

        <Button
          accent
          className="mt-9 h-[48px] w-full"
          onClick={handleSubmit(toLogin)}
        >
          Сохранить
        </Button>
      </form>
    </Modal>
  );
};
