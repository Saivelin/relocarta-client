interface TitlePropsType {
  content: string;
  underline?: string;
  underlineHeight?: number;
  size?: number;
  width?: string | number;
  color?: string;
  offset?: number;
}

const TitlePage: React.FC<TitlePropsType> = ({
  content,
  underline = '',
  underlineHeight = 5,
  size = 48,
  width = '100%',
  color = 'black',
  offset = 0,
}) => {
  const foo = (
    content: string,
    underline: string,
    underlineHeight: number,
    color: string,
    offset: number,
  ) => {
    if (!underline.trim()) return content;

    if (content.indexOf(underline) === -1) return content;

    let restPiece: string[] = [];
    const start = content.indexOf(underline);
    const end = content.indexOf(underline) + underline.length;
    const underlinedPiece = [...content].slice(start, end).join('');
    if (start === 0) {
      restPiece = [...content].slice(end);
    } else if (end === content.length) {
      restPiece = [...content].slice(0, start);
    } else {
      restPiece = [[...content].slice(0, start).join('')].concat([
        [...content].slice(end, content.length).join(''),
      ]);
    }

    if (start === 0) {
      return (
        <span>
          <span
            style={{
              zIndex: '0',
              position: 'relative',
              fontSize: `${size}px`,
              fontFamily: "'Shantell Sans', cursive",
              textAlign: 'center',
              margin: '0 auto 56px auto',
              fontWeight: 500,
              maxWidth: `${width === '100%' ? width : `${width}px`}`,
            }}
          >
            {underlinedPiece}
            <div
              style={{
                zIndex: '-1',
                position: 'absolute',
                height: `${underlineHeight}px`,
                width: '100%',
                bottom: `${offset}px`,
                left: '0',
                borderRadius: '100px',
                backgroundColor: color,
              }}
            ></div>
          </span>
          {restPiece.join('')}
        </span>
      );
    } else if (end === content.length) {
      return (
        <span>
          {restPiece.join('')}
          <span
            style={{
              zIndex: '0',
              position: 'relative',
              fontSize: `${size}px`,
              fontFamily: "'Shantell Sans', cursive",
              textAlign: 'center',
              margin: '0 auto 56px auto',
              fontWeight: 500,
              maxWidth: `${width === '100%' ? width : `${width}px`}`,
            }}
          >
            {underlinedPiece}
            <div
              style={{
                zIndex: '-1',
                position: 'absolute',
                height: `${underlineHeight}px`,
                width: '100%',
                bottom: `${offset}px`,
                left: '0',
                borderRadius: '113px',
                backgroundColor: color,
              }}
            ></div>
          </span>
        </span>
      );
    } else {
      return (
        <span>
          {restPiece[0]}
          <span
            style={{
              zIndex: '0',
              position: 'relative',
              fontSize: `${size}px`,
              fontFamily: "'Shantell Sans', cursive",
              textAlign: 'center',
              margin: '0 auto 56px auto',
              fontWeight: 500,
              maxWidth: `${width === '100%' ? width : `${width}px`}`,
            }}
          >
            {underlinedPiece}
            <div
              style={{
                zIndex: '-1',
                position: 'absolute',
                height: `${underlineHeight}px`,
                width: '100%',
                bottom: `${offset}px`,
                left: '0',
                borderRadius: '113px',
                backgroundColor: color,
              }}
            ></div>
          </span>
          {restPiece[1]}
        </span>
      );
    }
  };

  const title = foo(content, underline, underlineHeight, color, offset);

  return (
    <h2
      style={{
        fontSize: `${size}px`,
        fontFamily: "'Shantell Sans', cursive",
        textAlign: 'center',
        margin: '0 auto 56px auto',
        fontWeight: 500,
        maxWidth: `${width === '100%' ? width : `${width}px`}`,
      }}
    >
      {title}
    </h2>
  );
};

export default TitlePage;
