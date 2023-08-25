import style from './ExtraordinaryPage.module.scss';
import { Col, Input, Row, Pagination } from 'antd';
import React, { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TitleLine } from '../../../components/TitleLine/TitleLine';
import { IconGeo, IconSearch } from '../../../components/Icons';
import { useGetPoiListQuery, useGetRegionsQuery } from '../../../services/poi';
import { useGetUniqPlacesQuery } from '../../../services/uniqPlaces';
import { Card } from './Card/Card';
import { debounce, groupBy } from '../../../helpers/utils';
import { Button } from '../../../components/Button/Button';
import { useAddRoute, useNavigatePlacePage } from '../../../hooks/useNavigatePage';
import { RouteItem } from '../../../types/map';
import { getPaginationQueryParams } from '../../../helpers/queries';
import { formatRegionAndCity } from '../../../helpers/format';
import { MultipleSelect } from '../../../components/MultipleSelect/MultipleSelect';

export type UniqPlacesQueryParams = {
  poi_type?: string[];
  region?: string[];
  search?: string;
  p?: string;
};

const ExtraordinaryPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const poi_type = searchParams.getAll('poi_type');
  const region = searchParams.getAll('region');
  const p = searchParams.get('p') || '1';

  const { navigateToPlacePage } = useNavigatePlacePage();
  const { addRoute } = useAddRoute();

  const [queryParams, setParams] = useState<UniqPlacesQueryParams>({
    poi_type,
    region,
    search,
    p,
  });

  const { data: uniqPlaces = { items: [], total: 0 } } = useGetUniqPlacesQuery({
    poiTypes: queryParams.poi_type,
    regions: queryParams.region,
    search: queryParams.search,
    ...getPaginationQueryParams(queryParams.p),
  });

  const setQueryParams = (param = queryParams) => {
    setSearchParams({
      ...param,
      search: param.search ? [param.search] : [],
    });

    setParams({ ...param });
  };

  const setQueryParamsWithDalay = useCallback(debounce(setQueryParams, 400), []);

  const { data: poiData = { items: [] } } = useGetPoiListQuery();
  const { data: regionsData = { items: [] } } = useGetRegionsQuery();

  const poiOptions = poiData.items.map((item) => ({
    value: item.nameEn,
    label: item.name,
  }));

  const handleChangePoiTypes = (value: string[][]) => {
    setQueryParams({
      ...queryParams,
      poi_type: value.flat(),
      p: '1',
    });
  };

  const regionOptions = regionsData.items
    .filter((item) => item.name)
    .map((item) => ({
      value: item.nameEn,
      label: item.name,
    }));

  const handleChangeRegions = (value: string[][]) => {
    setQueryParams({
      ...queryParams,
      region: value.flat(),
      p: '1',
    });
  };

  const groupedByRegion = Object.entries(groupBy(uniqPlaces.items, (i) => i.region.name));

  const groupByCountAndReigion = groupBy(groupedByRegion, (i) => i[1].length);
  const groups = Object.entries(groupByCountAndReigion);

  const oneInRow = groups
    .filter(([length]) => length === '1')
    .map(([, value]) => value)
    .flat(1)
    .map(([, item]) => item)
    .flat();

  const manyInRow = groups
    .filter(([length]) => length !== '1')
    .map(([, value]) => value)
    .flat(1);

  const [inputValue, setInputValue] = useState(queryParams.search);

  const onClickReset = () => {
    setQueryParams({ p: '1' });

    setInputValue('');
  };

  return (
    <div className={style.page}>
      <div className={style.header}>
        <TitleLine
          center={true}
          title="Уникальные места"
          subtitle="Чувствуй себя по-новому в уникальных местах нашей страны"
        />
        <div className={style.center}>
          <div className={style.search}>
            <Input
              value={inputValue}
              allowClear
              onChange={(e) => {
                setInputValue(e.target.value);

                setQueryParamsWithDalay({
                  ...queryParams,
                  search: e.target.value,
                  p: '1',
                });
              }}
              prefix={<IconSearch />}
              className={style.input}
              placeholder="Поиск впечатлений"
              size="large"
            />
          </div>

          <div className={style.filters}>
            <MultipleSelect
              label="Вид объекта:"
              placeholder="Все объекты"
              value={poi_type}
              options={poiOptions}
              onChange={handleChangePoiTypes}
              className={style.select}
            />
            <MultipleSelect
              label="Регион:"
              placeholder="Все регионы"
              value={region}
              options={regionOptions}
              onChange={handleChangeRegions}
              className={style.select}
            />

            <Button onClick={onClickReset} gray className={style.deleteButton}>
              Сбросить
            </Button>
          </div>
        </div>
      </div>
      <div className={style.count}>Найдено: {uniqPlaces.total}</div>

      <div className={style.cards}>
        {manyInRow.map(([region, data]) => {
          return (
            <div key={region} className={style.group}>
              <div className={style.region}>
                <IconGeo size={20} />
                <div className={style.regionName}>
                  {region}: {data.length}
                </div>
              </div>
              <Row gutter={[16, 16]}>
                {data.map(
                  ({
                    name,
                    image,
                    type,
                    subtype,
                    rateCount,
                    rateAverage,
                    poiType,
                    region,
                    id,
                    lng,
                    lat,
                    scale,
                    city,
                  }) => {
                    const route: RouteItem = {
                      coordinates: [lng, lat],
                      data: {
                        name,
                        city_name: name || '',
                        region_name: region.name,
                        icon_link: image,
                        photo_link: image,
                      },
                    };

                    return (
                      <Col key={name} span={24} md={12}>
                        <Card
                          onClickTitle={() =>
                            navigateToPlacePage({
                              id,
                              region: region.nameEn,
                              type: poiType.nameEn,
                            })
                          }
                          onClickButton={() => addRoute(route)}
                          title={name}
                          text={formatRegionAndCity(region.name, city.name)}
                          tags={[...new Set([poiType.name, scale.name, type, subtype])]}
                          imgUrl={image}
                          rating={rateAverage || 0}
                          comments={rateCount}
                        />
                      </Col>
                    );
                  },
                )}
              </Row>
            </div>
          );
        })}
        <Row gutter={[16, 16]}>
          {oneInRow.map(
            ({
              name,
              image,
              type,
              subtype,
              rateCount,
              rateAverage,
              poiType,
              region,
              id,
              lng,
              lat,
              scale,
              city,
            }) => {
              const route: RouteItem = {
                coordinates: [lng, lat],
                data: {
                  name,
                  city_name: name || '',
                  region_name: region.name,
                  icon_link: image,
                  photo_link: image,
                },
              };

              return (
                <Col key={id} span={24} md={12}>
                  <div className={style.group}>
                    <div className={style.region}>
                      <IconGeo size={20} />
                      <div className={style.regionName}>{region.name}</div>
                    </div>
                    <Card
                      onClickTitle={() =>
                        navigateToPlacePage({
                          id,
                          region: region.nameEn,
                          type: poiType.nameEn,
                        })
                      }
                      onClickButton={() => addRoute(route)}
                      title={name}
                      text={formatRegionAndCity(region.name, city.name)}
                      tags={[...new Set([poiType.name, scale.name, type, subtype])]}
                      imgUrl={image}
                      rating={rateAverage || 0}
                      comments={rateCount}
                    />
                  </div>
                </Col>
              );
            },
          )}
        </Row>
      </div>
      {uniqPlaces.total > 6 && (
        <div className={style.center}>
          <Pagination
            className={style.pagination}
            current={Number(queryParams.p)}
            defaultCurrent={1}
            total={uniqPlaces.total}
            showSizeChanger={false}
            defaultPageSize={6}
            onChange={(page) => {
              setQueryParams({
                ...queryParams,
                p: String(page),
              });

              window.scrollTo({
                top: 420,
                behavior: 'smooth',
              });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ExtraordinaryPage;
