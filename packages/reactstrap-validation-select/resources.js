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
import AvResourceSelect from './AvResourceSelect';
import { PatientOption } from './resource-components';

const AvProviderSelect = AvResourceSelect.create({
  resource: avProvidersApi,
  labelKey: 'uiDisplayName',
  requiredParams: ['customerId'],
  watchParams: ['customerId'],
});
const AvOrganizationSelect = AvResourceSelect.create({
  resource: avOrganizationsApi,
  labelKey: 'name',
});
const AvRegionSelect = AvResourceSelect.create({
  resource: avRegionsApi,
  labelKey: 'value',
  valueKey: 'id',
});
const AvPermissionSelect = AvResourceSelect.create({
  resource: avPermissionsApi,
  labelKey: 'description',
  valueKey: 'id',
});
const AvNavigationSelect = AvResourceSelect.create({
  resource: avNavigationApi,
  labelKey: 'name',
  valueKey: 'id',
});
const AvUserSelect = AvResourceSelect.create({
  resource: avUserApi,
  getOptionLabel: option =>
    `${option.firstName} ${option.lastName} (${option.id}) - ${option.userId}`,
});
const AvCodeSelect = AvResourceSelect.create({
  resource: avCodesApi,
  valueKey: 'code',
  getOptionLabel: option => `${option.code} - ${option.value}`,
  requiredParams: ['list'],
  watchParams: ['list'],
});

const AvPatientSelect = AvResourceSelect.create({
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

export default AvResourceSelect;
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
