import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Table, { ActionCell, BadgeCell, CurrencyCell, IconCell, DateCell } from '..';
import basicData from './data/basicData.json';
import formattedData from './data/needsFormattedData.json';

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
    Cell: ({ row: { original } }) => (original ? BadgeCell('badge-success', original.badge) : null),
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
          isVisible: (record) => record.icon,
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

describe('Table', () => {
  test('should render basic table', () => {
    const { container } = render(<Table records={basicData} columns={basicColumns} />);

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  test('should render selectable table', async () => {
    const onSelect = jest.fn();
    const { container, getByTestId } = render(
      <Table selectable records={basicData} columns={basicColumns} onRowSelected={onSelect} />
    );

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();

    const selectAllRecordsInput = getByTestId('table_header_select_all');
    fireEvent.click(selectAllRecordsInput);

    await waitFor(() => {
      expect(onSelect).toHaveBeenCalledTimes(2);
    });

    const selectFirstRecordInput = getByTestId('table_header_select_row_0');
    fireEvent.click(selectFirstRecordInput);

    await waitFor(() => {
      expect(onSelect).toHaveBeenCalledTimes(3);
    });
  });

  test('should render sortable table', () => {
    const { container } = render(<Table sortable records={basicData} columns={basicColumns} />);

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  test('should render with formatted cells', () => {
    const { container } = render(<Table records={formattedData} columns={formattedColumns} />);

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  test('should render with expected ids', () => {
    const { container } = render(<Table id="my_availity_table" records={basicData} columns={basicColumns} />);

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  test('should call onRowClick when event is provided', async () => {
    const onRowClick = jest.fn();
    const { container, getByTestId } = render(
      <Table records={basicData} columns={basicColumns} onRowClick={onRowClick} />
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
      <Table selectable records={basicData} columns={basicColumns} onRowClick={onRowClick} />
    );

    expect(container).toBeDefined();

    const tableRow = getByTestId('table_row_0_cell_1');

    fireEvent.click(tableRow);

    await waitFor(() => {
      expect(onRowClick).toHaveBeenCalledTimes(1);
    });
  });
});
