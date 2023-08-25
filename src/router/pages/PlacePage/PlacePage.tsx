import { Link, useParams } from 'react-router-dom';
import { useGetAttractionByIdQuery } from '../../../services/places';
import style from './PlacePage.module.scss';
import { Col, Row } from 'antd';
import { Button } from '../../../components/Button/Button';
import {
  IconAddLocation,
  IconCamera,
  IconComment,
  IconLike,
  IconRightChevron,
  IconShare,
} from '../../../components/Icons';
import { Paper } from '../../../components/Paper/Paper';
import { Tag } from '../../../components/Tag/Tag';
import { MapPlace } from './MapPlace';
import { Card } from '../../../components/Card/Card';
import { RouteItem } from '../../../types/map';
import { useNavigateToMapPage } from '../../../hooks/useNavigatePage';
import { formatRegionAndCity } from '../../../helpers/format';
import { ROUTE } from '../../../constants/route';
import { useOpenCloseToggle } from '../../../hooks/useOpenCloseToggle';
import { ReportInaccuraciesModal } from './Modal/ReportInaccuraciesModal';
import { DescriptionModal } from './Modal/DescriptionModal';

export const PlacePage = () => {
  const { id } = useParams();
  const { data } = useGetAttractionByIdQuery(id);
  const [isReport, openReport, closeReport] = useOpenCloseToggle(false);
  const [isDesc, openDesc, closeDesc] = useOpenCloseToggle(false);

  const route: RouteItem = {
    coordinates: data ? [data.lng, data.lat] : [0, 0],
    data: {
      name: data?.name || '',
      city_name: data?.city || '',
      region_name: data?.region || '',
      icon_link: data?.media[1]?.link || '',
      photo_link: data?.media[0]?.link || '',
    },
  };

  const { navigateToMapPage } = useNavigateToMapPage(route);

  if (!data) {
    return null;
  }

  const imgUrl = data.media[0]?.link;
  const viewBackground = imgUrl
    ? `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${imgUrl}")`
    : 'linear-gradient(to right, rgb(49,49,49), rgb(49,49,49))';

  const viewContainerBackground = imgUrl
    ? `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${imgUrl}")`
    : 'linear-gradient(to right, rgb(49,49,49), rgb(49,49,49))';

  const { type, subtype, scale, regionEn, poi_type_name, poiType } = data;
  const tags = [poi_type_name || poiType || '', scale, type, subtype];

  return (
    <>
      <div className={style.view} style={{ backgroundImage: viewBackground }}>
        <div
          className={style.view__container}
          style={{ backgroundImage: viewContainerBackground }}
        >
          {!imgUrl && (
            <div className={style.plug__wrapper}>
              <div className={style.plug__block}>
                <div className={style.plug__image}>
                  <img src="/icons/plug-place.svg" alt="plug-place" />
                </div>
                <p className={style.plug__text}>Фото отсутствует</p>
              </div>
            </div>
          )}

          <div className={style.body}>
            <div className={style.breadcrumbs}>
              <Link to="/map" replace={true}>
                Карта
              </Link>
              <IconRightChevron />
              <Link to={`${ROUTE.EXTRA}?region=${regionEn}`}>{data.region}</Link>
            </div>
            <div className={style.info__title}>{data.name}</div>
            <div className={style.info__location}>
              {formatRegionAndCity(data.region, data.city)}
            </div>
            {data.rateAverage && (
              <div className={style.rating}>
                <div className={style.count}>{data.rateAverage}</div>
                <div className={style.countText}>{data.rateCount} отзывов</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={style.panel}>
        <Button
          className={style.addRoute}
          shape="round"
          size="large"
          icon={<IconAddLocation />}
          onClick={() => navigateToMapPage(true)}
        >
          Добавить в маршрут
        </Button>

        <div className={style.smallButtons}>
          <Button clear shape="circle" size="large" icon={<IconLike />} />
          <Button clear shape="circle" size="large" icon={<IconCamera />} />
          <Button clear shape="circle" size="large" icon={<IconShare />} />
        </div>

        <Button
          className={style.error}
          clear
          shape="round"
          size="large"
          icon={<IconComment />}
          onClick={openReport}
        >
          Сообщить о неточности
        </Button>

        <Button
          className={style.errorMobile}
          clear
          shape="circle"
          size="large"
          icon={<IconComment />}
        ></Button>
      </div>

      <div className={style.row}>
        <Row gutter={[12, 16]} align={'stretch'}>
          <Col span={24} md={14} lg={16}>
            <Paper className={style.paper}>
              <div className={style.tags}>
                {tags.map((tagName) => (
                  <Tag key={tagName}>{tagName}</Tag>
                ))}
              </div>
              <div className={style.description}>{data?.description}</div>
              <span
                className="text-accent-light cursor-pointer mt-9 block"
                onClick={openDesc}
              >
                <u>Предложить свое описание?</u>
              </span>
            </Paper>
          </Col>
          <Col span={24} md={10} lg={8}>
            <Card
              column
              title={data.name}
              text={formatRegionAndCity(data.region, data.city)}
              renderImg={
                <MapPlace
                  longitude={data.lng}
                  latitude={data.lat}
                  onClick={() => navigateToMapPage(true)}
                />
              }
            />
          </Col>
        </Row>
      </div>

      {isReport && <ReportInaccuraciesModal data={data} onClose={closeReport} />}
      {isDesc && <DescriptionModal onClose={closeDesc} data={data} />}
    </>
  );
};
