import {
  avProvidersApi,
<<<<<<< HEAD
  avOrganizationsApi,
=======
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
  avPermissionsApi,
  avNavigationApi,
  avUserApi,
  avCodesApi,
} from '@availity/api-axios';
import { ResourceSelect } from '.';
<<<<<<< HEAD
=======
import AvOrganizationSelect from './custom-resources/AvOrganizationSelect';
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
import AvRegionSelect from './custom-resources/AvRegionSelect';

const AvProviderSelect = ResourceSelect.create({
  resource: avProvidersApi,
  labelKey: 'uiDisplayName',
  requiredParams: ['customerId'],
  watchParams: ['customerId'],
});
<<<<<<< HEAD
const AvOrganizationSelect = ResourceSelect.create({
  resource: avOrganizationsApi,
  labelKey: 'name',
});
=======
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
const AvPermissionSelect = ResourceSelect.create({
  resource: avPermissionsApi,
  labelKey: 'description',
  valueKey: 'id',
});
const AvNavigationSelect = ResourceSelect.create({
  resource: avNavigationApi,
  labelKey: 'name',
  valueKey: 'id',
});
const AvUserSelect = ResourceSelect.create({
  resource: avUserApi,
  getOptionLabel: option =>
    `${option.firstName} ${option.lastName} (${option.id}) - ${option.userId}`,
});
const AvCodeSelect = ResourceSelect.create({
  resource: avCodesApi,
  valueKey: 'code',
  getOptionLabel: option => `${option.code} - ${option.value}`,
  requiredParams: ['list'],
  watchParams: ['list'],
});

export default ResourceSelect;
export {
  AvProviderSelect,
  AvOrganizationSelect,
  AvRegionSelect,
  AvPermissionSelect,
  AvNavigationSelect,
  AvUserSelect,
  AvCodeSelect,
};
