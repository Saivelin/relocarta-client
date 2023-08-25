import style from './MainPage.module.scss';
import { useGetUniquePlacesQuery } from '../../../services/places';
import { Col, Input, Row } from 'antd';
import { TitleLine } from '../../../components/TitleLine/TitleLine';
import { randomInteger } from '../../../helpers/utils';
import { Link, useNavigate } from 'react-router-dom';
import {
  useAddRoute,
  useNavigateExtraordinaryPage,
  useNavigatePlacePage,
} from '../../../hooks/useNavigatePage';
import { CardColumn } from './CardColumn/CardColumn';
import { CardRow } from './CardRow/CardRow';
import { CardRowBig } from './CardRowBig/CardRowBig';
import { MapWithSearch } from '../../../features/MapWithSearch/MapWithSearch';
import { ROUTE } from '../../../constants/route';
import { formatRegionAndCity } from '../../../helpers/format';

export const MainPage = () => {
  const { data: extraPlaces = { items: [] } } = useGetUniquePlacesQuery();
  const num = randomInteger(6, extraPlaces.items.length - 6);
  const extraPlacesCompressed = extraPlaces.items.slice(num, num + 6);
  const { navigateToPlacePage } = useNavigatePlacePage();
  const { navigateToExtraordinaryPage } = useNavigateExtraordinaryPage();
  const navigate = useNavigate();
  const { addRoute } = useAddRoute();

  return (
    <div className={style.page}>
      <TitleLine
        title="Открывай"
        subtitle="Исследуй карту, находи удивительные остановки на своем пути"
        className={style.title}
      />

      <MapWithSearch />

      <div className={style.advice}>
        Не знаешь, куда поехать? <Link to="/map">Cмотри места на карте!</Link>
      </div>

      <TitleLine
        right
        green
        title="Вдохновляйся"
        subtitle="Чувствуй себя по-новому в уникальных местах нашей страны"
        className={style.title}
      />

      <div className={style.extraordinary}>
        <Row gutter={[24, 24]}>
          {extraPlacesCompressed.map(
            ({ id, lng, lat, name, region, city, poiType, image }) => (
              <Col key={id} span={24} md={12} lg={8}>
                <CardColumn
                  title={name}
                  text={formatRegionAndCity(region.name, city.name)}
                  imgUrl={image}
                  className={style.placeCard}
                  onClickTitle={() => {
                    navigateToPlacePage({
                      id,
                      region: region.nameEn,
                      type: poiType.nameEn,
                    });
                  }}
                  onClick={() => {
                    addRoute({
                      coordinates: [lng, lat],
                      data: {
                        name,
                        city_name: name || '',
                        region_name: region.name,
                        icon_link: image,
                        photo_link: image,
                      },
                    });
                  }}
                />
              </Col>
            ),
          )}
        </Row>
      </div>

      <div className={style.advice}>
        Хочешь увидеть больше? <Link to="/map">Исследуй карту!</Link>
      </div>

      <TitleLine
        orange
        title="Путешествуй"
        subtitle="Преврати свою поездку в приключение с экосистемой Новитревел"
        className={style.title}
      />

      <div className={style.cardMap}>
        <CardRowBig
          title="Интерактивная карта"
          text="Открывай новые места на карте, самостоятельно планируй маршрут, выбирай отель, туристические услуги и развлечения"
          imgUrl="/images/main/map.png"
          buttonLabel="Исследовать карту"
          onClick={() => navigate('/map')}
        />
      </div>

      <div className={style.center}>
        <Row gutter={[24, 24]}>
          <Col span={24} lg={12}>
            <CardRow
              title="Уникальные места"
              text="Наша коллекция необычных мест выведет ваше путешествие на новый уровень. Испытай удивительные ощущения в уникальных местах страны"
              imgUrl="/images/main/1.png"
              buttonLabel="Перейти"
              onClick={() => navigateToExtraordinaryPage()}
            />
          </Col>
          <Col span={24} lg={12}>
            <CardRow
              title="Мероприятия"
              text="Не пропусти крупные туристические события страны. Стань частью большого праздника!"
              imgUrl="/images/main/2.png"
              buttonLabel="Перейти"
              onClick={() => navigateToExtraordinaryPage({ poi_type: ['tour-event'] })}
            />
          </Col>
          <Col span={24} lg={12}>
            <CardRow
              href="https://hotels.novitravel.ru/"
              title="Отели и размещение"
              text="Коллекция Новитревел насчитывает 25000 отелей. Забронируй отель без наценок и скрытых доплат"
              imgUrl="/images/main/3.png"
              buttonLabel="Перейти"
            />
          </Col>
          <Col span={24} lg={12}>
            <CardRow
              title="Туристические услуги"
              text="Находи и бронируй экскурсии, сплавы по горным рекам, полёт на вертолёте"
              imgUrl="/images/main/4.png"
              buttonLabel="Перейти"
              onClick={() => navigateToExtraordinaryPage({ poi_type: ['tour-service'] })}
            />
          </Col>
          <Col span={24} lg={12}>
            <CardRow
              title="Рестораны"
              text="Новитревел выбирает лучшие рестораны, чтобы порадовать путешественника качественной едой и особой атмосферой"
              imgUrl="/images/main/5.png"
              buttonLabel="Перейти"
              onClick={() => navigateToExtraordinaryPage({ poi_type: ['restaurant'] })}
            />
          </Col>
          <Col span={24} lg={12}>
            <CardRow
              title="Тревел истории"
              text="Вдохновляйся реальными историями путешествий и рассказывай о своих путешествиях другим"
              imgUrl="/images/main/6.png"
              buttonLabel="Перейти"
              onClick={() => navigate(ROUTE.STORIES)}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};
