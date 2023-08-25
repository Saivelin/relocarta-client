import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { Breadcrumb, Button, message, Typography } from 'antd';
import { breadcrumbs } from '../../constants/breadcrumbs';
import { CARD_TYPE } from '../../enum/cardType';
import { AttractionCardForm } from './AttractionCardForm';
import { RemoveModal } from '../../RemoveModal';
import { CardMedia } from '../../CardMedia';
import {
  CreateAttractionModeratorBody,
  useCreateAttractionQuery,
  useDeleteAttractionQuery,
  useUpdateAttractionQuery,
} from '../../../../../services/attraction';

const { Title } = Typography;

const ATTRACTIONS_ID = 'de450030-7a00-4137-93b8-b054d9af15b5';

const INITIAL_STATE = {
  attractionId: '',
  name: '',
  address: '',
  cityId: '',
  scaleId: '',
  poiTypeId: ATTRACTIONS_ID,
  typeId: '',
  subtypeId: '',
  description: '',
  phone: '',
  email: '',
  features: '',
  lat: 0,
  lng: 0,
};

interface ModeratorCardProps {
  type: CARD_TYPE;
}

export const AttractionCard = ({ type }: ModeratorCardProps) => {
  const [createAttraction] = useCreateAttractionQuery();
  const [updateAttraction] = useUpdateAttractionQuery();
  const [deleteAttraction] = useDeleteAttractionQuery();

  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [form, setForm] = useState<CreateAttractionModeratorBody>({ ...INITIAL_STATE });
  const { id } = useParams();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const isEditable = type !== CARD_TYPE.VIEW;

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Ошибка! Что то пошло не так.',
    });
  };

  const getTitle = () => {
    switch (type) {
      case CARD_TYPE.CREATE:
        return 'Создание объекта';
      case CARD_TYPE.EDIT:
        return 'Редактирование объекта';
      default:
        return 'Просмотр объекта';
    }
  };

  const handleRemove = () => {
    // @ts-ignore
    deleteAttraction(id);
    navigate(`/moderator/content/attraction`);
  };

  const handleToEdit = () => {
    navigate(`/moderator/content/attraction/${id}/edit`);
  };

  const handleCancel = () => {
    if (type === CARD_TYPE.EDIT) {
      navigate(`/moderator/content/attraction/${id}`);
    } else {
      navigate(`/moderator/content/attraction`);
    }
  };

  const onChange = (field: string, value: string | number) => {
    setForm((form) => ({ ...form, [field]: value }));
  };

  const onLoadData = (data: any) => {
    const formData = {
      attractionId: id,
      name: data.getFieldValue('name'),
      address: data.getFieldValue('address'),
      cityId: data.getFieldValue('city'),
      scaleId: data.getFieldValue('scale'),
      poiTypeId: ATTRACTIONS_ID,
      typeId: data.getFieldValue('objectType'),
      subtypeId: data.getFieldValue('subtype'),
      description: data.getFieldValue('desc'),
      phone: data.getFieldValue('phone'),
      email: data.getFieldValue('email'),
      features: '',
      lat: +data.getFieldValue('lat'),
      lng: +data.getFieldValue('lng'),
    };
    setForm(formData);
  };

  const save = async () => {
    form.lat = +form.lat;
    form.lng = +form.lng;
    form.phone = `+7${form.phone}`;

    try {
      if (type === CARD_TYPE.CREATE) {
        // @ts-ignore
        const { data } = await createAttraction(form);
        data ? navigate(`/moderator/content/attraction/${data}`) : error();
      } else {
        form.attractionId = id;
        // @ts-ignore
        const res = await updateAttraction(form);
        res ? navigate(`/moderator/content/attraction/${id}`) : error();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Breadcrumb items={breadcrumbs.content.attraction.card} />

      <div className="flex justify-between items-center">
        {contextHolder}
        <Title level={3} className="mt-5">
          {getTitle()}
        </Title>
        <div>
          {!isEditable && (
            <div className="flex">
              <Button
                type="primary"
                icon={<MdOutlineModeEditOutline />}
                className="flex items-center"
                onClick={handleToEdit}
              >
                Редактировать
              </Button>
              <Button
                type="link"
                danger
                onClick={() => setIsRemoveModalOpen(true)}
                className="ml-1"
              >
                Удалить
              </Button>
            </div>
          )}
          {isEditable && (
            <div className="flex">
              <Button type="text" onClick={handleCancel}>
                Отменить
              </Button>
              <Button type="primary" className="ml-1" onClick={save}>
                Сохранить
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-2.5 grid grid-cols-2">
        <AttractionCardForm type={type} onChange={onChange} onLoadData={onLoadData} />
        <CardMedia type={type} />
      </div>

      <RemoveModal
        isOpened={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        onConfirm={handleRemove}
      />
    </div>
  );
};
