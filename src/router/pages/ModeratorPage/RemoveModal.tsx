import { Button, Modal, Typography } from 'antd';

const { Title } = Typography;

interface ModalProps {
  isOpened: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const RemoveModal = ({ isOpened, onClose, onConfirm }: ModalProps) => {
  return (
    <Modal
      centered
      open={isOpened}
      okButtonProps={{ className: 'hidden' }}
      cancelButtonProps={{ className: 'hidden' }}
      onCancel={onClose}
    >
      <div className="p-5">
        <Title level={3} className="text-center mt-2.5">
          Вы действительно хотите удалить объект?
        </Title>
        <div className="flex justify-center mt-10">
          <Button type="text" onClick={onClose}>
            Отменить
          </Button>
          <Button type="primary" danger onClick={onConfirm} className="ml-1">
            Удалить
          </Button>
        </div>
      </div>
    </Modal>
  );
};
