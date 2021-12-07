import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import basicData from './data/basicData.json';
import formattedData from './data/needsFormattedData.json';
import Table from '../Table';
import TableContextProvider from '../TableContextProvider';
import CurrencyCell from '../CellDefinitions/CurrencyCell';
import ActionCell from '../CellDefinitions/ActionCell';
import BadgeCell from '../CellDefinitions/BadgeCell';
import IconCell from '../CellDefinitions/IconCell';
import DateCell from '../CellDefinitions/DateCell';
import { Cell } from '../types/ReactTable';


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
];

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
    Cell: ({ row: { original } }: Cell) => (original ? BadgeCell('badge-success', original.badge) : null),
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
          isVisible: (record?: Record<string, unknown>) => !!record?.icon,
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

describe('Table', () => {
  test('should render basic table', () => {
    const { container } = render(<TableContextProvider records={basicData} columns={basicColumns}><Table /></TableContextProvider>);

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  test('should render selectable table', async () => {
    const { container } = render(
      <TableContextProvider selectable records={basicData} columns={basicColumns}><Table /></TableContextProvider>
    );

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();

  });

  test('should render sortable table', () => {
    const { container } = render(<TableContextProvider sortable records={basicData} columns={basicColumns}><Table /></TableContextProvider>);

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  test('should render with formatted cells', () => {
    const { container } = render(<TableContextProvider records={formattedData} columns={formattedColumns}><Table /></TableContextProvider>);

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  test('should render with expected ids', () => {
    const { container } = render(<TableContextProvider records={basicData} columns={basicColumns}><Table id="my_availity_table" /> </TableContextProvider>);

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  test('should call onRowClick when event is provided', async () => {
    const onRowClick = jest.fn();
    const { container, getByTestId } = render(
      <TableContextProvider records={basicData} columns={basicColumns}> <Table onRowClick={onRowClick} /></TableContextProvider>
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
      <TableContextProvider selectable records={basicData} columns={basicColumns}> <Table onRowClick={onRowClick} /></TableContextProvider>
    );

    expect(container).toBeDefined();

    const tableRow = getByTestId('table_row_0_cell_1');

    fireEvent.click(tableRow);

    await waitFor(() => {
      expect(onRowClick).toHaveBeenCalledTimes(1);
    });
  });
});
