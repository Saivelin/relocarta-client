import { Form, Input, Select, Typography } from 'antd';
import { defaultFormLayout } from '../constants/formLayout';
import { CARD_TYPE } from '../enum/cardType';

const { Title } = Typography;
const { Option } = Select;

interface FormProps {
  type: CARD_TYPE;
}

export const RequestForm = ({ type }: FormProps) => {
  const [form] = Form.useForm();

  const isEditable = type === CARD_TYPE.CREATE;

  return (
    <div>
      <Title level={5}>Параметры</Title>

      <Form {...defaultFormLayout} form={form} className="mt-5">
        <Form.Item label="Название:" className="mb-2.5">
          <Input placeholder="Введите название" />
        </Form.Item>
        <Form.Item label="Тип:" className="mb-2.5">
          <Input placeholder="Какой-то тип" disabled={!isEditable} />
        </Form.Item>
        <Form.Item name="subtype" label="Подтип:" className="mb-2.5">
          <Select placeholder="Выбирите подтип">
            <Option value="1">Подтип 1</Option>
            <Option value="2">Подтип 2</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Регион:" className="mb-2.5">
          <Input placeholder="Какой-то регион" disabled={!isEditable} />
        </Form.Item>
        <Form.Item name="city" label="Город:" className="mb-2.5">
          <Select placeholder="Выбирите город">
            <Option value="1">Москва</Option>
            <Option value="2">Санкт-Петербург</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Телефон:" className="mb-2.5">
          <Input addonBefore="+7" placeholder="Укажите номер без кода" />
        </Form.Item>
        <Form.Item label="Email:" className="mb-2.5">
          <Input placeholder="Укажите email" />
        </Form.Item>
        <Form.Item name="scale" label="Масштаб:" className="mb-2.5">
          <Select placeholder="Выберите масштаб">
            <Option value="1">Масштаб 1</Option>
            <Option value="2">Масштаб 2</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Долгота:" className="mb-2.5">
          <Input placeholder="Укажите число" />
        </Form.Item>
        <Form.Item label="Широта:" className="mb-2.5">
          <Input placeholder="Укажите число" />
        </Form.Item>
        <Form.Item label="Описание:" className="mb-2.5">
          <Input.TextArea rows={10} placeholder="Введите описание объекта" />
        </Form.Item>
      </Form>
    </div>
  );
};
