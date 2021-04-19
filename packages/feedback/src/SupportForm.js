import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { Form } from '@availity/form';
import { AvOrganizationSelect } from '@availity/select/resources';
import * as yup from 'yup';
import nativeForm from '@availity/native-form';
import { avOrganizationsApi, avWebQLApi } from '@availity/api-axios';

const SUPPORT_PERMISSION_ID = '7205';

const getToken = () =>
  document.cookie.replace(
    /(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  );

const openSupport = async (values, setBlocking) => {
  setBlocking(true);
  const orgsResp = await avOrganizationsApi.getOrganizations(
    SUPPORT_PERMISSION_ID
  );
  let salesforceResponse;
  if (
    orgsResp.data.organizations.some(
      (org) => org.id === values.organizations.id
    )
  ) {
    salesforceResponse = await avWebQLApi.create({
      query: `
        query salesforceUser($organizationId: ID!) {
          salesforceUser(organizationId: $organizationId) {
            id
            accountId
            newCommunity
          }
        }
      `,
      variables: {
        organizationId: values.organizations.id,
      },
    });
  }

  let href = 'mailto:support@availity.com';
  const target = '_top';

  if (!salesforceResponse || !salesforceResponse.data) {
    window.open(href, target);
  }

  const salesforceData = salesforceResponse.data.data.salesforceUser;
  const ssoId = 'BJx3fqX3BH';
  const newCommutySsoId = 'E-t_s_JQ0P';

  if (salesforceData) {
    const attributes = {
      orgGenKey: values.organizations.customerId,
      organizationName: values.organizations.name,
      partyId: values.organizations.id,
      payerId: 'AVAILITY',
      X_Client_ID: '5430d59f-c5cc-4be7-be5a-34472ec30fe9',
      X_XSRF_TOKEN: getToken(),
    };

    if (salesforceData.id && salesforceData.accountId) {
      attributes.avSalesForceContactId = salesforceData.id;
      attributes.avSalesForceContactAccId = salesforceData.accountId;
    }

    href = `/ms/api/availity/internal/spc/magneto/sso/v1/saml/${
      salesforceData.newCommunity ? newCommutySsoId : ssoId
    }`;

    nativeForm(ssoId, attributes, { action: href, target: '_blank' });
    setBlocking(false);
  } else {
    window.open(href, target);
  }
};

const SupportForm = ({ setSupportIsActive, setBlocking }) => {
  const [active, setActive] = useState(null);

  return (
    <>
      <ModalHeader aria-live="assertive" id="support-form-header">
        Open Support Ticket
      </ModalHeader>
      <Form
        aria-label="Support Form"
        aria-describedby="support-form-header"
        role="form"
        data-testid="support-form"
        initialValues={{
          organization: undefined,
        }}
        validationSchema={yup.object().shape({
          organization: yup
            .object()
            .shape({
              id: yup.string(),
            })
            .required('This field is required.'),
        })}
        onSubmit={(values) => openSupport(values, setBlocking)}
      >
        <ModalBody>
          <AvOrganizationSelect
            id="organizations"
            name="organizations"
            data-testid="org-dropdown"
            onChange={(option) => setActive(option)}
            getResult={(data) => data.organizations}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => setSupportIsActive(false)}
            color="secondary"
            type="button"
            onKeyDown={({ keyCode }) =>
              keyCode === 13 && setSupportIsActive(false)
            }
          >
            Close
          </Button>

          <Button
            data-testid="submit-btn"
            type="submit"
            color="primary"
            disabled={!active}
          >
            Continue
          </Button>
        </ModalFooter>
      </Form>
    </>
  );
};

SupportForm.propTypes = {
  setSupportIsActive: PropTypes.func,
  setBlocking: PropTypes.func,
};

export default SupportForm;
