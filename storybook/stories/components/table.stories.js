import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, object } from '@storybook/addon-knobs';
import '@availity/mock';
import 'availity-uikit';
import '@availity/table/styles.scss';

import Table from '@availity/table';
import README from '@availity/table/README.md';
import response from '@availity/mock/data/patients.json';

import { Preview } from '../util';

const columns = [
  {
    Header: 'First Name',
    accessor: 'firstName',
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
  },
  {
    Header: 'Birth Date',
    accessor: 'birthDate',
  },
];

storiesOf('Components/Table', module)
  .addParameters({
    readme: {
      sidebar: README,
      StoryPreview: Preview,
    },
  })
  .addDecorator(withKnobs)
  .add('default', () => (
    <Table
      columns={columns}
      records={response.data.patientPagination.items}
      headerProps={object('Header Props', {})}
    />
  ))
  .add('selectable', () => (
    <Table
      selectable
      columns={columns}
      records={response.data.patientPagination.items}
      scrollable={boolean('Scrollable', false)}
      headerProps={object('Header Props', { style: { background: 'pink' } })}
    />
  ));
