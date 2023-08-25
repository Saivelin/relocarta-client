import { Form, Input, Select, Typography } from 'antd';
import { CARD_TYPE } from '../../enum/cardType';
import { defaultFormLayout } from '../../constants/formLayout';
import { MaskedInput } from 'antd-mask-input';
import {
  Attraction,
  useGetAttractionQuery,
  useGetAttractionScalesQuery,
  useGetAttractionSubtypesQuery,
  useGetAttractionTypesQuery,
} from '../../../../../services/attraction';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCitiesQuery } from '../../../../../services/location';

const { Title } = Typography;
const { Option } = Select;

interface ObjectSubTypes {
  label: string;
  value: string;
}

interface FormProps {
  type: CARD_TYPE;
  onChange: (field: string, value: string | number) => void;
  onLoadData: (data: any) => void;
}

export const AttractionCardForm = ({ type, onChange, onLoadData }: FormProps) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const { data: attraction } = useGetAttractionQuery<Attraction | any>(id);
  const [objectTypeId, setObjectTypeId] = useState(attraction?.subtype?.type?.id);
  const [objectSubtypes, setObjectSubtypes] = useState<ObjectSubTypes[]>([]);
  const { data: scales } = useGetAttractionScalesQuery();
  const { data: types } = useGetAttractionTypesQuery();
  const { data: subtypes } = useGetAttractionSubtypesQuery(objectTypeId);
  const { data: cities } = useGetCitiesQuery();

  useEffect(() => {
    const objectSubtypes: ObjectSubTypes[] = subtypes
      ? subtypes?.map((type) => ({
          value: type.id,
          label: type.name,
        }))
      : [];
    setObjectSubtypes(objectSubtypes);
  }, [subtypes]);

  useEffect(() => {
    const getAttractionData = () => {
      form.setFieldValue('name', attraction.name);
      form.setFieldValue('scale', attraction.scale.id);
      form.setFieldValue('objectType', attraction.subtype.type.id);
      setObjectTypeId(attraction.subtype.type.id);
      form.setFieldValue('subtype', attraction.subtype.id);
      form.setFieldValue('city', attraction.city.id);
      form.setFieldValue('address', attraction.address);
      form.setFieldValue('email', attraction.email);
      form.setFieldValue('phone', attraction.phone ? attraction.phone.slice(2) : '');
      form.setFieldValue('lat', attraction.lat);
      form.setFieldValue('lng', attraction.lng);
      form.setFieldValue('desc', attraction.description);
    };

    if ((type === CARD_TYPE.VIEW || type === CARD_TYPE.EDIT) && attraction) {
      getAttractionData();
      onLoadData(form);
    }
  }, [attraction]);

  const cityOptions = cities?.map((city) => ({
    value: city.id,
    label: city.name,
  }));

  const isEditable = type !== CARD_TYPE.VIEW;
  const isEdit = type === CARD_TYPE.EDIT;

  return (
    <div>
      <Title level={5}>Параметры</Title>

      <Form {...defaultFormLayout} form={form} className="mt-5">
        <Form.Item name="name" label="Название:" className="mb-2.5">
          <Input
            placeholder="Введите имя"
            disabled={!isEditable}
            onChange={() => onChange('name', form.getFieldValue('name'))}
          />
        </Form.Item>
        <Form.Item name="scale" label="Масштаб:" className="mb-2.5">
          <Select
            placeholder="Выберите масштаб"
            disabled={!isEditable}
            onChange={() => onChange('scaleId', form.getFieldValue('scale'))}
          >
            {scales &&
              scales.map((scale) => (
                <Option key={scale.id} value={scale.id}>
                  {scale.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item name="objectType" label="Тип:" className="mb-2.5">
          <Select
            placeholder="Какой-то тип"
            disabled={!isEditable}
            onSelect={() => {
              onChange('typeId', form.getFieldValue('objectType'));
              setObjectTypeId(form.getFieldValue('objectType'));
              form.setFieldValue('subtype', null);
            }}
          >
            {types &&
              types.map((type) => (
                <Option key={type.id} value={type.id}>
                  {type.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item name="subtype" label="Подтип:" className="mb-2.5">
          <Select
            showSearch
            placeholder="Выбирите подтип"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={objectSubtypes}
            disabled={!isEditable || !form.getFieldValue('objectType')}
            onSelect={() => onChange('subtypeId', form.getFieldValue('subtype'))}
          />
        </Form.Item>
        <Form.Item name="city" label="Город:" className="mb-2.5">
          <Select
            showSearch
            placeholder="Введите или выбирите"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={cityOptions}
            disabled={!isEditable}
            onSelect={() => onChange('cityId', form.getFieldValue('city'))}
          />
        </Form.Item>
        <Form.Item name="address" label="Адрес:" className="mb-2.5">
          <Input
            placeholder="Введите адрес"
            disabled={!isEditable}
            onChange={() => onChange('address', form.getFieldValue('address'))}
          />
        </Form.Item>
        <Form.Item name="email" label="Email:" className="mb-2.5">
          <Input
            placeholder="Введите email"
            disabled={!isEditable}
            onChange={() => onChange('email', form.getFieldValue('email'))}
          />
        </Form.Item>
        <Form.Item name="phone" label="Телефон:" className="mb-2.5">
          <Input
            // mask={'+7 (000) 000-00-00'}
            addonBefore="+7"
            placeholder="Укажите номер телефона"
            disabled={!isEditable}
            onChange={() => onChange('phone', form.getFieldValue('phone'))}
          />
        </Form.Item>
        <Form.Item name="lat" label="Широта:" className="mb-2.5">
          <Input
            placeholder="Укажите число"
            disabled={!isEditable}
            onChange={() => onChange('lat', form.getFieldValue('lat'))}
          />
        </Form.Item>
        <Form.Item name="lng" label="Долгота:" className="mb-2.5">
          <Input
            placeholder="Укажите число"
            disabled={!isEditable}
            onChange={() => onChange('lng', form.getFieldValue('lng'))}
          />
        </Form.Item>
        <Form.Item name="desc" label="Описание:" className="mb-2.5">
          <Input.TextArea
            rows={10}
            placeholder="Введите описание объекта"
            disabled={!isEditable}
            onChange={() => onChange('description', form.getFieldValue('desc'))}
          />
        </Form.Item>
      </Form>
    </div>
  );
};
