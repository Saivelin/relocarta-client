import { Button, Select } from 'antd';
import {
  useGetAttractionScalesQuery,
  useGetAttractionSubtypesQuery,
  useGetAttractionTypesQuery,
} from '../../../../../services/attraction';
import { Filter } from './AttractionList';
import { Region } from '../../../../../services/location';

const { Option } = Select;

type Props = {
  filter: Filter;
  regions: Region[] | any;
  changeFilter: (fields: string, value: string) => void;
  clearFilter: () => void;
};

export const AttractionFilter = ({ regions, filter, changeFilter, clearFilter }: Props) => {
  const { data: scales } = useGetAttractionScalesQuery();
  const { data: types } = useGetAttractionTypesQuery();
  const { data: subtypes } = useGetAttractionSubtypesQuery(filter.typeId);

  return (
    <div className="p-1 flex flex-col gap-2 w-[240px]">
      <div>
        <p className="mb-1">Масштаб:</p>
        <Select
          placeholder="Выберите масштаб"
          className="w-full"
          value={filter.scaleId}
          onChange={(value) => changeFilter('scaleId', value)}
        >
          {scales &&
            scales.map((scale) => (
              <Option key={scale.id} value={scale.id}>
                {scale.name}
              </Option>
            ))}
        </Select>
      </div>

      <div>
        <p className="mb-1">Регион:</p>
        <Select
          placeholder="Выберите регион"
          className="w-full"
          value={filter.regionId}
          onChange={(value) => changeFilter('regionId', value)}
        >
          {regions?.items &&
            regions.items.map((region: any) => (
              <Option key={region.id} value={region.id}>
                {region.name}
              </Option>
            ))}
        </Select>
      </div>

      <div>
        <p className="mb-1">Тип:</p>
        <Select
          placeholder="Укажите тип"
          className="w-full"
          value={filter.typeId}
          onChange={(value) => changeFilter('typeId', value)}
        >
          {types &&
            types.map((type) => (
              <Option key={type.id} value={type.id}>
                {type.name}
              </Option>
            ))}
        </Select>
      </div>

      <div>
        <p className="mb-1">Подтип:</p>
        <Select
          placeholder="Укажите подтип"
          className="w-full"
          disabled={!filter.typeId}
          value={filter.subtypeId}
          onChange={(value) => changeFilter('subtypeId', value)}
        >
          {subtypes &&
            subtypes.map((type) => (
              <Option key={type.id} value={type.id}>
                {type.name}
              </Option>
            ))}
        </Select>
      </div>

      <div className="flex justify-end gap-2 mt-3 ">
        <Button onClick={clearFilter}>Очистить</Button>
      </div>
    </div>
  );
};
