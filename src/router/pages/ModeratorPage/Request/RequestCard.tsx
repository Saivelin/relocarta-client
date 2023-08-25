import { Breadcrumb, Button, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { breadcrumbs } from '../constants/breadcrumbs';
import { REQUEST_STATUS } from '../enum/requestStatus';
import { CARD_TYPE } from '../enum/cardType';
import { CONTENT_TYPE } from '../enum/contentType';
import { ChangeDescription } from './Change/ChangeDescription';
import { MapPointDescription } from './MapPoint/MapPointDescription';
import { MessageModal } from './MessageModal';
import { change } from '../data/change';
import { mapPoints } from '../data/mapPoints';

const { Title } = Typography;

interface CardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  type?: CARD_TYPE;
  content?: CONTENT_TYPE;
}

export const RequestCard = ({ content, type }: CardProps) => {
  const [status, setStatus] = useState<string>(REQUEST_STATUS.CREATED);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const navigationItems =
    content === CONTENT_TYPE.CHANGE
      ? breadcrumbs.request.change.card
      : breadcrumbs.request.mapPoint.card;
  const title =
    content === CONTENT_TYPE.CHANGE ? `Заявка ${id}` : `Карточка объекта ${id}`;
  const actionButtonText =
    content === CONTENT_TYPE.CHANGE ? 'Редактировать объект' : 'Создать объект';

  const handleToEdit = () => {
    console.log(type);
    let path = '';
    if (content === CONTENT_TYPE.CHANGE)
      path = `/moderator/request/${content}/${id}/edit`;
    if (content === CONTENT_TYPE.MAP_POINT) path = `/moderator/request/${content}/create`;
    console.log(path);
    navigate(path);
  };

  return (
    <div>
      <Breadcrumb items={navigationItems} />

      <div className="flex justify-between items-start mt-5">
        <Title level={3}>{title}</Title>
        {status !== REQUEST_STATUS.IN_WORK && (
          <Button type="primary" onClick={() => setStatus(REQUEST_STATUS.IN_WORK)}>
            Взять в работу
          </Button>
        )}
      </div>

      <div className="flex flex-col rounded shadow p-5">
        {content === CONTENT_TYPE.CHANGE && <ChangeDescription data={change[0]} />}
        {content === CONTENT_TYPE.MAP_POINT && (
          <MapPointDescription data={mapPoints[0]} />
        )}

        {status === REQUEST_STATUS.IN_WORK && (
          <div className="flex justify-between gap-2.5 mt-10">
            <div className="flex gap-2.5">
              <Button type="primary">Принять</Button>
              <Button danger>Отправить в архив</Button>
              <Button onClick={() => setIsMessageModalOpen(true)}>
                Отправить сообщение пользователю
              </Button>
            </div>
            <Button type="primary" icon={<EditOutlined />} onClick={handleToEdit}>
              {actionButtonText}
            </Button>
          </div>
        )}
      </div>

      <MessageModal
        isOpened={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
      />
    </div>
  );
};
