import { UseQueryOptions } from '@tanstack/react-query';

export type Resource = {
  id: string;
};
export type Organization = {
  id: string;
  customerId: string;
  name: string;
  resources: Resource[];
};
export type Permission = {
  id: string;
  description: string;
  organizations: Organization[];
};

// exporting weirdly for storybook args detection

export type Permissions = {
  /** - **string**: The permission ID, eg: '1234'
   * - **array**: The array can contain Permission ID's as well as other arrays which contain Permission ID's
   * eg: ['1234', '2345', ['3456', '4567'], ['5678', '6789']]. The items in a nested array indicate
   * Permission ID's that must all be granted to the user to be considered authorized - they act as an "AND".
   * The items in the top of the array act as an "OR" - if any are granted to the user, the user is considered
   * authorized. For example, ['1234', '2345', ['3456', '4567'], ['5678', '6789']] is equivalent to
   * '1234' || '2345' || ('3456' && '4567') || ('5678' && '6789').
   */
  permissions: (string | string[])[];
};

export type Parameters = {
  /** Additional parameters
   * - **`organizationId`**: String. Optional. When present, the permission is validated to ensure it is assigned to the organization.
   * - **`customerId`**: String. Optional. When present, the permission is validated to ensure it is assigned to the customer.
   * - **`region`**: String or Boolean. Optional. Default: `true`. When a string, the permission is validated to ensure it is assigned in the provided region. When true, the permission is validated to ensure it is assigned in the current region.
   * - **`resources`**: (string | string[])[]. Optional.
   *   - **string**: The Resource ID, eg: `'12345'`
   *   - **array**: The array can contain Resource ID's as well as other arrays which contain Resource ID's eg: `['12345', '23456', ['34567', '45678'], ['56789', '67890']]`. The items in a nested array indicate the Resource ID's that must _all_ be granted to the user to be considered authorized - they act as an `"AND"`. The items in the top of the array act as an `"OR"` - if _any_ are granted to the user, the user is considered authorized. For example, `['12345', '23456', ['34567', '45678'], ['56789', '67890']]` is equivalent to `'12345' || '23456' || ('34567' && '45678') || ('56789' && '67890')`.
   */
  parameters?: {
    /** When present, the permission is validated to ensure it is assigned to the organization. */
    organizationId?: string;
    /** When present, the permission is validated to ensure it is assigned to the customer. */
    customerId?: string;
    /** When a string, the permission is validated to ensure it is assigned in the provided region.
     * When true, the permission is validated to ensure it is assigned in the current region.
     */
    region?: boolean | string;
    /** - **string**: The permission ID, eg: `'1234'`
     * - **array**: The array can contain Permission ID's as well as other arrays which contain Permission ID's
     * eg: `['1234', '2345', ['3456', '4567'], ['5678', '6789']]`. The items in a nested array indicate
     * Permission ID's that must all be granted to the user to be considered authorized - they act as an `"AND"`.
     * The items in the top of the array act as an `"OR"` - if any are granted to the user, the user is considered
     * authorized. For example, `['1234', '2345', ['3456', '4567'], ['5678', '6789']]` is equivalent to
     * `'1234' || '2345' || ('3456' && '4567') || ('5678' && '6789')`.
     */
    resources?: (string | string[])[];
  };
};

export type Options = {
  /** React Query Options */
  queryOptions?: Omit<
    UseQueryOptions<boolean, unknown, boolean, (string | boolean | (string | string[])[] | undefined)[]>,
    'queryKey' | 'queryFn'
  >;
};

export type RequestedPermissions = Permissions['permissions'];
export type RequestedResources = Required<Parameters>['parameters']['resources'];

export type QueryOptions = Options['queryOptions'];
