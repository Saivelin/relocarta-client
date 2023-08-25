import { Button } from '../../../../components/Button/Button';
import { IconArrowRight } from '../../../../components/Icons';
import { Image, ImageHeight } from '../../../../components/Image/Image';
import style from './CardRow.module.scss';
import cn from 'classnames';

type Props = {
  className?: string;
  title: string;
  text: string;
  buttonLabel: string;
  onClick?: () => void;
  imgUrl?: string;
  href?: string;
};

export const CardRow: React.FC<Props> = ({
  className,
  onClick,
  imgUrl,
  title,
  text,
  buttonLabel,
  href,
}) => {
  return (
    <div className={cn(style.card, className)}>
      <Image src={imgUrl} height={'132'} className={style.imgContainer} />

      <div className={cn(style.content)}>
        <h3 className={style.title}>{title}</h3>
        <div className={style.text}>{text}</div>

        <Button
          className={style.button}
          href={href}
          noBorder
          shape="round"
          orange
          onClick={onClick}
        >
          {buttonLabel} <IconArrowRight />
        </Button>
      </div>
    </div>
  );
};
