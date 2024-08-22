import { avCodesApi, avNavigationApi, avPermissionsApi, avProvidersApi, avUserApi } from '@availity/api-axios';

import ResourceSelect from './ResourceSelect';

const AvCodeSelect = ResourceSelect.create({
  resource: avCodesApi,
  valueKey: 'code',
  getOptionLabel: (option) => `${option.code} - ${option.value}`,
  requiredParams: ['list'],
  watchParams: ['list'],
});

const AvNavigationSelect = ResourceSelect.create({
  resource: avNavigationApi,
  labelKey: 'name',
  valueKey: 'id',
});

const AvPermissionSelect = ResourceSelect.create({
  resource: avPermissionsApi,
  labelKey: 'description',
  valueKey: 'id',
});

const AvProviderSelect = ResourceSelect.create({
  resource: avProvidersApi,
  labelKey: 'uiDisplayName',
  valueKey: 'npi',
  requiredParams: ['customerId'],
  watchParams: ['customerId'],
});

const AvUserSelect = ResourceSelect.create({
  resource: avUserApi,
  getOptionLabel: (option) => `${option.firstName} ${option.lastName} (${option.id}) - ${option.userId}`,
  valueKey: 'userId',
});

export { AvCodeSelect, AvNavigationSelect, AvPermissionSelect, AvProviderSelect, AvUserSelect };

export { default as AvOrganizationSelect } from './AvOrganizationSelect';
export { default as AvPayerSelect } from './AvPayerSelect';
export { default as AvRegionSelect } from './AvRegionSelect';
