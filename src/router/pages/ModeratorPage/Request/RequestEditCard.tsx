import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb, Button, Typography } from 'antd';
import { CONTENT_TYPE } from '../enum/contentType';
import { RemoveModal } from '../RemoveModal';
import { CARD_TYPE } from '../enum/cardType';
import { breadcrumbs } from '../constants/breadcrumbs';
import { RequestForm } from './RequestForm';
import { CardMedia } from '../CardMedia';

const { Title } = Typography;

interface ModeratorCardProps {
  content: CONTENT_TYPE;
  type: CARD_TYPE;
}

export const RequestEditCard = ({ content, type }: ModeratorCardProps) => {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const navigationItems =
    content === CONTENT_TYPE.CHANGE
      ? breadcrumbs.request.change.card
      : breadcrumbs.request.mapPoint.card;

  const getTitle = () => {
    switch (type) {
      case CARD_TYPE.CREATE:
        return 'Создание объекта';
      default:
        return 'Редактирование объекта';
    }
  };

  const handleCancel = () => {
    if (type === CARD_TYPE.EDIT) navigate(`/moderator/request/${content}/${id}`);
    if (type === CARD_TYPE.CREATE) navigate(`/moderator/request/${content}`);
  };

  const handleRemove = () => {
    console.log('remove');
  };

  return (
    <div>
      <Breadcrumb items={navigationItems} />

      <div className="flex justify-between items-center">
        <Title level={3} className="mt-5">
          {getTitle()}
        </Title>
        <div>
          <div className="flex">
            <Button type="text" onClick={handleCancel}>
              Отменить
            </Button>
            <Button type="primary" className="ml-1">
              Сохранить
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-2.5 grid grid-cols-2">
        <RequestForm type={type} />
        <CardMedia type={type} />
        {/*  <AttractionCardMedia isEditable={true} />*/}
      </div>

      <RemoveModal
        isOpened={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        onConfirm={handleRemove}
      />
    </div>
  );
};
