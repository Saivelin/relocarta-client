import style from './Card.module.scss';
import cn from 'classnames';

type Props = {
  className?: string;
  title: string;
  text: string;
  onClick?: () => void;
  imgUrl?: string;
  renderButton?: React.ReactNode;
  renderImg?: React.ReactNode;
  column?: boolean;
};

export const Card: React.FC<Props> = ({
  className,
  imgUrl,
  title,
  text,
  renderButton,
  renderImg,
  column = false,
}) => {
  return (
    <div className={cn(style.card, { [style.cardCol]: column }, className)}>
      <div className={cn(style.image)}>
        {renderImg || <img src={imgUrl} alt={'img'} />}
      </div>

      <div className={cn(style.content)}>
        <h3 className={style.title}>{title}</h3>
        <div className={style.text}>{text}</div>

        {renderButton && <div className={cn(style.button)}>{renderButton}</div>}
      </div>
      {renderButton && <div className={style.overlay}></div>}
    </div>
  );
};
