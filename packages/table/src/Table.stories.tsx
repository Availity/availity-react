import React from 'react';
import { Meta, Story } from '@storybook/react';
import response from '@availity/mock/src/data/patients.json';
import Pagination, { PaginationControls } from '@availity/pagination';
import Table, {
  ScrollableContainer,
  DateCell,
  BadgeCell,
  ActionCell,
  TableControls,
  BulkTableActions,
  TableSorter,
  TableSort,
  TableContext,
  TableContent,
} from '.';
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
          displayText: <span className="text-danger">Action 2</span>,
          onClick: (record?: Record<string, unknown>) => {
            // eslint-disable-next-line no-console
            console.log(`action on record ${record?.id}`);
          },
        },
      ],
    }),
    primaryAction: {
      iconName: 'file-pdf',
      title: 'View File',
      onClick: (record?: Record<string, unknown>) => {
        // eslint-disable-next-line no-console
        console.log(`action on record ${record?.id}`);
      },
    },
  },
];

const bulkActions = [
  {
    id: 'action1',
    displayText: 'Action 1',
    onClick: (records?: Record<string, unknown>[]) => {
      // eslint-disable-next-line no-console
      console.log('Records', records);
      // eslint-disable-next-line no-console
      console.log(`action 1 on records ${records?.map((rec) => rec.firstName)}`);
    },
  },
  {
    id: 'action2',
    displayText: 'Action 2',
    onClick: (records?: Record<string, unknown>[]) => {
      // eslint-disable-next-line no-console
      console.log('Records', records);
      // eslint-disable-next-line no-console
      console.log(`action 2 on records ${records?.map((rec) => rec.firstName)}`);
    },
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

export const BasicTable: Story = ({ sortable, selectable, columns, data, headerProps, bodyProps }) => (
  <Table
    initialState={{
      sortBy: [{ id: 'firstName', desc: false }],
    }}
    sortable={sortable}
    selectable={selectable}
    columns={columns}
    data={data}
    headerProps={headerProps}
    bodyProps={bodyProps}
    onRowSelected={(event) => {
      // eslint-disable-next-line no-console
      console.log('Row selected', event);
    }}
  />
);
BasicTable.args = {
  sortable: false,
  selectable: true,
  columns,
  data: response.data.patientPagination.items,
  headerProps: { style: { background: 'gray' } },
  bodyProps: { style: {} },
};
BasicTable.storyName = 'basic';

export const WithControls: Story = ({ sortable, selectable, columns, data, headerProps, bodyProps }) => (
  <Table
    initialState={{
      sortBy: [{ id: 'firstName', desc: false }],
      selectedRowIds: {
        '0': true,
      },
    }}
    paged
    sortable={sortable}
    selectable={selectable}
    columns={columns}
    data={data}
    headerProps={headerProps}
    bodyProps={bodyProps}
    onRowSelected={(event) => {
      // eslint-disable-next-line no-console
      console.log('Row selected', event);
    }}
  >
    <TableControls className="pb-2">
      <BulkTableActions color="light" bulkActions={bulkActions} />
      <TableSorter
        color="light"
        className="ml-1"
        onSort={(sortBy: TableSort[]) => {
          // eslint-disable-next-line no-console
          console.log(`Sorting: ${sortBy[0].id}`);
        }}
      />
      <div style={{ marginLeft: 'auto' }}>
        <TableContext.Consumer>
          {({ instance }) => (
            <Pagination
              itemsPerPage={instance.state.pageSize}
              page={instance.currentPage}
              onPageChange={(page: number) => {
                const { gotoPage } = instance;
                gotoPage(page - 1);
              }}
              items={response.data.patientPagination.items}
            >
              <PaginationControls
                className="pt-3"
                listClassName="pagination-unstyled"
                directionLinks
                showPaginationText
                pageRange={3}
                marginPages={1}
              />
            </Pagination>
          )}
        </TableContext.Consumer>
      </div>
    </TableControls>
    <TableContent />
  </Table>
);
WithControls.args = {
  sortable: true,
  selectable: true,
  columns,
  data: response.data.patientPagination.items,
  headerProps: { style: { background: '#f0f0f0' } },
  bodyProps: { style: {} },
};
WithControls.storyName = 'with controls';

export const WithScrollableContainer: Story = ({ sortable, selectable, columns, data, headerProps, bodyProps }) => (
  <ScrollableContainer>
    <Table
      initialState={{
        sortBy: [{ id: 'firstName', desc: false }],
      }}
      sortable={sortable}
      selectable={selectable}
      columns={columns}
      data={data}
      headerProps={headerProps}
      bodyProps={bodyProps}
    >
      <TableContent />
    </Table>
  </ScrollableContainer>
);
WithScrollableContainer.args = {
  sortable: false,
  selectable: false,
  columns,
  data: response.data.patientPagination.items,
  headerProps: { sticky: true, style: { background: '#333' } },
  bodyProps: { style: {} },
};
WithScrollableContainer.storyName = 'with scrollable container';
