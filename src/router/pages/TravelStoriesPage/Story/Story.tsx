import * as React from 'react';
import { shuffle } from '../../../../data/ratio';
import style from './Story.module.scss';
import { Link, useParams } from 'react-router-dom';
import { dateParse, getAge } from '../TravelStoriesPage';
import stories from '../../../../data/stories.json';
import { Carousel } from 'antd';
import { ROUTE } from '../../../../constants/route';

const colorsFrame = ['#991E66', '#71C5E8', '#EF3340', '#248742', '#991E66'];

type StoryType = {
  story_id: number;
  name: string;
  name_full: string;
  distance: number;
  distance_unit: string;
  duration: number;
  duration_unit: string;
  user_id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  avatar_link: string;
  start_point: string;
  date_created: string;
  date_modified: string;
  date_published: string;
  date_travel: string;
  story_poi: string[];
  route_id: number;
  vehicle: string[];
  story_сontent: {
    part: number;
    subtitle?: string;
    text: string;
    photo_link: string[];
  }[];
};

const contentStyle: React.CSSProperties = {
  maxWidth: '970px',
  height: '540px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const Story: React.FC = () => {
  const { id } = useParams();

  const [story, setStory] = React.useState<StoryType | undefined>(undefined);

  const shuffledColorsFrame = shuffle(colorsFrame);

  React.useLayoutEffect(() => {
    if (!id) {
      setStory(stories.find((el) => el.story_id === 1));
      return;
    }

    setStory(stories.find((el) => el.story_id === Number(id)));
  }, [id]);

  if (!story) return null;

  return (
    <div className={style.travelstories}>
      <div className={style.header}>
        <div className={style.container}>
          <div className={style.header__date}>{dateParse(story?.date_created)}</div>
          <h2 className={style.header__title}>{story?.name_full}</h2>
        </div>
      </div>
      <div className={style.content}>
        <div className={style.container}>
          <div className={style.user__wrapper}>
            <div className={style.user__avatar}>
              <img src={`/images${story?.avatar_link}`} alt="avatar" />
            </div>
            <div className={style.user__info}>
              <div className={style.info__item}>
                <div className={style.info__item_title}>Путешественник</div>
                <div className={style.info__item_text}>
                  {story?.first_name || ''} {story?.last_name || ''},{' '}
                  {getAge(story?.date_of_birth)}
                </div>
              </div>

              <div className={style.info__item}>
                <div className={style.info__item_title}>Старт маршрута</div>
                <div className={style.info__item_text}>{story?.start_point}</div>
              </div>
              <div className={style.info__item}>
                <div className={style.info__item_title}>Посещены места</div>
                <div className={style.info__item_text}>
                  {story?.story_poi.map((el, i) => (
                    <div key={i}>{el}</div>
                  ))}
                </div>
              </div>
              <div className={style.info__item}>
                <div className={style.info__item_title}>Продолжительность</div>
                <div className={style.info__item_text}>
                  {story?.duration} {story?.duration_unit}, {story?.distance}{' '}
                  {story?.distance_unit}
                </div>
              </div>
              <div className={style.info__item}>
                <div className={style.info__item_title}>Транспортное средство</div>
                <div className={style.info__item_text}>
                  {story?.vehicle.map((el, i) => (
                    <div key={i}>{el}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={style.stories__items}>
            {story?.story_сontent.map((el, i) => (
              <div key={el.part} className={style.stories__item}>
                {el.subtitle && <h2 className={style.story__title}>{el.subtitle}</h2>}
                <div className={style.story__text}>{el.text}</div>
                <div className={style.story__image_wrapper}>
                  <div className={style.frame__wrapper}>
                    <div className={style.image__frame}>
                      <div
                        className={style.image__frame_before}
                        style={{ backgroundColor: `${shuffledColorsFrame[i]}` }}
                      ></div>
                    </div>
                    <svg
                      style={{ visibility: 'hidden', position: 'absolute' }}
                      width="0"
                      height="0"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                    >
                      <defs>
                        <filter id="border-radius">
                          <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation="15"
                            result="blur"
                          />
                          <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -9"
                            result="border-radius"
                          />
                          <feComposite
                            in="SourceGraphic"
                            in2="border-radius"
                            operator="atop"
                          />
                        </filter>
                      </defs>
                    </svg>
                    {el.photo_link.length === 1 ? (
                      <div className={style.story__image}>
                        <img src={`/images${el.photo_link[0]}`} alt="story_img" />
                      </div>
                    ) : (
                      <Carousel autoplay>
                        {el.photo_link.map((el, i) => {
                          return (
                            <div key={i} className={style.story__image}>
                              <img src={`/images${el}`} alt="story_img" />
                            </div>
                          );
                        })}
                      </Carousel>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={style.stories__item_ggwp}>
            <h2 className={style.story__title}>Маршрут</h2>
            <div
              className={style.story__image}
              style={{ maxWidth: '100%', position: 'relative' }}
            >
              <img
                src="https://novitravel.ru/img/int/usr/st/01/story-trip.jpg"
                alt="story_img"
              />

              <div className={style.route__info}>
                <div className={style.route__item}>
                  <div className={style.route__icon}>
                    <img src="/icons/route-time.svg" alt="route" />
                  </div>
                  <div className={style.route__value}>{`${story?.duration}:00`}</div>
                </div>

                <div className={style.route__item}>
                  <div className={style.route__icon}>
                    <img src="/icons/route-marker.svg" alt="route" />
                  </div>
                  <div className={style.route__value}>{story?.story_poi.length}</div>
                </div>

                <div className={style.route__item}>
                  <div className={style.route__icon}>
                    <img src="/icons/route-road.svg" alt="route" />
                  </div>
                  <div className={style.route__value}>
                    {story?.distance} {story?.distance_unit}
                  </div>
                </div>
              </div>

              <div className={style.route__logo}>
                <img src="/icons/route-logo.svg" alt="route-logo" />
              </div>
            </div>
          </div>

          <div className={style.stories__item}>
            <h2 className={style.story__title}>Другие тревел истории</h2>
            <div className={style.other_story__row}>
              {stories
                .filter((el) => el.story_id !== story?.story_id)
                .map((el) => (
                  <div key={el.story_id} className={style.other_story__card}>
                    <Link to={`${ROUTE.STORIES}/${el.story_id}`}>
                      <div className={style.other_story__img}>
                        <img
                          src={`/images${el.story_сontent[0].photo_link[0]}`}
                          alt="other_story__img"
                        />
                      </div>
                      <div className={style.other_story__user}>
                        <span>
                          {el.first_name} {el.last_name}
                        </span>
                        <div className={style.other_story__user_avatar}>
                          <img src={`/images${el.avatar_link}`} alt="avatar" />
                        </div>
                      </div>
                      <div className={style.other_story__date}>
                        {dateParse(el.date_created)}
                      </div>
                      <div className={style.other_story__wave}></div>
                      <div className={style.other_story__text}>{el.name_full}</div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
