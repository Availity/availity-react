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
import {
  PatientOption,
  PatientSingleValue,
  PatientMultiValueLabel,
} from './resource-components';

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
    SingleValue: PatientSingleValue,
    MultiValueLabel: PatientMultiValueLabel,
  },
  resource: avWebQLApi,
  requiredParams: ['customerId'],
  watchParams: ['customerId', 'providerUserId'],
  hasMore: false, // pagination not supported
  getResult: data => data.data.patientsMany,
  graphqlConfig: {
    type: 'patient',
    query: `query($filters: PatientFilters) {
  patientsMany(filters: $filters) {
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
    subscriberMemberId
    payerName
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
