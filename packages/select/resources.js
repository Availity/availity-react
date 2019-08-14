import {
  avProvidersApi,
  avOrganizationsApi,
  avRegionsApi,
  avPermissionsApi,
  avNavigationApi,
  avUserApi,
  avCodesApi,
  avWebQLApi,
} from '@availity/api-axios';
import { ResourceSelect } from '.';
import { PatientOption } from './resource-components';

const AvProviderSelect = ResourceSelect.create({
  resource: avProvidersApi,
  labelKey: 'uiDisplayName',
  requiredParams: ['customerId'],
  watchParams: ['customerId'],
});
const AvOrganizationSelect = ResourceSelect.create({
  resource: avOrganizationsApi,
  labelKey: 'name',
});
const AvRegionSelect = ResourceSelect.create({
  resource: avRegionsApi,
  labelKey: 'value',
  valueKey: 'id',
});
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
const AvPatientSelect = ResourceSelect.create({
  components: {
    Option: PatientOption,
  },
  resource: avWebQLApi,
  requiredParams: ['customerId'],
  watchParams: ['customerId', 'providerUserId', 'payerId'],
  valueKey: 'lastName',
  labelKey: 'lastName',
  getResult: data => data.data.patientPagination.items,
  minCharsToSearch: 3,
  graphqlConfig: {
    type: 'patient',
    query: `query($page: Int, $perPage: Int, $filters: PatientFilters) {
patientPagination(page: $page, perPage: $perPage, filters: $filters) {
  pageInfo {
    hasNextPage
  }
  items {
    firstName
    middleName
    lastName
    suffix
    patientAccountNumber
    memberId
    familyUnitNumber
    subscriberRelationship
    subscriberRelationshipCode
    gender
    genderCode
    ssn
    birthDate
    deathDate
    address {
      line1
      line2
      city
      state
      stateCode
      zipCode
    }
    subscriberFirstName
    subscriberLastName
    subscriberMiddleName
    subscriberMemberId
    payerName
    payerId
    requestingProviderNpi
  }
}
}`,
  },
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
  AvPatientSelect,
};
