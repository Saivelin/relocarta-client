import { Button } from '../../../../components/Button/Button';
import { IconRoute, IconStar } from '../../../../components/Icons';
import { Image } from '../../../../components/Image/Image';
import { Tag } from '../../../../components/Tag/Tag';
import style from './Card.module.scss';
import cn from 'classnames';

type Props = {
  className?: string;
  title: string;
  text: string;
  tags: string[];
  rating: number;
  comments: number;
  imgUrl: string;
  onClickButton: () => void;
  onClickTitle: () => void;
};

export const Card: React.FC<Props> = ({
  className,
  imgUrl,
  title,
  text,
  tags,
  rating,
  comments,
  onClickButton,
  onClickTitle,
}) => {
  return (
    <div className={cn(style.card, className)}>
      <div className={cn(style.imageWrap)}>
        <Image src={imgUrl} className={cn(style.image)} />
        <Button
          onClick={onClickButton}
          shape="round"
          opacity
          className={style.button}
          icon={<IconRoute />}
        >
          Хочу туда!
        </Button>
      </div>

      {rating > 0 && (
        <div className={style.row}>
          <div className={style.rating}>
            <IconStar color="#FFD400" /> <span>{rating}</span>
          </div>
          <div className={style.comments}>{`${comments} отзывов`}</div>
        </div>
      )}

      <div className={cn(style.content)}>
        <div onClick={onClickTitle} className={style.title}>
          {title}
        </div>
        <div className={style.text}>{text}</div>
      </div>

      <div className={style.tags}>
        {tags
          .filter((t) => t)
          .map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
      </div>
    </div>
  );
};
