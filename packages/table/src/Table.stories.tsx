import React, { useEffect, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { ArgsTable } from '@storybook/addon-docs';

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
  CurrencyCell,
  IconWithTooltipCell,
  CommonTableProps,
} from '.';
import '../styles.scss';

const defaultColumn = {
  width: 'auto',
};

const columns = [
  {
    Header: 'First Name',
    accessor: 'firstName',
    Footer: 'First Name',
    defaultCanSort: true,
    disableSortBy: false,
    width: 200,
    minWidth: 200,
    maxWidth: 200,
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
    Footer: 'Last Name',
    defaultCanSort: true,
    disableSortBy: false,
  },
  {
    Header: 'Birth Date',
    accessor: 'birthDate',
    Footer: 'Birth Date',
    defaultCanSort: true,
    disableSortBy: false,
    Cell: DateCell({ dateFormat: 'MM/DD/yyyy', defaultValue: <span className="text-muted">Not Available</span> }),
  },
  {
    Header: 'Subscriber Relationship',
    accessor: 'subscriberRelationship',
    Footer: 'Subscriber Relationship',
    defaultCanSort: true,
    disableSortBy: false,
    Cell: BadgeCell('primary', undefined, <span className="text-muted">Not Available</span>),
  },
  {
    Header: 'Currency Cell',
    accessor: 'amount',
    Footer: (info: any) => {
      const total = React.useMemo(
        () => info.rows.reduce((sum: number) => Number.parseFloat(info.rows[0].original.amount) + sum, 0),
        [info.rows]
      );

      return <>Total: {total.toFixed(2)}</>;
    },
    defaultCanSort: true,
    disableSortBy: false,
    Cell: CurrencyCell({ defaultValue: <span className="text-muted">Not Available</span> }),
  },
  {
    Header: 'Has Middle Name',
    accessor: 'middleName',
    defaultCanSort: true,
    disableSortBy: false,
    Cell: IconWithTooltipCell({
      name: 'ok',
      getId: (row) => `IconHasMiddleName_${row.id}`,
      tooltipText: (value) => `Middle Name: ${value}`,
      defaultValue: 'Not Available',
    }),
  },
  {
    id: 'actions',
    Header: 'Actions',
    className: 'action-column',
    minWidth: 96,
    width: 96,
    maxWidth: 96,
    Cell: ActionCell({
      isSticky: true,
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
      primaryAction: {
        iconName: 'file-pdf',
        title: 'View File',
        onClick: (record?: Record<string, unknown>) => {
          // eslint-disable-next-line no-console
          console.log(`action on record ${record?.id}`);
        },
      },
    }),
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

export const BasicTable: Story = ({
  sortable,
  selectable,
  columns,
  data,
  headerProps,
  bodyProps,
  footer,
  useColumnWidths,
}) => {
  const [records, setRecords] = useState([]);
  const [selectedRows, setSelectedRow] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRecords(data);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const onRowSelected = (event: any) => {
    setSelectedRow(event.selectedRows);
  };

  return (
    <>
      {selectable && (
        <>
          Selected Rows:
          <ul>
            {selectedRows.map((row: any) => (
              <li key={row.id}>{row.id}</li>
            ))}
          </ul>
        </>
      )}
      <Table
        initialState={{
          sortBy: [{ id: 'firstName', desc: false }],
        }}
        footer={footer}
        sortable={sortable}
        selectable={selectable}
        columns={columns}
        data={records}
        headerProps={headerProps}
        bodyProps={bodyProps}
        defaultColumn={defaultColumn}
        onRowSelected={onRowSelected}
        useColumnWidths={useColumnWidths}
      />
    </>
  );
};
BasicTable.args = {
  sortable: true,
  selectable: true,
  columns,
  data: response.data.patientPagination.items.map((d) => ({ ...d, amount: 2.45 })),
  headerProps: { style: { background: 'gray' } },
  bodyProps: { style: {} },
  footer: false,
  useColumnWidths: false,
};
BasicTable.storyName = 'basic';

export const WithAdditionalContent: Story = ({ columns, data }) => {
  const AdditionalContent = (): JSX.Element => (
    <div>This is some additional content that should be displayed inside the cell.</div>
  );

  const [records, setRecords] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRecords(data);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Table
      initialState={{
        sortBy: [{ id: 'firstName', desc: false }],
      }}
      columns={columns}
      data={records}
      defaultColumn={defaultColumn}
      additionalContent={AdditionalContent}
    />
  );
};
WithAdditionalContent.args = {
  columns,
  data: response.data.patientPagination.items.map((d) => ({ ...d, amount: 2.45 })),
};
WithAdditionalContent.storyName = 'with additional content';

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
    selectionColumnProps={{ width: 50 }}
    columns={columns}
    data={data}
    headerProps={headerProps}
    bodyProps={bodyProps}
    defaultColumn={defaultColumn}
    onRowSelected={(event) => {
      // eslint-disable-next-line no-console
      console.log('Row selected', event);
    }}
  >
    <TableControls className="pb-2">
      <BulkTableActions color="light" bulkActions={bulkActions} dropdownMenuProps={{ right: true }} />
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
  data: response.data.patientPagination.items.map((d) => ({ ...d, amount: '' })),
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
  data: response.data.patientPagination.items.map((d) => ({ ...d, amount: undefined })),
  headerProps: { sticky: true, style: { background: '#fff' } },
  bodyProps: { style: {} },
};
WithScrollableContainer.storyName = 'with scrollable container';

export const hidden_avTable = (props: CommonTableProps<any>) => <Table data={[]} columns={[]} {...props} />;

export const PropsStory: Story = () => (
  <>
    <hr />
    <h4>Availity Props</h4>
    <h5>Table</h5>
    <ArgsTable of={hidden_avTable} />
  </>
);
PropsStory.storyName = 'props';
PropsStory.parameters = {
  previewTabs: {
    canvas: { hidden: true },
  },
  viewMode: 'docs',
};
