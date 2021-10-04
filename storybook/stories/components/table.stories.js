import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
import '@availity/mock';
import 'availity-uikit';
import '@availity/table/styles.scss';

import Table, { ScrollableContainer } from '@availity/table';
import README from '@availity/table/README.md';
import response from '@availity/mock/data/patients.json';

import { Preview } from '../util';

const columns = [
  {
    Header: 'First Name',
    accessor: 'firstName',
    defaultCanSort: true,
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
    defaultCanSort: true,
  },
  {
    Header: 'Birth Date',
    accessor: 'birthDate',
    defaultCanSort: true,
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
      headerProps={object('Header Props', { style: { background: 'pink' } })}
      rowProps={object('Row Props', {})}
      cellProps={object('Cell Props', {})}
      initialState={object('Initial State', {
        sortBy: [{ id: 'lastName', desc: true }],
      })}
    />
  ))
  .add('selectable', () => (
    <Table
      columns={columns}
      records={response.data.patientPagination.items}
      selectable
      headerProps={object('Header Props', {})}
      rowProps={object('Row Props', {})}
      cellProps={object('Cell Props', {})}
      initialState={object('Initial State', {})}
    />
  ))
  .add('with scrollable container', () => (
    <ScrollableContainer>
      <Table
        columns={columns}
        records={response.data.patientPagination.items}
        headerProps={object('Header Props', {})}
        rowProps={object('Row Props', {})}
        cellProps={object('Cell Props', {})}
        initialState={object('Initial State', {})}
      />
    </ScrollableContainer>
  ))
  .add('sortable', () => (
    <Table
      sortable
      columns={columns}
      records={response.data.patientPagination.items}
      headerProps={object('Header Props', {})}
      rowProps={object('Row Props', {})}
      cellProps={object('Cell Props', {})}
      initialState={object('Initial State', {})}
    />
  ));
