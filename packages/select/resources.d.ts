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


export default ResourceSelect;
export {
  ResourceSelect as AvProviderSelect,
  ResourceSelect as AvOrganizationSelect,
  ResourceSelect as AvPermissionSelect,
  ResourceSelect as AvNavigationSelect,
  ResourceSelect as AvUserSelect,
  ResourceSelect as AvCodeSelect,
  AvRegionSelect,
};

