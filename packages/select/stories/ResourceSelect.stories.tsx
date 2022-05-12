/* eslint-disable no-console */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button, Col, Row } from 'reactstrap';
import AvApi from '@availity/api-axios';

import ResourceSelect, {
  AvCodeSelect,
  AvNavigationSelect,
  AvOrganizationSelect,
  AvPermissionSelect,
  AvProviderSelect,
  AvRegionSelect,
  AvUserSelect,
} from '../src/resources';
import { singleValueSchema, multiValueSchema, SelectedOption } from './utils';
// import README from '../README.md';

import FormikResults from '../../../story-utils/FormikResults';

const avCustomResource = new AvApi({ name: 'my-custom-resource' });
const avGraphqlResource = new AvApi({ name: 'my-custom-graphql' });

export default {
  title: 'Form Components/Select/Async Selects',
  parameters: {
    docs: {
      // page: README,
    },
  },
  args: {
    disabled: false,
    isMulti: false,
    raw: true,
    required: true,
  },
} as Meta;

export const Default: Story = ({ creatable, disabled, helpMessage, isMulti, label, max, min, raw, required }) => (
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
);

Default.args = {
  creatable: false,
  helpMessage: 'Do the thing',
  label: 'Resource Select',
  min: 2,
  max: 3,
};

Default.storyName = '<ResourceSelect />';

export const GraphQlResourceSelect: Story = ({
  creatable,
  disabled,
  helpMessage,
  isMulti,
  label,
  max,
  min,
  raw,
  required,
}) => (
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
);

GraphQlResourceSelect.args = {
  creatable: false,
  helpMessage: 'Do the thing',
  label: 'GraphQL Select',
  min: 2,
  max: 3,
};

GraphQlResourceSelect.storyName = '<ResourceSelect /> with GraphQL';

export const CodeSelect: Story = ({ disabled, isMulti, label, list, raw, required }) => (
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
);

CodeSelect.args = {
  label: 'Select a Code',
  list: 'GENALLPRV03',
};

CodeSelect.storyName = '<AvCodeSelect />';

export const NavigationSelect: Story = ({ disabled, isMulti, label, raw, required }) => (
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
);

NavigationSelect.args = {
  label: 'Select a Payer Space',
};

NavigationSelect.storyName = '<AvNavigationSelect />';

export const OrganizationSelect: Story = ({ disabled, isMulti, label, raw, required }) => (
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
);

OrganizationSelect.args = {
  label: 'Select an Organization',
};

OrganizationSelect.storyName = '<AvOrganizationSelect />';

export const PermissionsSelect: Story = ({ disabled, isMulti, label, raw, required }) => (
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
);

PermissionsSelect.args = {
  label: 'Select a Permission',
};

PermissionsSelect.storyName = '<AvPermissionSelect />';

export const ProviderSelect: Story = ({ customerId, disabled, isMulti, label, raw, required }) => (
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
);

ProviderSelect.args = {
  customerId: '1234',
  label: 'Select a Provider',
};

ProviderSelect.storyName = '<AvProviderSelect />';

export const RegionSelect: Story = ({ disabled, isMulti, label, raw, required }) => (
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
);

RegionSelect.args = {
  label: 'Select a Region',
};

RegionSelect.storyName = '<AvRegionSelect />';

export const UserSelect: Story = ({ disabled, isMulti, label, raw, required }) => (
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
);

UserSelect.args = {
  label: 'Select a User',
};

UserSelect.storyName = '<AvUserSelect />';
