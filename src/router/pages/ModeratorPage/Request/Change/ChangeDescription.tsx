import { Descriptions, Image } from 'antd';
import { ChangeDataType } from './ChangeTable';

export const ChangeDescription = ({ data }: { data: ChangeDataType }) => {
  return (
    <>
      <Descriptions title="Описание заявки" column={2} size="small" className="mt-5">
        <Descriptions.Item label="Дата / Время">{data.dateTime}</Descriptions.Item>
        <Descriptions.Item label="Тип объекта">{data.type}</Descriptions.Item>
        <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
        <Descriptions.Item label="Название">{data.name}</Descriptions.Item>
        <Descriptions.Item label="Статус">{data.status[0]}</Descriptions.Item>
        <Descriptions.Item label="Регион">{data.region}</Descriptions.Item>
        <Descriptions.Item label="Тип ошибки">{data.errorType}</Descriptions.Item>
        <Descriptions.Item label="Город">{data.city}</Descriptions.Item>
        <Descriptions.Item label="" className="invisible">
          -
        </Descriptions.Item>
        <Descriptions.Item label="Подтип">{data.subtype}</Descriptions.Item>
      </Descriptions>

      <Descriptions title="Сообщение пользователя" bordered column={1} className="mt-5">
        <Descriptions.Item>{data.message}</Descriptions.Item>
      </Descriptions>

      <div className="grid grid-cols-3 gap-5 mt-5">
        {data.photos.map((photo) => (
          <div key={photo.id} className="rounded overflow-hidden w-full">
            <Image src={photo.src} className="rounded" />
          </div>
        ))}
      </div>
    </>
  );
};
