import { FC } from 'react';
import { Input, Modal } from 'antd';
import styles from '../Auth.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../../../components/Button/Button';
import cn from 'classnames';

const schema = yup.object({
  email: yup.string().email().required('Введите почту или телефон'),
});

type Props = {
  onClose: () => void;
  toVerification: () => void;
};

export const RecoveryPasswordForm: FC<Props> = ({ onClose, toVerification }: Props) => {
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
          <div className="mt-4 ">Введите адрес электронной почты</div>

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
        </div>

        <Button
          accent
          className="mt-9 h-[48px] w-full"
          onClick={handleSubmit(toVerification)}
        >
          Продолжить
        </Button>
      </form>
    </Modal>
  );
};
