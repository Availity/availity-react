import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import basicData from './data/basicData.json';
import formattedData from './data/needsFormattedData.json';
import Table from '../Table';
import TableProvider from '../TableProvider';
import CurrencyCell from '../CellDefinitions/CurrencyCell';
import ActionCell from '../CellDefinitions/ActionCell';
import BadgeCell from '../CellDefinitions/BadgeCell';
import IconCell from '../CellDefinitions/IconCell';
import DateCell from '../CellDefinitions/DateCell';
import { Cell, Column } from '../types/ReactTable';

const basicColumns = [
  {
    Header: 'First Name',
    accessor: 'first_name',
  },
  {
    Header: 'Last Name',
    accessor: 'last_name',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
] as Column<any>[];

const formattedColumns = [
  {
    Header: 'Basic Text',
    accessor: 'text',
  },
  {
    Header: 'Currency',
    accessor: 'currency',
    Cell: CurrencyCell({}),
  },
  {
    Header: 'Badge',
    accessor: 'badge',
    Cell: ({ row: { original } }: Cell<any>) => (original ? BadgeCell('badge-success', original.badge) : null),
  },
  {
    Header: 'Icon',
    accessor: 'icon',
    Cell: IconCell({ name: 'doc-alt', title: 'View Notes' }),
  },
  {
    Header: 'Date',
    accessor: 'date',
    Cell: DateCell({ dateFormat: 'MM/DD/yyyy' }),
  },
  {
    id: 'actions',
    Header: 'Actions',
    canSort: false,
    Cell: ActionCell({
      actions: [
        {
          id: 'action1',
          displayText: 'Action 1',
          isVisible: (record?: any) => !!record?.icon,
          onClick: (record?: any) => {
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
          onClick: (record?: any) => {
            // eslint-disable-next-line no-console
            console.log(`action on record ${record?.id}`);
          },
        },
      ],
    }),
  },
] as Column<any>[];

describe('Table', () => {
  test('should render basic table', () => {
    const { container } = render(
      <TableProvider data={basicData} columns={basicColumns}>
        <Table />
      </TableProvider>
    );

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  test('should render selectable table', async () => {
    const { container } = render(
      <TableProvider selectable data={basicData} columns={basicColumns}>
        <Table />
      </TableProvider>
    );

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  test('should render sortable table', () => {
    const { container } = render(
      <TableProvider sortable data={basicData} columns={basicColumns}>
        <Table />
      </TableProvider>
    );

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  test('should render with formatted cells', () => {
    const { container } = render(
      <TableProvider data={formattedData} columns={formattedColumns}>
        <Table />
      </TableProvider>
    );

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  test('should render with expected ids', () => {
    const { container } = render(
      <TableProvider data={basicData} columns={basicColumns}>
        <Table id="my_availity_table" />{' '}
      </TableProvider>
    );

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  test('should call onRowClick when event is provided', async () => {
    const onRowClick = jest.fn();
    const { container, getByTestId } = render(
      <TableProvider data={basicData} columns={basicColumns}>
        {' '}
        <Table onRowClick={onRowClick} />
      </TableProvider>
    );

    expect(container).toBeDefined();

    const tableRow = getByTestId('table_row_0');

    fireEvent.click(tableRow);

    await waitFor(() => {
      expect(onRowClick).toHaveBeenCalledTimes(1);
    });
  });

  test('should call onRowClick when event is provided for selectable table', async () => {
    const onRowClick = jest.fn();
    const { container, getByTestId } = render(
      <TableProvider selectable data={basicData} columns={basicColumns}>
        {' '}
        <Table onRowClick={onRowClick} />
      </TableProvider>
    );

    expect(container).toBeDefined();

    const tableRow = getByTestId('table_row_0_cell_1');

    fireEvent.click(tableRow);

    await waitFor(() => {
      expect(onRowClick).toHaveBeenCalledTimes(1);
    });
  });
});