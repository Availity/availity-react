/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';
import { components } from 'react-select';
import { Row, Col } from 'reactstrap';

export const PatientOption = props => {
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
      <Row noGutters>
        <Col>
          <strong>
            {lastName}, {firstName} {middleName ? `${middleName}.` : ''}
          </strong>
        </Col>
      </Row>
      {bd && (
        <Row noGutters>
          <Col>
            DOB:&nbsp;
            {bd[5]}
            {bd[6]}/{bd[8]}
            {bd[9]}/{bd[0]}
            {bd[1]}
            {bd[2]}
            {bd[3]}
          </Col>
        </Row>
      )}
      <Row noGutters>
        <Col>
          {payerName} {memberId || subscriberMemberId}
        </Col>
      </Row>
    </Fragment>
  );

  return <components.Option {...props}>{option}</components.Option>;
};

export const PatientSingleValue = props => {
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

export const PatientMultiValueLabel = props => {
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
