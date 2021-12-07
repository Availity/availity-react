import React from 'react';
import { Meta, Story } from '@storybook/react';
import response from '@availity/mock/data/patients.json';
import Table, { TableContextProvider, ScrollableContainer, TableControls, DateCell, BadgeCell, ActionCell } from '../src';

import '../styles.scss';

import '@availity/mock';

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
          onClick: (record?: Record<string, unknown>) => {
            // eslint-disable-next-line no-console
            console.log(`action on record ${record?.id}`);
          },
        },
        {
          id: 'actionDivider',
          divider: true,
        },
        {
          id: 'action2',
          displayText: 'Action 2',
          onClick: (record?: Record<string, unknown>) => {
            // eslint-disable-next-line no-console
            console.log(`action on record ${record?.id}`);
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => (
  <TableContextProvider
    sortable={sortable}
    selectable={selectable}
    columns={columns}
    records={data}
  >
    <Table
      headerProps={headerProps}
      rowProps={rowProps}
      cellProps={cellProps}
      bodyProps={bodyProps}
    />
  </TableContextProvider>);
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => (
  <TableContextProvider
    sortable={sortable}
    selectable={selectable}
    columns={columns}
    records={data}
  >
    <ScrollableContainer>
      <Table
        headerProps={headerProps}
        rowProps={rowProps}
        cellProps={cellProps}
        bodyProps={bodyProps}
      />
    </ScrollableContainer>
  </TableContextProvider>
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


export const WithTableControls: Story = ({
  sortable,
  selectable,
  columns,
  data,
  headerProps,
  rowProps,
  cellProps,
  bodyProps,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => (

  <TableContextProvider
    sortable={sortable}
    selectable={selectable}
    columns={columns}
    records={data}
  >
    <TableControls>
      <div>table controls</div>
      <div>hi</div>
    </TableControls>
    <Table
      headerProps={headerProps}
      rowProps={rowProps}
      cellProps={cellProps}
      bodyProps={bodyProps}
    />
  </TableContextProvider>
);
WithTableControls.args = {
  sortable: false,
  selectable: false,
  columns,
  data: response.data.patientPagination.items,
  headerProps: { style: { background: 'pink' } },
  rowProps: { style: {} },
  cellProps: { style: {} },
  bodyProps: { style: {} },
};
WithTableControls.storyName = 'with table controls';