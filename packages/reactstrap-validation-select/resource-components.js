/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
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
    __isNew__,
  } = props.data;

  let option;
  if (__isNew__) {
    option = props.data.label;
  } else {
    option = (
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
  }

  return <components.Option {...props}>{option}</components.Option>;
};
