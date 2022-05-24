import type { GroupBase } from 'react-select';

import type { ResourceSelectProps } from './ResourceSelect';

type PrebuiltResourceSelectProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> = Omit<ResourceSelectProps<Option, IsMulti, Group>, 'resource'>;

type Region = {
  id: string;
  value: string;
};

declare const AvRegionSelect: <
  Option = Region,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: PrebuiltResourceSelectProps<Option, IsMulti, Group> & { defaultToCurrentRegion?: boolean }
) => JSX.Element;

export default AvRegionSelect;
