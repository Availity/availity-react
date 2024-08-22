/* eslint-disable no-console */
import React from 'react';
import { StoryObj } from '@storybook/react';
import { Button, Col, Row } from 'reactstrap';
import AvApi from '@availity/api-axios';
import ResourceSelect from '../src/ResourceSelect';

import {
  AvCodeSelect,
  AvNavigationSelect,
  AvOrganizationSelect,
  AvPayerSelect,
  AvPermissionSelect,
  AvProviderSelect,
  AvRegionSelect,
  AvUserSelect,
} from '../src/resources';
import { singleValueSchema, multiValueSchema, SelectedOption } from './utils';
// import README from '../README.md';

// eslint-disable-next-line import/no-relative-packages
import FormikResults from '../../../story-utils/FormikResults';

const avCustomResource = new AvApi({ name: 'my-custom-resource' });
const avGraphqlResource = new AvApi({ name: 'my-custom-graphql' });

export default {
  title: 'Form Components/Select/Async Selects',
  parameters: {
    docs: {
      description: {
        component: 'A select list that automatically loads and pages through regions when the user scrolls down.',
      },
    },
  },
  args: {
    disabled: false,
    isMulti: false,
    raw: true,
    required: true,
  },
  component: ResourceSelect,
};

export const _Default: StoryObj<typeof ResourceSelect> = {
  render: ({ creatable, disabled, helpMessage, isMulti, label, max, min, raw, required }) => (
    <FormikResults
      onSubmit={() => {
        console.log('submitted');
      }}
      initialValues={{
        resourceSelect: null,
      }}
      validationSchema={
        isMulti ? multiValueSchema('resourceSelect', required, min, max) : singleValueSchema('resourceSelect', required)
      }
    >
      <Row>
        <Col>
          <ResourceSelect
            name="resourceSelect"
            creatable={creatable}
            helpMessage={helpMessage}
            isDisabled={disabled}
            isMulti={isMulti}
            label={label}
            labelKey="name"
            valueKey="value"
            maxLength={max}
            raw={raw}
            required={required}
            resource={avCustomResource}
          />
          <Button color="primary" type="submit">
            Submit
          </Button>
        </Col>
        <Col md="5">
          <SelectedOption field="resourceSelect" />
        </Col>
      </Row>
    </FormikResults>
  ),
  args: {
    creatable: false,
    helpMessage: 'Do the thing',
    label: 'Resource Select',
    min: 2,
    max: 3,
  },
};

export const _GraphQlResourceSelect: StoryObj<typeof ResourceSelect> = {
  render: ({ creatable, disabled, helpMessage, isMulti, label, max, min, raw, required }) => (
    <FormikResults
      onSubmit={() => {
        console.log('submitted');
      }}
      initialValues={{
        graphqlSelect: null,
      }}
      validationSchema={
        isMulti ? multiValueSchema('graphqlSelect', required, min, max) : singleValueSchema('graphqlSelect', required)
      }
    >
      <Row>
        <Col>
          <ResourceSelect
            name="graphqlSelect"
            creatable={creatable}
            getResult={(response) => response.data.customPagination.items}
            graphqlConfig={{
              type: 'custom',
              query: `
          query customPagination {
            count
            pageInfo {
              hasNextPage
            }
            items {
              id
              value
            }
          }
        `,
            }}
            helpMessage={helpMessage}
            isDisabled={disabled}
            isMulti={isMulti}
            label={label}
            labelKey="value"
            maxLength={max}
            raw={raw}
            required={required}
            resource={avGraphqlResource}
            valueKey="id"
          />
          <Button color="primary" type="submit">
            Submit
          </Button>
        </Col>
        <Col md="5">
          <SelectedOption field="graphqlSelect" />
        </Col>
      </Row>
    </FormikResults>
  ),
  args: {
    creatable: false,
    helpMessage: 'Do the thing',
    label: 'GraphQL Select',
    min: 2,
    max: 3,
  },
};

export const _CodeSelect: Story<typeof AvCodeSelect> = {
  render: ({ disabled, isMulti, label, list, raw, required }) => (
    <FormikResults
      onSubmit={() => {
        console.log('submitted');
      }}
      initialValues={{
        codeSelect: null,
      }}
      validationSchema={singleValueSchema('codeSelect', required)}
    >
      <Row>
        <Col>
          <AvCodeSelect
            name="codeSelect"
            isDisabled={disabled}
            isMulti={isMulti}
            label={label}
            parameters={{ list }}
            raw={raw}
            required={required}
          />
          <Button color="primary" type="submit">
            Submit
          </Button>
        </Col>
        <Col md="5">
          <SelectedOption field="codeSelect" />
        </Col>
      </Row>
    </FormikResults>
  ),
  args: {
    label: 'Select a Code',
    list: 'GENALLPRV03',
  },
};

export const _NavigationSelect: StoryObj<typeof AvNavigationSelect> = {
  render: ({ disabled, isMulti, label, raw, required }) => (
    <FormikResults
      onSubmit={() => {
        console.log('submitted');
      }}
      initialValues={{
        navSelect: null,
      }}
      validationSchema={singleValueSchema('navSelect', required)}
    >
      <Row>
        <Col>
          <AvNavigationSelect
            name="navSelect"
            isDisabled={disabled}
            isMulti={isMulti}
            label={label}
            raw={raw}
            required={required}
          />
          <Button color="primary" type="submit">
            Submit
          </Button>
        </Col>
        <Col md="5">
          <SelectedOption field="navSelect" />
        </Col>
      </Row>
    </FormikResults>
  ),
  args: {
    label: 'Select a Payer Space',
  },
};

export const _OrganizationSelect: StoryObj<typeof AvOrganizationSelect> = {
  render: ({ disabled, isMulti, label, raw, required }) => (
    <FormikResults
      onSubmit={() => {
        console.log('submitted');
      }}
      initialValues={{
        orgSelect: null,
      }}
      validationSchema={singleValueSchema('orgSelect', required)}
    >
      <Row>
        <Col>
          <AvOrganizationSelect
            name="orgSelect"
            isDisabled={disabled}
            isMulti={isMulti}
            label={label}
            raw={raw}
            required={required}
          />
          <Button color="primary" type="submit">
            Submit
          </Button>
        </Col>
        <Col md="5">
          <SelectedOption field="orgSelect" />
        </Col>
      </Row>
    </FormikResults>
  ),
  args: {
    label: 'Select an Organization',
  },
};

export const _PayerSelect: StoryObj<typeof AvPayerSelect> = {
  render: ({ disabled, isMulti, label, raw, required, region, tranTypeCode, customerId }) => (
    <FormikResults
      onSubmit={() => {
        console.log('submitted');
      }}
      initialValues={{
        payerSelect: null,
      }}
      validationSchema={singleValueSchema('payerSelect', required)}
    >
      <Row>
        <Col>
          <AvPayerSelect
            name="payerSelect"
            isDisabled={disabled}
            isMulti={isMulti}
            label={label}
            raw={raw}
            required={required}
            customerId={customerId}
            parameters={{
              region,
              tranTypeCode,
            }}
          />
          <Button color="primary" type="submit">
            Submit
          </Button>
        </Col>
        <Col md="5">
          <SelectedOption field="payerSelect" />
        </Col>
      </Row>
    </FormikResults>
  ),
  args: {
    label: 'Select a Payer',
    region: 'FL',
    tranTypeCode: 'EBREACT',
    customerId: '12345',
  },
};

export const _PermissionsSelect: StoryObj<typeof AvPermissionSelect> = {
  render: ({ disabled, isMulti, label, raw, required }) => (
    <FormikResults
      onSubmit={() => {
        console.log('submitted');
      }}
      initialValues={{
        permissionSelect: null,
      }}
      validationSchema={singleValueSchema('permissionSelect', required)}
    >
      <Row>
        <Col>
          <AvPermissionSelect
            name="permissionSelect"
            isDisabled={disabled}
            isMulti={isMulti}
            label={label}
            raw={raw}
            required={required}
          />
          <Button color="primary" type="submit">
            Submit
          </Button>
        </Col>
        <Col md="5">
          <SelectedOption field="permissionSelect" />
        </Col>
      </Row>
    </FormikResults>
  ),
  args: {
    label: 'Select a Permission',
  },
};

export const _ProviderSelect: StoryObj<typeof AvProviderSelect> = {
  render: ({ customerId, disabled, isMulti, label, raw, required }) => (
    <FormikResults
      onSubmit={() => {
        console.log('submitted');
      }}
      initialValues={{
        providerSelect: null,
      }}
      validationSchema={singleValueSchema('providerSelect', required)}
    >
      <Row>
        <Col>
          <AvProviderSelect
            name="providerSelect"
            customerId={customerId}
            isDisabled={disabled}
            isMulti={isMulti}
            label={label}
            raw={raw}
            required={required}
          />
          <Button color="primary" type="submit">
            Submit
          </Button>
        </Col>
        <Col md="5">
          <SelectedOption field="providerSelect" />
        </Col>
      </Row>
    </FormikResults>
  ),
  args: {
    customerId: '1234',
    label: 'Select a Provider',
  },
};

export const _RegionSelect: StoryObj<typeof AvRegionSelect> = {
  render: ({ disabled, isMulti, label, raw, required }) => (
    <FormikResults
      onSubmit={() => {
        console.log('submitted');
      }}
      initialValues={{
        regionSelect: null,
      }}
      validationSchema={singleValueSchema('regionSelect', required)}
    >
      <Row>
        <Col>
          <AvRegionSelect
            name="regionSelect"
            isDisabled={disabled}
            isMulti={isMulti}
            label={label}
            raw={raw}
            required={required}
          />
          <Button color="primary" type="submit">
            Submit
          </Button>
        </Col>
        <Col md="5">
          <SelectedOption field="regionSelect" />
        </Col>
      </Row>
    </FormikResults>
  ),
  args: {
    label: 'Select a Region',
  },
};

export const _UserSelect: StoryObj<typeof AvUserSelect> = {
  render: ({ disabled, isMulti, label, raw, required }) => (
    <FormikResults
      onSubmit={() => {
        console.log('submitted');
      }}
      initialValues={{
        userSelect: null,
      }}
      validationSchema={singleValueSchema('userSelect', required)}
    >
      <Row>
        <Col>
          <AvUserSelect
            name="userSelect"
            isDisabled={disabled}
            isMulti={isMulti}
            label={label}
            raw={raw}
            required={required}
          />
          <Button color="primary" type="submit">
            Submit
          </Button>
        </Col>
        <Col md="5">
          <SelectedOption field="userSelect" />
        </Col>
      </Row>
    </FormikResults>
  ),
  args: {
    label: 'Select a User',
  },
};
