import { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import {
  Breadcrumb,
  ConfigProvider,
  DatePicker,
  DatePickerProps,
  Input,
  Radio,
  RadioChangeEvent,
  Typography,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import 'dayjs/locale/ru';
import locale from 'antd/locale/ru_RU';
import { CONTENT_TYPE } from '../enum/contentType';
import { ChangeTable } from './Change/ChangeTable';
import { MapPointTable } from './MapPoint/MapPointTable';
import { breadcrumbs } from '../constants/breadcrumbs';
import { mapPoints } from '../data/mapPoints';
import { change } from '../data/change';

const { Title } = Typography;

type TabPosition = 'new' | 'archive';

interface ListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  content?: CONTENT_TYPE;
}

export const RequestList = ({ content }: ListProps) => {
  const [correctionType, setCorrectionType] = useState<TabPosition>('new');

  const navigationItems =
    content === CONTENT_TYPE.CHANGE
      ? breadcrumbs.request.change.list
      : breadcrumbs.request.mapPoint.list;
  const title = content === CONTENT_TYPE.CHANGE ? 'Корректировки' : 'Объекты на карте';

  const handleCorrectionTypeChange = (e: RadioChangeEvent) => {
    setCorrectionType(e.target.value);
  };

  const onChangeMonth: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div>
      <Breadcrumb items={navigationItems} />

      <div className="flex justify-between items-center flex-wrap mt-4">
        <Title level={3}>{title}</Title>

        <div className="flex gap-2 w-2/3 mb-2">
          <Input placeholder="Поиск" prefix={<SearchOutlined />} />

          <Radio.Group
            onChange={handleCorrectionTypeChange}
            value={correctionType}
            className="flex"
          >
            <Radio.Button value="new">Новые</Radio.Button>
            <Radio.Button value="archive">Архив</Radio.Button>
          </Radio.Group>
        </div>

        {correctionType === 'archive' && (
          <div className="flex w-full justify-end items-center gap-2.5">
            <p>Данные за</p>
            <ConfigProvider locale={locale}>
              <DatePicker onChange={onChangeMonth} picker="month" />
            </ConfigProvider>
          </div>
        )}
      </div>

      {content === CONTENT_TYPE.CHANGE && <ChangeTable data={change} className="mt-2" />}
      {content === CONTENT_TYPE.MAP_POINT && (
        <MapPointTable data={mapPoints} className="mt-2" />
      )}
    </div>
  );
};
