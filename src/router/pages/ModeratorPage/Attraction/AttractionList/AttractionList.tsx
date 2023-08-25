import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Input, Popover, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { breadcrumbs } from '../../constants/breadcrumbs';
import { AttractionTable } from './AttractionTable';
import { Key, useEffect, useState } from 'react';
import { Region, useGetRegionsQuery } from '../../../../../services/location';
import { Attraction, useGetAttractionsQuery } from '../../../../../services/attraction';
import { VscSettings } from 'react-icons/vsc';
import { AttractionFilter } from './AttractionFilter';

const { Title } = Typography;

export const RU_ID = '374a485d-aadc-4fe4-9e3f-abe53da05bdf';

export interface Filter {
  regionId: string;
  search: string;
  typeId: string;
  subtypeId: string;
  scaleId: string;
}

export interface RegionType {
  key: Key;
  region: string;
}

export const AttractionList = () => {
  const navigate = useNavigate();
  const [regionData, setRegionData] = useState<RegionType[]>([]);
  const [currentRegion, setCurrentRegion] = useState<string>('');
  const [filter, setFilter] = useState<Filter>({
    regionId: currentRegion,
    search: '',
    typeId: '',
    subtypeId: '',
    scaleId: '',
  });
  const { data: regions } = useGetRegionsQuery<Region[] | any>(RU_ID);
  const { data: attractions } = useGetAttractionsQuery<Attraction[] | any>(filter);

  useEffect(() => {
    const getRegionData = () => {
      if (regions?.items?.length) {
        const data = regions.items.map((i: Region) => ({
          key: i.id,
          region: i.name,
        }));

        setRegionData(data);
      }
    };

    getRegionData();
  }, [regions]);

  const setRegion = (region: string) => {
    setCurrentRegion(region);
    setFilter((filter: Filter) => ({ ...filter, regionId: region }));
  };

  const changeFilter = (field: string, value: string) => {
    setFilter((filter) => ({ ...filter, [field]: value }));
    console.log(filter);
  };

  const clearFilter = () => {
    setFilter({
      regionId: currentRegion,
      search: '',
      typeId: '',
      subtypeId: '',
      scaleId: '',
    });
  };

  return (
    <div>
      <Breadcrumb items={breadcrumbs.content.attraction.list} />

      <div className="flex justify-between items-center flex-wrap mt-4">
        <Title level={3}>Список аттракций</Title>

        <div className="flex gap-2 w-2/3 mb-2">
          <Input
            placeholder="Поиск по названию"
            prefix={<SearchOutlined />}
            value={filter.search}
            onChange={(e) =>
              setFilter((filter) => ({ ...filter, search: e.target.value }))
            }
          />

          <Popover
            placement="bottomRight"
            content={
              <AttractionFilter
                regions={regions}
                filter={filter}
                changeFilter={changeFilter}
                clearFilter={clearFilter}
              />
            }
          >
            <Button
              type="primary"
              ghost
              icon={<VscSettings className="rotate-90" />}
              className="flex justify-center items-center min-w-[32px]"
            />
          </Popover>

          <Button
            type="primary"
            ghost
            icon={<PlusOutlined />}
            className="flex items-center"
            onClick={() => navigate('create')}
          >
            Создать объект
          </Button>
        </div>
      </div>

      <AttractionTable
        className="mt-2"
        regions={regionData}
        currentRegion={currentRegion}
        setRegion={setRegion}
        attractions={attractions}
      />
    </div>
  );
};
