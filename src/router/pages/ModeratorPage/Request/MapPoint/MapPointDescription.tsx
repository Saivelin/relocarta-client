import { Descriptions, Image } from 'antd';
import { MapPointsDataType } from './MapPointTable';

export const MapPointDescription = ({ data }: { data: MapPointsDataType }) => {
  return (
    <>
      <Descriptions title="Объект" column={2} size="small" className="mt-5">
        <Descriptions.Item label="Дата / Время">{data.dateTime}</Descriptions.Item>
        <Descriptions.Item label="Название">{data.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
        <Descriptions.Item label="Регион">{data.region}</Descriptions.Item>
        <Descriptions.Item label="Статус">{data.status[0]}</Descriptions.Item>
        <Descriptions.Item label="Город">{data.city}</Descriptions.Item>
        <Descriptions.Item label="Тип ошибки">{data.errorType}</Descriptions.Item>
        <Descriptions.Item label="Координаты">{`N${data.lat}, E${data.lng}`}</Descriptions.Item>
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
