import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { REQUEST_STATUS } from '../../enum/requestStatus';

export interface MapPointsDataType {
  key?: string;
  id: string;
  dateTime: string;
  status: string[];
  name: string;
  scale: string;
  subtype: string;
  errorType: string;
  type: string;
  city: string;
  region: string;
  desc: string;
  phone: string;
  email: string;
  lng: number;
  lat: number;
  photos: {
    id: string;
    src: string;
    main: boolean;
    rights: boolean;
    author: string;
  }[];
  icons?: {
    id: string;
    src: string;
    main: boolean;
    rights: boolean;
    author: string;
  }[];
}

const columns: ColumnsType<MapPointsDataType> = [
  {
    title: 'Дата / Время',
    dataIndex: 'dateTime',
    key: 'dateTime',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
    render: (_, { status }) => (
      <>
        {status.map((item) => {
          let color = '';
          switch (item) {
            case REQUEST_STATUS.CREATED:
              color = 'green';
              break;
            case REQUEST_STATUS.IN_WORK:
              color = 'blue';
              break;
            case REQUEST_STATUS.SOLVED:
              color = 'green';
              break;
            case REQUEST_STATUS.REJECTED:
              color = 'red';
              break;
            default:
              color = 'geekblue';
          }
          return (
            <Tag color={color} key={item}>
              {item}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Тип ошибки',
    dataIndex: 'errorType',
    key: 'errorType',
  },
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Регион',
    dataIndex: 'region',
    key: 'region',
  },
  {
    title: 'Тип',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
];

interface TableProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: MapPointsDataType[];
}

export const MapPointTable = ({ data, className }: TableProps) => {
  const navigate = useNavigate();

  return (
    <div className={className}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowClassName="cursor-pointer hover:text-primary"
        onRow={(record) => {
          return {
            onClick: () => navigate(`/moderator/request/map-point/${record.id}`),
          };
        }}
      />
    </div>
  );
};
