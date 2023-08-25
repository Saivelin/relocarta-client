import { Image as ImageAntd } from 'antd';
import style from './Image.module.scss';
import cn from 'classnames';

export type ImageHeight = '200' | '222' | '132';

type Props = {
  className?: string;
  src?: string;
  height?: ImageHeight;
};

export const Image: React.FC<Props> = ({ className, src, height }) => {
  const heightClass = style[`h${height}`];
  return (
    <div className={cn(style.image, heightClass, className)}>
      <ImageAntd
        className={style.img}
        alt=" "
        src={src}
        width={'100%'}
        height={'100%'}
        preview={false}
        fallback="/images/plug-popup.png"
      />
    </div>
  );
};
