import React from 'react';
import { Meta, Story } from '@storybook/react';
import response from '@availity/mock/src/data/patients.json';

import Table, { ActionCell, BadgeCell, DateCell, ScrollableContainer } from '..';
// import README from '../README.md';
import '../styles.scss';

const columns = [
  {
    Header: 'First Name',
    accessor: 'firstName',
    defaultCanSort: true,
    disableSortBy: false,
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
    defaultCanSort: true,
    disableSortBy: false,
  },
  {
    Header: 'Birth Date',
    accessor: 'birthDate',
    defaultCanSort: true,
    disableSortBy: false,
    Cell: DateCell({ dateFormat: 'MM/DD/yyyy' }),
  },
  {
    Header: 'Subscriber Relationship',
    accessor: 'subscriberRelationship',
    defaultCanSort: true,
    disableSortBy: false,
    Cell: BadgeCell('primary'),
  },
  {
    id: 'actions',
    Header: 'Actions',
    className: 'action-column',
    Cell: ActionCell({
      actions: [
        {
          id: 'action1',
          displayText: 'Action 1',
          onClick: (record) => {
            // eslint-disable-next-line no-console
            console.log(`action on record ${record.id}`);
          },
        },
        {
          id: 'actionDivider',
          divider: true,
        },
        {
          id: 'action2',
          displayText: 'Action 2',
          onClick: (record) => {
            // eslint-disable-next-line no-console
            console.log(`action on record ${record.id}`);
          },
        },
      ],
    }),
  },
];

export default {
  title: 'Components/Table',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const Default: Story = ({
  sortable,
  selectable,
  columns,
  data,
  headerProps,
  rowProps,
  cellProps,
  bodyProps,
}) => (
  <Table
    sortable={sortable}
    selectable={selectable}
    columns={columns}
    records={data}
    headerProps={headerProps}
    rowProps={rowProps}
    cellProps={cellProps}
    bodyProps={bodyProps}
  />
);
Default.args = {
  sortable: false,
  selectable: false,
  columns,
  data: response.data.patientPagination.items,
  headerProps: { style: { background: 'ping' } },
  rowProps: { style: {} },
  cellProps: { style: {} },
  bodyProps: { style: {} },
};
Default.storyName = 'default';

export const WithScrollableContainer: Story = ({
  sortable,
  selectable,
  columns,
  data,
  headerProps,
  rowProps,
  cellProps,
  bodyProps,
}) => (
  <ScrollableContainer>
    <Table
      sortable={sortable}
      selectable={selectable}
      columns={columns}
      records={data}
      headerProps={headerProps}
      rowProps={rowProps}
      cellProps={cellProps}
      bodyProps={bodyProps}
    />
  </ScrollableContainer>
);
WithScrollableContainer.args = {
  sortable: false,
  selectable: false,
  columns,
  data: response.data.patientPagination.items,
  headerProps: { style: { background: 'ping' } },
  rowProps: { style: {} },
  cellProps: { style: {} },
  bodyProps: { style: {} },
};
WithScrollableContainer.storyName = 'with scrollable container';
