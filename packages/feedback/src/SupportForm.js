import React from 'react';
import PropTypes from 'prop-types';
import { Button, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { Form } from '@availity/form';
import { AvOrganizationSelect } from '@availity/select/resources';
import * as yup from 'yup';
import nativeForm from '@availity/native-form';
import { avOrganizationsApi, avWebQLApi } from '@availity/api-axios';
import '@availity/yup';

const SUPPORT_PERMISSION_ID = '7205';

const ORG_VALIDATION_MESSAGE = 'Please select an organization from the dropdown.';

const getToken = () => document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/, '$1');

const openSupport = async (values, setBlocking, setSupportIsActive, feedbackToggle) => {
  setBlocking(true);
  const orgsResp = await avOrganizationsApi.getOrganizations(SUPPORT_PERMISSION_ID);
  let salesforceResponse;
  if (orgsResp.data.organizations.some((org) => org.id === values.organization.id)) {
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
        organizationId: values.organization.id,
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
      orgGenKey: values.organization.customerId,
      organizationName: values.organization.name,
      partyId: values.organization.id,
      payerId: 'AVAILITY',
      X_Client_ID: '5430d59f-c5cc-4be7-be5a-34472ec30fe9',
      X_XSRF_TOKEN: getToken(),
    };

    if (salesforceData.id && salesforceData.accountId) {
      attributes.avSalesForceContactId = salesforceData.id;
      attributes.avSalesForceContactAccId = salesforceData.accountId;
    }

    href = `/ms/api/availity/internal/spc/magneto/sso/v1/saml/${salesforceData.newCommunity ? newCommutySsoId : ssoId}`;

    await nativeForm(ssoId, attributes, { action: href, target: '_blank' });
    setBlocking(false);
  } else {
    window.open(href, target);
  }
  setSupportIsActive(false);
  feedbackToggle(false);
};

function orgSelectTest(msg) {
  const orgSelectSchema = yup.object().shape({
    id: yup.string().isRequired(true, ORG_VALIDATION_MESSAGE),
    name: yup.string().isRequired(true, ORG_VALIDATION_MESSAGE),
  });

  return this.test({
    name: 'orgSelectTest',
    exclusive: true,
    message: msg || 'This field is invalid.',
    async test(componentValue) {
      if (!componentValue) return true;

      const valid = await orgSelectSchema.isValid(componentValue);
      return valid;
    },
  });
}

yup.addMethod(yup.object, 'orgSelectTest', orgSelectTest);

const SupportForm = ({ setSupportIsActive, setBlocking, feedbackToggle }) => (
  <>
    <ModalHeader id="support-form-header" role="heading" aria-level="2" className="h5" tag="div">
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
      validationSchema={yup.object({
        organization: yup
          .object()
          .orgSelectTest(ORG_VALIDATION_MESSAGE)
          .isRequired(ORG_VALIDATION_MESSAGE)
          .typeError(ORG_VALIDATION_MESSAGE),
      })}
      onSubmit={(values) => openSupport(values, setBlocking, setSupportIsActive, feedbackToggle)}
    >
      <ModalBody>
        <AvOrganizationSelect
          name="organization"
          label="Select an Organization"
          data-testid="org-dropdown"
          getResult={(data) => data.organizations}
        />
      </ModalBody>

      <ModalFooter>
        <Button
          onClick={() => setSupportIsActive(false)}
          color="secondary"
          type="button"
          onKeyDown={({ keyCode }) => keyCode === 13 && setSupportIsActive(false)}
        >
          Close
        </Button>

        <Button data-testid="submit-btn" type="submit" color="primary">
          Continue
        </Button>
      </ModalFooter>
    </Form>
  </>
);

SupportForm.propTypes = {
  setSupportIsActive: PropTypes.func,
  setBlocking: PropTypes.func,
  feedbackToggle: PropTypes.func,
};

export default SupportForm;
