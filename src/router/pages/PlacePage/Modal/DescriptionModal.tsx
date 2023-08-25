import { FC, useState } from 'react';
import styles from './Modal.module.scss';
import { Input, Modal } from 'antd';
import { NTButton } from '../../../../components/Button/NTButton';
import {
  CreateAttractionDescriptionRequestBody,
  useAttractionDescriptionRequestQuery,
} from '../../../../services/attraction';

interface Props {
  onClose: () => void;
  data: any;
}

export const DescriptionModal: FC<Props> = ({ onClose, data }) => {
  const [formData, setFormData] = useState<CreateAttractionDescriptionRequestBody>({
    attractionId: data.id,
    email: '',
    description: '',
    cityName: data.city,
    regionName: data.region,
    lat: data.lat,
    lng: data.lng,
  });

  const [createDescription] = useAttractionDescriptionRequestQuery();

  const onChangeInput = (field: string, e: any) => {
    setFormData((data) => ({ ...data, [field]: e.target.value }));
  };

  const onSubmit = () => {
    createDescription(formData);

    onClose();
  };

  return (
    <Modal
      open
      centered
      footer={[]}
      onCancel={onClose}
      className={styles.modal}
      width={500}
    >
      <div className="flex flex-col font-montserrat">
        <div className="font-medium">Добавить описание</div>
        <div className="border-bottom-gray -mx-6 pt-4" />

        <div className="pt-4">
          <span>Ваше описание:</span>
          <Input.TextArea
            rows={5}
            placeholder="Добавьте описание здесь"
            className="mt-2"
            value={formData.description}
            onChange={(e) => onChangeInput('description', e)}
          />
        </div>

        <div className="mt-6">
          <span>Email</span>
          <Input
            placeholder="Укажите email для обратной связи"
            className="mt-2"
            value={formData.email}
            onChange={(e) => onChangeInput('email', e)}
          />
        </div>

        <div className="border-bottom-gray -mx-6 pt-6" />

        <div className="flex justify-end gap-2 mt-3 -mb-4">
          <NTButton onClick={onClose}>Отменить</NTButton>
          <NTButton theme="filled" color="primary" onClick={onSubmit}>
            Отправить
          </NTButton>
        </div>
      </div>
    </Modal>
  );
};
