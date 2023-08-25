import { FC, useState } from 'react';
import style from './Search.module.scss';
import { AutoComplete, Input } from 'antd';
import { IconSearch } from '../../../components/Icons';
import { useDebounce } from '../../../hooks/useDebounce';
import { useGetUniqPlacesQuery } from '../../../services/uniqPlaces';
import { UniquePlacesResponse } from '../../../services/places';
import { Image } from '../../../components/Image/Image';
import { formatRegionAndCity } from '../../../helpers/format';
import cn from 'classnames';

type Props = {
  isOpen: boolean;
  setViewState: React.Dispatch<
    React.SetStateAction<{
      longitude: number;
      latitude: number;
      zoom: number;
    }>
  >;
  setSearchViewViewState: React.Dispatch<
    React.SetStateAction<{
      longitude: number;
      latitude: number;
      zoom: number;
    } | null>
  >;
};

const renderResult = (result: UniquePlacesResponse['items'][number]) => {
  return (
    <div className={style.item}>
      <Image className={style.img} src={result.image} />

      <div>
        <div className={style.name}>{result.name}</div>

        <div className={style.description}>
          {formatRegionAndCity(result.region.name, result.city.name)}
        </div>
      </div>
    </div>
  );
};

export const Search: FC<Props> = ({ isOpen, setViewState, setSearchViewViewState }) => {
  const [value, setValue] = useState('');
  const [debouncedSearch, setSearchWithDalay, setSearch] = useDebounce('', 400);
  const { data: uniqPlaces = { items: [], total: 0 } } = useGetUniqPlacesQuery({
    search: debouncedSearch,
  });

  const options = uniqPlaces.items.map((item) => ({
    value: item.name,
    label: renderResult(item),
    viewState: {
      longitude: item.lng,
      latitude: item.lat,
      zoom: 10,
    },
  }));

  const onChange = (value: string) => {
    setValue(value);
    setSearchWithDalay(value);
  };
  return (
    <div className={cn(style.search, { [style.active]: isOpen })}>
      <AutoComplete
        className={style.input}
        options={options}
        allowClear
        onClear={() => {
          const viewState = {
            longitude: 47,
            latitude: 56,
            zoom: 4,
          };
          setViewState(viewState);
          setSearchViewViewState(viewState);
          setSearch('');
        }}
        value={value}
        onChange={onChange}
        onSelect={(id, { viewState }) => {
          setViewState(viewState);
          setSearchViewViewState(viewState);
        }}
      >
        <Input
          //allowClear={{ clearIcon: 'awd' }}
          prefix={<IconSearch />}
          placeholder="Поиск впечатлений"
          size="large"
        />
      </AutoComplete>
    </div>
  );
};
