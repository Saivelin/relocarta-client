import { FC } from 'react';
import { Input, Modal } from 'antd';
import styles from '../Auth.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../../../components/Button/Button';
import cn from 'classnames';

const schema = yup.object({
  code: yup.string().required('Введите проверочный код'),
});

type Props = {
  onClose: () => void;
  toReset: () => void;
};

export const VerificationCodeFrom: FC<Props> = ({ onClose, toReset }: Props) => {
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
          <div className="mt-4 ">Введите проверочный код</div>

          <div className="mt-9">
            <div className="mb-1">Проверочный код</div>

            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  status={errors.code && 'error'}
                  placeholder="EX: 123456"
                  className={cn(styles.input, 'text-center')}
                  size="large"
                />
              )}
            />

            {errors.code && <div className={styles.error}>Введите проверочный код</div>}
          </div>
        </div>

        <Button accent className="mt-9 h-[48px] w-full" onClick={handleSubmit(toReset)}>
          Продолжить
        </Button>
      </form>
    </Modal>
  );
};
