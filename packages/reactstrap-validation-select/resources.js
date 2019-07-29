import React, { Fragment } from 'react';
import { components } from 'react-select';
import {
  avProvidersApi,
  avOrganizationsApi,
  avRegionsApi,
  avPermissionsApi,
  avNavigationApi,
  avUserApi,
  avCodesApi,
  avThanosApi,
} from '@availity/api-axios';
import AvResourceSelect from './AvResourceSelect';

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

/* eslint-disable react/prop-types */
const PatientOption = props => {
  const {
    lastName,
    firstName,
    middleName,
    payerName,
    subscriberMemberId,
    memberId,
    birthDate: bd,
  } = props.data;

  const option = (
    <Fragment>
      <strong>
        {lastName}, {firstName} {middleName ? `${middleName}.` : ''}
      </strong>
      &nbsp;&nbsp;&nbsp;{payerName} {memberId || subscriberMemberId}
    </Fragment>
  );

  let birthDate = null;
  // Format date
  if (bd) {
    birthDate = (
      <Fragment>
        &nbsp;&nbsp;&nbsp;&nbsp;{bd[5]}
        {bd[6]}/{bd[8]}
        {bd[9]}/{bd[0]}
        {bd[1]}
        {bd[2]}
        {bd[3]}
      </Fragment>
    );
  }

  return (
    <components.Option {...props}>
      {option}
      {birthDate}
    </components.Option>
  );
};

const PatientSingleValue = props => {
  const {
    lastName,
    firstName,
    middleName,
    payerName,
    subscriberMemberId,
    memberId,
    birthDate: bd,
  } = props.data;

  const value = (
    <Fragment>
      <strong>
        {lastName}, {firstName} {middleName ? `${middleName}.` : ''}
      </strong>
      &nbsp;&nbsp;&nbsp;{payerName} {memberId || subscriberMemberId}
    </Fragment>
  );

  let birthDate = null;
  // Format date
  if (bd) {
    birthDate = (
      <Fragment>
        &nbsp;&nbsp;&nbsp;&nbsp;{bd[5]}
        {bd[6]}/{bd[8]}
        {bd[9]}/{bd[0]}
        {bd[1]}
        {bd[2]}
        {bd[3]}
      </Fragment>
    );
  }

  return (
    <components.SingleValue {...props}>
      {value}
      {birthDate}
    </components.SingleValue>
  );
};

const PatientMultiValueLabel = props => {
  const { lastName, firstName, middleName } = props.data;

  const value = (
    <Fragment>
      {lastName}, {firstName} {middleName ? `${middleName}.` : ''}
    </Fragment>
  );

  return (
    <components.MultiValueLabel {...props}>{value}</components.MultiValueLabel>
  );
};

/* eslint-enable react/prop-types */

const AvPatientSelect = AvResourceSelect.create({
  components: {
    Option: PatientOption,
    SingleValue: PatientSingleValue,
    MultiValueLabel: PatientMultiValueLabel,
  },
  resource: avThanosApi,
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
