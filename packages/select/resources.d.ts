/* eslint-disable max-classes-per-file, @typescript-eslint/no-empty-interface */
import * as React from 'react';
import ResourceSelect, { ResourceSelectProps } from './typings/ResourceSelect';

export interface AvRegionSelectProps<T> extends ResourceSelectProps<T> {
  defaultToCurrentRegion?: boolean;
}

declare class AvRegionSelect<T> extends React.Component<
  AvRegionSelectProps<T>
> {
  public static create<T>(defaults: AvRegionSelectProps<T>): AvRegionSelect<T>;
}

export interface AvOrganizationSelectProps<T> extends ResourceSelectProps<T> {
  resourceIds?: [[string | number] | string | number] | string | number;
  permissionIds?: [[string | number] | string | number] | string | number;
}

declare class AvOrganizationSelect<T> extends React.Component<
  AvOrganizationSelectProps<T>
> {
  public static create<T>(
    defaults: AvOrganizationSelectProps<T>
  ): AvOrganizationSelect<T>;
}

interface PrebuiltSelectProps<T>
  extends Omit<ResourceSelectProps<T>, 'resource'> {}

class PrebuiltSelect<T> extends React.Component<PrebuiltSelectProps<T>> {}

export default ResourceSelect;

export {
  PrebuiltSelect as AvProviderSelect,
  AvOrganizationSelect,
  PrebuiltSelect as AvPermissionSelect,
  PrebuiltSelect as AvNavigationSelect,
  PrebuiltSelect as AvUserSelect,
  PrebuiltSelect as AvCodeSelect,
  AvRegionSelect,
};
