import { Button, Form, Input, Modal, Typography } from 'antd';

const { Title } = Typography;

interface ModalProps {
  isOpened: boolean;
  onClose: () => void;
}

export const MessageModal = ({ isOpened, onClose }: ModalProps) => {
  const sendEmail = () => {};

  return (
    <Modal
      centered
      open={isOpened}
      okButtonProps={{ className: 'hidden' }}
      cancelButtonProps={{ className: 'hidden' }}
      onCancel={onClose}
    >
      <div className="p-5">
        <Title level={5} className="mt-2.5">
          Отправить ответ на заявку
        </Title>

        <Form className="w-full mt-5" size="small">
          <Form.Item>
            <Input
              addonBefore="Кому"
              defaultValue="test@gmail.com"
              className="w-full mb-2.5"
            />
            <Input addonBefore="Копия" className="w-full mb-2.5" />
            <Input
              addonBefore="Тема"
              defaultValue="Ответ на заявку"
              className="w-full mb-2.5"
            />
            <Input
              addonBefore="От"
              defaultValue="moderator@novitravel.ru"
              className="w-full mb-2.5"
            />
            <Form.Item className="mt-5">
              <Input.TextArea rows={10} />
            </Form.Item>
          </Form.Item>
        </Form>

        <div className="flex justify-center mt-5">
          <Button type="text" onClick={onClose}>
            Отменить
          </Button>
          <Button type="primary" onClick={sendEmail} className="ml-1">
            Отправить
          </Button>
        </div>
      </div>
    </Modal>
  );
};
