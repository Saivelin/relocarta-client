import { Button } from '../../../../components/Button/Button';
import { IconArrowRight } from '../../../../components/Icons';
import { Image } from '../../../../components/Image/Image';
import style from './CardColumn.module.scss';
import cn from 'classnames';

type Props = {
  className?: string;
  title: string;
  text: string;
  onClick?: () => void;
  onClickTitle?: () => void;
  imgUrl?: string;
};

export const CardColumn: React.FC<Props> = ({
  className,
  imgUrl,
  title,
  text,
  onClickTitle,
  onClick,
}) => {
  return (
    <div className={cn(style.card, className)}>
      <Image src={imgUrl} height="200" />

      <div className={cn(style.content)}>
        <div onClick={onClickTitle} className={style.title}>
          {title}
        </div>
        <div className={style.text}>{text}</div>
      </div>

      <div className={style.bottom}>
        <Button noBorder green shape="round" onClick={onClick}>
          Построить маршрут <IconArrowRight />
        </Button>
      </div>
    </div>
  );
};
