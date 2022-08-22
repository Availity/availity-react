import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import basicData from './data/basicData.json';
import formattedData from './data/needsFormattedData.json';
import Table from '../Table';
import CurrencyCell from '../CellDefinitions/CurrencyCell';
import ActionCell from '../CellDefinitions/ActionCell';
import BadgeCell from '../CellDefinitions/BadgeCell';
import IconCell from '../CellDefinitions/IconCell';
import DateCell from '../CellDefinitions/DateCell';
import { Cell, Column } from '../types/ReactTable';
import TableContent from '../TableContent';

const basicColumns = [
  {
    Header: 'First Name',
    accessor: 'first_name',
    defaultCanSort: true,
    canCustomize: true,
  },
  {
    Header: 'Last Name',
    accessor: 'last_name',
    defaultCanSort: true,
    canCustomize: true,
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
] as Column<Record<string, string | boolean | number | undefined>>[];

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
    Cell: ({ row: { original } }: Cell<Record<string, string | undefined>>) =>
      original ? BadgeCell('badge-success', original.badge) : null,
  },
  {
    Header: 'Icon',
    accessor: 'icon',
    Cell: IconCell({ name: 'doc-alt', title: 'View Notes' }),
  },
  {
    Header: 'icon2',
    accessor: 'icon2',
    Cell: IconCell({
      name: 'doc-alt',
      getTitle: () => 'test',
    }),
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
          isVisible: (record?: Record<string, string | boolean | number>) => !!record?.icon,
          onClick: (record?: Record<string, string | boolean | number>) => {
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
          onClick: (record?: Record<string, string | boolean | number>) => {
            // eslint-disable-next-line no-console
            console.log(`action on record ${record?.id}`);
          },
        },
      ],
      primaryAction: {
        iconName: 'file-pdf',
        title: 'View File',
        isVisible: (record?: Record<string, string | boolean | number>) => !!record?.quickAction,
        onClick: (record?: Record<string, unknown>) => {
          // eslint-disable-next-line no-console
          console.log(`action on record ${record?.id}`);
        },
      },
    }),
  },
] as Column<Record<string, string | boolean | number | undefined>>[];

describe('Table', () => {
  test('should render basic table', () => {
    const { container } = render(<Table data={basicData} columns={basicColumns} />);

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  test('should render selectable table', async () => {
    const { container } = render(<Table selectable data={basicData} columns={basicColumns} />);

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  test('should render sortable table', () => {
    const { container } = render(
      <Table sortable data={basicData} columns={basicColumns}>
        <TableContent />
      </Table>
    );

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  test('should render with formatted cells', () => {
    const { container } = render(
      <Table data={formattedData} columns={formattedColumns}>
        <TableContent />
      </Table>
    );

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  test('should render with expected ids', () => {
    const { container } = render(<Table id="my_availity_table" data={basicData} columns={basicColumns} />);

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  test('should call onRowClick when event is provided', async () => {
    const onRowClick = jest.fn();
    const { container, getByTestId } = render(
      <Table onRowClick={onRowClick} data={basicData} columns={basicColumns} />
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
      <Table selectable onRowClick={onRowClick} data={basicData} columns={basicColumns} />
    );

    expect(container).toBeDefined();

    const tableRow = getByTestId('table_row_0_cell_1');

    fireEvent.click(tableRow);

    await waitFor(() => {
      expect(onRowClick).toHaveBeenCalledTimes(1);
    });
  });

  test('should call onRowSelected when provided', async () => {
    const onRowSelected = jest.fn();

    const { container, getByTestId } = render(
      <Table selectable onRowSelected={onRowSelected} data={basicData} columns={basicColumns} />
    );

    expect(container).toBeDefined();

    const tableRow = getByTestId('table_row_0_cell_0');
    fireEvent.click(tableRow);

    await waitFor(() => {
      expect(onRowSelected).toHaveBeenCalled();
    });
  });

  test('should sort table when clicking header', async () => {
    const onSort = jest.fn();

    const { container, getByTestId } = render(
      <Table onSort={onSort} sortable data={basicData} columns={basicColumns} manualSortBy />
    );

    expect(container).toBeDefined();

    const tableRow = getByTestId('table_header_row_0_cell_0_first_name');
    fireEvent.click(tableRow);

    await waitFor(() => {
      expect(onSort).toHaveBeenCalledTimes(1);
    });
  });

  test('should not display hidden columns', async () => {
    const columnsToUse = [
      ...basicColumns,
      {
        Header: 'Hidden',
        accessor: 'aPropThatIsHidden',
        hidden: true,
      },
    ];

    const { container, queryByTestId } = render(<Table data={basicData} columns={columnsToUse} />);

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();

    const columnHeader = queryByTestId('table_header_row_0_cell_4_aPropThatIsHidden');
    expect(columnHeader).toBeNull();
  });

  test('should not display primary action column when provided', async () => {
    const { container, queryByTestId } = render(<Table data={formattedData} columns={formattedColumns} />);

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();

    const primaryAction1 = queryByTestId('table_row_action_menu_item_0_primaryAction');
    expect(primaryAction1).not.toBeNull();

    const primaryAction2 = queryByTestId('table_row_action_menu_item_2_primaryAction');
    expect(primaryAction2).toBeNull();
  });
});
