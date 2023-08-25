import React from 'react';
import style from './TitleLine.module.scss';
import cn from 'classnames';

type Props = {
  right?: boolean;
  center?: boolean;
  green?: boolean;
  orange?: boolean;
  title: string;
  subtitle: string;
  className?: string;
};

export const TitleLine: React.FC<Props> = ({
  title,
  subtitle,
  right = false,
  center = false,
  green = false,
  orange = false,
  className,
}) => {
  const titleClassNames = cn(style.title, {
    [style.right]: right,
    [style.green]: green,
    [style.orange]: orange,
    [style.opacity]: center,
  });

  const lineClassNames = {
    [style.greenLine]: green,
    [style.orangeLine]: orange,
    [style.center]: center,
  };

  return (
    <div className={className}>
      <div className={cn(style.wrap, lineClassNames)}>
        <div className={titleClassNames}>{title}</div>
      </div>
      <div
        className={cn(style.subtitle, {
          [style.textRight]: !right,
          [style.textCenter]: center,
        })}
      >
        {subtitle}
      </div>
    </div>
  );
};
