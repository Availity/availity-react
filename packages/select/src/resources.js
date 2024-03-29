import { avCodesApi, avNavigationApi, avPermissionsApi, avProvidersApi, avUserApi } from '@availity/api-axios';

import ResourceSelect from './ResourceSelect';
import AvOrganizationSelect from './AvOrganizationSelect';
import AvPayerSelect from './AvPayerSelect';
import AvRegionSelect from './AvRegionSelect';

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

export {
  AvCodeSelect,
  AvNavigationSelect,
  AvOrganizationSelect,
  AvPayerSelect,
  AvPermissionSelect,
  AvProviderSelect,
  AvRegionSelect,
  AvUserSelect,
};
