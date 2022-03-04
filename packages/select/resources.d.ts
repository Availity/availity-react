/* eslint-disable max-classes-per-file, @typescript-eslint/no-empty-interface */
// import * as React from 'react';
import type { GroupBase } from 'react-select';

import ResourceSelect from './types/ResourceSelect';
import type { ResourceSelectProps } from './types/ResourceSelect';

type PrebuiltResourceSelectProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> = Omit<ResourceSelectProps<Option, IsMulti, Group>, 'resource'>;

export declare const AvCodeSelect: <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: PrebuiltResourceSelectProps<Option, IsMulti, Group>
) => JSX.Element;

export declare const AvNavigationSelect: <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: PrebuiltResourceSelectProps<Option, IsMulti, Group>
) => JSX.Element;

export type AvOrganizationSelectProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> = PrebuiltResourceSelectProps<Option, IsMulti, Group> & {
  resourceIds?: string | string[] | string[][];
  permissionIds?: string | string[] | string[][];
};

export declare const AvOrganizationSelect: <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: AvOrganizationSelectProps<Option, IsMulti, Group>
) => JSX.Element;

export declare const AvPermissionSelect: <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: PrebuiltResourceSelectProps<Option, IsMulti, Group>
) => JSX.Element;

export declare const AvProviderSelect: <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: PrebuiltResourceSelectProps<Option, IsMulti, Group> & { customerId: string }
) => JSX.Element;

export declare const AvRegionSelect: <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: PrebuiltResourceSelectProps<Option, IsMulti, Group> & { defaultToCurrentRegion?: boolean }
) => JSX.Element;

export declare const AvUserSelect: <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: PrebuiltResourceSelectProps<Option, IsMulti, Group>
) => JSX.Element;

export default ResourceSelect;
