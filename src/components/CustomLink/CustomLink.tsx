import { Link, useMatch } from 'react-router-dom';

interface CustomLinkProps {
  children: React.ReactNode | React.ReactNode[];
  to: string | { pathname: string };
  handleClick?: () => void;
  blank?: boolean;
}

const CustomLink: React.FC<CustomLinkProps> = ({
  children,
  to,
  handleClick = () => null,
  blank = false,
}) => {
  const match = useMatch(to + '/*');

  return (
    <Link
      to={to}
      style={{
        lineHeight: '25px',
        padding: '4px 12px',
        borderRadius: '23px',
        //backgroundColor: match ? '#248742' : '',
        color: match ? '#248742' : 'rgba(0, 32, 51, 0.6)',
        fontWeight: match ? '500' : 400,
      }}
      onClick={handleClick}
      target={blank ? '_blank' : '_self'}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
