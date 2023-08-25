import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';
import { Attraction } from '../../../../../services/attraction';
import { RegionType } from './AttractionList';

interface TableProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  regions: RegionType[];
  attractions: Attraction[];
  currentRegion: string;
  setRegion: (region: string) => void;
}

export const AttractionTable = ({
  regions,
  currentRegion,
  setRegion,
  attractions,
  className,
}: TableProps) => {
  const navigate = useNavigate();

  const cols = ['Название', 'Город', 'Подтип', 'Масштаб', 'ID'];

  return (
    <div className={className}>
      <div className="flex flex-col w-full">
        <div className="bg-gray-50 font-semibold py-3 px-12 border-bottom-gray">
          Регион
        </div>

        {regions &&
          regions.map((region: any) => (
            <div key={region.key}>
              <div
                className="flex py-3 px-5 border-bottom-gray gap-5 cursor-pointer hover:text-primary hover:bg-gray-50"
                onClick={() => {
                  currentRegion !== region.key ? setRegion(region.key) : setRegion('');
                }}
              >
                <span>{currentRegion === region.key ? '-' : '+'}</span>
                <div>{region.region}</div>
              </div>

              {currentRegion === region.key && attractions?.length > 0 && (
                <div className="flex flex-col">
                  <div className="grid grid-cols-5 w-full">
                    {cols.map((col) => (
                      <div
                        key={col}
                        className="py-3 px-5 flex font-semibold bg-gray-50 border-bottom-gray"
                      >
                        {col}
                      </div>
                    ))}
                  </div>

                  {attractions.map((attraction: Attraction | any) => (
                    <div
                      key={attraction.id}
                      className="grid grid-cols-5 w-full cursor-pointer hover:text-primary hover:bg-gray-50"
                      onClick={() =>
                        navigate(`/moderator/content/attraction/${attraction.id}`)
                      }
                    >
                      <div className="py-3 px-5 flex items-center border-bottom-gray ">
                        {attraction.name}
                      </div>
                      <div className="py-3 px-5 flex items-center border-bottom-gray">
                        {attraction.city.name}
                      </div>
                      <div className="py-3 px-5 flex items-center border-bottom-gray">
                        {attraction.subtype.name}
                      </div>
                      <div className="py-3 px-5 flex items-center border-bottom-gray">
                        {attraction.scale.name}
                      </div>
                      <div className="py-3 px-5 flex items-center border-bottom-gray ">
                        {attraction.id}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {currentRegion === region.key && attractions?.length === 0 && (
                <div className="py-3 px-5">Нет аттракций</div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
