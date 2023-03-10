import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Popper from 'popper.js';
import { act } from 'react-dom/test-utils';

import basicData from './data/basicData.json';
import formattedData from './data/needsFormattedData.json';
import Table from '../Table';
import CurrencyCell from '../CellDefinitions/CurrencyCell';
import ActionCell from '../CellDefinitions/ActionCell';
import BadgeCell from '../CellDefinitions/BadgeCell';
import IconCell from '../CellDefinitions/IconCell';
import DateCell from '../CellDefinitions/DateCell';
import DefaultValueCell from '../CellDefinitions/DefaultValueCell';
import IconWithTooltipCell from '../CellDefinitions/IconWIthTooltipCell';
import { Cell, Column } from '../types/ReactTable';
import TableContent from '../TableContent';
import TableActionMenu, { TableActionMenuProps } from '../TableActionMenu';

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
    Header: 'Icon With Tooltip',
    accessor: 'iconWithTooltip',
    Cell: IconWithTooltipCell({
      name: 'ok',
      getId: (row) => `IconWithTooltip_${row.id}`,
      tooltipText: (value) => `IconWithTooltip: ${value}`,
      defaultValue: 'Not Available',
    }),
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

jest.mock('popper.js', () => {
  const PopperJS = jest.requireActual('popper.js');

  return class {
    static placements = PopperJS.placements;

    constructor() {
      return {
        destroy: () => {},
        scheduleUpdate: jest.fn(),
      };
    }
  };
});

describe('Table', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

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

  test('should not display primary action column when not provided', async () => {
    const { container, queryByTestId } = render(<Table data={formattedData} columns={formattedColumns} />);

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();

    const primaryAction1 = queryByTestId('table_row_action_menu_item_0_primaryAction');
    expect(primaryAction1).not.toBeNull();

    const primaryAction2 = queryByTestId('table_row_action_menu_item_2_primaryAction');
    expect(primaryAction2).toBeNull();
  });

  test('should display defaultValue when provided for formatted cells', async () => {
    const defaultValue = 'Not Available';
    const columDefs = [
      {
        Header: 'Currency',
        accessor: 'currency',
        Cell: CurrencyCell({ defaultValue }),
      },
      {
        Header: 'Badge Cell',
        accessor: 'badge',
        Cell: BadgeCell('success', '', 'Not Available'),
      },
      {
        Header: 'Icon',
        accessor: 'icon',
        Cell: IconCell({ name: 'doc-alt', title: 'View Notes', defaultValue }),
      },
      {
        Header: 'icon2',
        accessor: 'icon2',
        Cell: IconCell({
          name: 'doc-alt',
          getTitle: () => 'test',
          defaultValue,
        }),
      },
      {
        Header: 'Icon With Tooltip',
        accessor: 'iconWithTooltip',
        Cell: IconWithTooltipCell({
          name: 'ok',
          getId: (row) => `IconWithTooltip_${row.id}`,
          tooltipText: (value) => `IconWithTooltip: ${value}`,
          defaultValue: 'Not Available',
        }),
      },
      {
        Header: 'Date',
        accessor: 'date',
        Cell: DateCell({ dateFormat: 'MM/DD/yyyy', defaultValue }),
      },
    ] as Column<Record<string, string | boolean | number | undefined>>[];

    const currentData = [
      {
        id: '1',
        currency: '',
        badge: '',
        icon: undefined,
        icon2: undefined,
        iconWithTooltip: undefined,
        date: '',
      },
    ];

    render(
      <Table data={currentData} columns={columDefs}>
        <TableContent />
      </Table>
    );

    const currencyCell = screen.getByTestId('table_row_0_cell_0');
    expect(currencyCell.textContent).toBe(defaultValue);

    const badgeCell = screen.getByTestId('table_row_0_cell_1');
    expect(badgeCell.textContent).toBe(defaultValue);

    const iconCell1 = screen.getByTestId('table_row_0_cell_2');
    expect(iconCell1.textContent).toBe(defaultValue);

    const iconCell2 = screen.getByTestId('table_row_0_cell_3');
    expect(iconCell2.textContent).toBe(defaultValue);

    const iconCell3 = screen.getByTestId('table_row_0_cell_4');
    expect(iconCell3.textContent).toBe(defaultValue);

    const dateCell = screen.getByTestId('table_row_0_cell_5');
    expect(dateCell.textContent).toBe(defaultValue);
  });

  test('should display badge when no display text is provided', async () => {
    const columDefs = [
      {
        Header: 'Badge Cell',
        accessor: 'badge',
        Cell: BadgeCell('success'),
      },
    ] as Column<Record<string, string | boolean | number | undefined>>[];

    const currentData = [
      {
        id: '1',
        badge: 'Test',
      },
    ];

    render(
      <Table data={currentData} columns={columDefs}>
        <TableContent />
      </Table>
    );

    const badgeCell = screen.getByTestId('table_row_0_cell_0');
    expect(badgeCell.textContent).toBe(currentData[0].badge);
  });

  test('should add style and width to tds when useColumnWidths = true', async () => {
    const columDefs = [
      {
        Header: 'Value 1',
        accessor: 'val1',
        width: 200,
        minWidth: 300,
        maxWidth: 400,
      },
      {
        Header: 'Value 2',
        accessor: 'val2',
        width: 100,
        minWidth: 200,
        maxWidth: 300,
      },
    ] as Column<Record<string, string | boolean | number | undefined>>[];

    const currentData = [
      {
        id: '1',
        val1: 'Something',
        val2: 'Something else',
      },
      {
        id: '2',
        val1: 'Something else entirely',
        val2: 'Something else again',
      },
    ];

    render(
      <Table data={currentData} columns={columDefs} useColumnWidths defaultColumn={{ width: 'auto' }}>
        <TableContent />
      </Table>
    );

    await waitFor(() => {
      const cell1 = screen.getByTestId('table_row_1_cell_0');
      expect(cell1).toHaveAttribute('style', 'width: 200px; min-width: 300px; max-width: 400px;');

      const cell2 = screen.getByTestId('table_row_1_cell_1');
      expect(cell2).toHaveAttribute('style', 'width: 100px; min-width: 200px; max-width: 300px;');
    });
  });

  test('should not add style and width to tds when useColumnWidths = false', async () => {
    const columDefs = [
      {
        Header: 'Value 1',
        accessor: 'val1',
      },
      {
        Header: 'Value 2',
        accessor: 'val2',
      },
    ] as Column<Record<string, string | boolean | number | undefined>>[];

    const currentData = [
      {
        id: '1',
        val1: 'Something',
        val2: 'Something else',
      },
      {
        id: '2',
        val1: 'Something else entirely',
        val2: 'Something else again',
      },
    ];

    render(
      <Table data={currentData} columns={columDefs} defaultColumn={{ width: 'auto' }}>
        <TableContent />
      </Table>
    );

    await waitFor(() => {
      const cell1 = screen.getByTestId('table_row_1_cell_0');
      expect(cell1).not.toHaveAttribute('style');

      const cell2 = screen.getByTestId('table_row_1_cell_1');
      expect(cell2).not.toHaveAttribute('style');
    });
  });

  test('should populate footer when provided', async () => {
    const columDefs = [
      {
        Header: 'Value 1',
        accessor: 'val1',
        Footer: 'VAL 1 FOOT',
      },
      {
        Header: 'Value 2',
        accessor: 'val2',
        Footer: 'VAL 2 FOOT',
      },
    ] as Column<Record<string, string | boolean | number | undefined>>[];

    const currentData = [
      {
        id: '1',
        val1: 'Something',
        val2: 'Something else',
      },
      {
        id: '2',
        val1: 'Something else entirely',
        val2: 'Something else again',
      },
    ];

    render(
      <Table data={currentData} columns={columDefs} footer>
        <TableContent />
      </Table>
    );

    await waitFor(() => {
      expect(screen.getByTestId('table_footer')).not.toBeNull();
      expect(screen.getByTestId('table_footer_row')).not.toBeNull();

      const footerVal1 = screen.getByTestId('table_footer_row_val1');
      expect(footerVal1).not.toBeNull();
      expect(footerVal1).toHaveTextContent('VAL 1 FOOT');

      const footerVal2 = screen.getByTestId('table_footer_row_val2');
      expect(footerVal2).not.toBeNull();
      expect(footerVal2).toHaveTextContent('VAL 2 FOOT');
    });
  });

  test('should pass in cellProps when getCellProps is provided', async () => {
    const getCellProps = () => ({ style: { color: 'rgb(255, 255, 255)' } });

    render(<Table data={basicData} columns={basicColumns} getCellProps={getCellProps} />);

    await waitFor(() => {
      const cells = screen.getAllByRole('cell');

      for (const cell of cells) {
        expect(cell).toHaveStyle('color: rgb(255, 255, 255);');
      }
    });
  });

  test('should merge getCellProps and column widths', async () => {
    const getCellProps = () => ({ style: { color: 'rgb(255, 255, 255)' } });

    const columDefs = [
      {
        Header: 'Value 1',
        accessor: 'val1',
        width: 200,
        minWidth: 300,
        maxWidth: 400,
      },
      {
        Header: 'Value 2',
        accessor: 'val2',
        width: 100,
        minWidth: 200,
        maxWidth: 300,
      },
    ] as Column<Record<string, string | boolean | number | undefined>>[];

    const currentData = [
      {
        id: '1',
        val1: 'Something',
        val2: 'Something else',
      },
      {
        id: '2',
        val1: 'Something else entirely',
        val2: 'Something else again',
      },
    ];

    render(
      <Table
        data={currentData}
        columns={columDefs}
        getCellProps={getCellProps}
        useColumnWidths
        defaultColumn={{ width: 'auto' }}
      />
    );

    await waitFor(() => {
      const cells = screen.getAllByRole('cell');

      for (const cell of cells) {
        expect(cell).toHaveStyle('color: rgb(255, 255, 255);');
      }

      const cell1 = screen.getByTestId('table_row_1_cell_0');
      expect(cell1).toHaveStyle('width: 200px; min-width: 300px; max-width: 400px;');

      const cell2 = screen.getByTestId('table_row_1_cell_1');
      expect(cell2).toHaveStyle('width: 100px; min-width: 200px; max-width: 300px;');
    });
  });
});

const mockChildComponent = jest.fn();
jest.mock('../TableActionMenu', () => ({
  __esModule: true,
  default: (props: TableActionMenuProps) => {
    mockChildComponent(props);
    return <div>{props.children}</div>;
  },
}));

describe('ActionCell', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should allow displayText to be set via a function for action', async () => {
    const columDefs = [
      {
        id: 'actions',
        Header: 'Actions',
        Cell: ActionCell({
          actions: [
            {
              id: 'myAction',
              displayText: (record: Record<string, string | boolean | number | undefined>) =>
                record?.conditionalValue ? 'THIS' : 'OR_THIS',
            },
          ],
        }),
      },
    ] as Column<Record<string, string | boolean | number | undefined>>[];

    const currentData = [
      {
        id: '1',
        conditionalValue: false,
      },
      {
        id: '2',
        conditionalValue: true,
      },
    ];

    render(
      <Table data={currentData} columns={columDefs}>
        <TableContent />
      </Table>
    );

    await waitFor(() => {
      const actionItem1 = screen.getByTestId('table_row_action_menu_item_0_action_myAction');
      expect(actionItem1).not.toBeNull();

      expect(actionItem1).toHaveTextContent('OR_THIS');

      const actionItem2 = screen.getByTestId('table_row_action_menu_item_1_action_myAction');
      expect(actionItem2).not.toBeNull();

      expect(actionItem2).toHaveTextContent('THIS');
    });
  });

  test('should set modifiers when isSticky is true', async () => {
    const columDefs = [
      {
        id: 'actions',
        Header: 'Actions',
        Cell: ActionCell({
          isSticky: true,
          actions: [
            {
              id: 'myAction',
              displayText: 'My Action',
            },
          ],
        }),
      },
    ] as Column<Record<string, string | boolean | number | undefined>>[];

    const currentData = [
      {
        id: '1',
        conditionalValue: false,
      },
    ];

    render(
      <Table data={currentData} columns={columDefs}>
        <TableContent />
      </Table>
    );

    await waitFor(() => {
      expect(mockChildComponent).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          dropdownMenuProps: {
            modifiers: expect.objectContaining({
              eventListeners: expect.objectContaining({
                scroll: false,
              }),
              maintainInitialPosition: expect.objectContaining({ enabled: true }),
            }),
          },
        })
      );
    });
  });

  test('should set modifiers when isSticky is false', async () => {
    const columDefs = [
      {
        id: 'actions',
        Header: 'Actions',
        Cell: ActionCell({
          isSticky: false,
          actions: [
            {
              id: 'myAction',
              displayText: 'My Action',
            },
          ],
        }),
      },
    ] as Column<Record<string, string | boolean | number | undefined>>[];

    const currentData = [
      {
        id: '1',
        conditionalValue: false,
      },
    ];

    render(
      <Table data={currentData} columns={columDefs}>
        <TableContent />
      </Table>
    );

    await waitFor(() => {
      expect(mockChildComponent).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          dropdownMenuProps: {
            modifiers: expect.objectContaining({
              eventListeners: expect.objectContaining({
                scroll: true,
              }),
              maintainInitialPosition: expect.objectContaining({ enabled: false }),
            }),
          },
        })
      );
    });
  });

  test('should allow display text to be set via a function for primary action', async () => {
    const columDefs = [
      {
        id: 'actions',
        Header: 'Actions',
        Cell: ActionCell({
          actions: [],
          primaryAction: {
            iconName: (record?: Record<string, string | boolean | number>) =>
              record?.conditionalValue ? 'THIS' : 'OR_THIS',
            title: (record?: Record<string, string | boolean | number>) =>
              record?.conditionalValue ? 'THIS' : 'OR THIS',
            isVisible: (record?: Record<string, string | boolean | number>) => !!record?.quickAction,
            onClick: (record?: Record<string, unknown>) => {
              // eslint-disable-next-line no-console
              console.log(`action on record ${record?.id}`);
            },
          },
        }),
      },
    ] as Column<Record<string, string | boolean | number | undefined>>[];

    const currentData = [
      {
        id: '1',
        conditionalValue: false,
        quickAction: true,
      },
      {
        id: '2',
        conditionalValue: true,
        quickAction: true,
      },
    ];

    render(
      <Table data={currentData} columns={columDefs}>
        <TableContent />
      </Table>
    );

    const primaryActionIcon1 = screen.getByTestId(`table_row_action_menu_item_0_primaryAction`);
    expect(primaryActionIcon1).not.toBeNull();
    expect(primaryActionIcon1).toHaveAttribute('class', 'icon icon-OR_THIS');

    userEvent.hover(screen.getByTestId('table_row_action_menu_item_0_primaryAction'));

    await waitFor(() => {
      const icon1Tooltip = screen.getByRole('tooltip');
      expect(icon1Tooltip).toHaveTextContent('OR THIS');
    });

    const primaryActionIcon2 = screen.getByTestId(`table_row_action_menu_item_1_primaryAction`);
    expect(primaryActionIcon2).not.toBeNull();
    expect(primaryActionIcon2).toHaveAttribute('class', 'icon icon-THIS');

    userEvent.hover(screen.getByTestId('table_row_action_menu_item_1_primaryAction'));

    await waitFor(() => {
      const icon1Tooltip = screen.getByRole('tooltip');
      expect(icon1Tooltip).toHaveTextContent('THIS');
    });
  });

  test('should call action on primary action click', async () => {
    const action = jest.fn();

    const columDefs = [
      {
        id: 'actions',
        Header: 'Actions',
        Cell: ActionCell({
          actions: [],
          primaryAction: {
            iconName: 'heart',
            title: 'action',

            onClick: action,
          },
        }),
      },
    ] as Column<Record<string, string | boolean | number | undefined>>[];

    const currentData = [
      {
        id: '1',
        conditionalValue: false,
        quickAction: true,
      },
      {
        id: '2',
        conditionalValue: true,
        quickAction: true,
      },
    ];

    render(
      <Table data={currentData} columns={columDefs}>
        <TableContent />
      </Table>
    );

    const primaryActionIcon1 = screen.getByTestId(`table_row_action_menu_item_0_primaryAction`);
    expect(primaryActionIcon1).not.toBeNull();

    fireEvent.click(primaryActionIcon1);

    await waitFor(() => {
      expect(action).toHaveBeenCalled();
    });
  });
});

describe('DefaultValueCell', () => {
  test('should show default value when value is undefined', () => {
    const DEFAULT_TEXT = 'Not Available';
    const columDefs = [
      {
        accessor: 'conditionalValue',
        Header: 'Default',
        Cell: DefaultValueCell({ defaultValue: DEFAULT_TEXT }),
      },
    ] as Column<Record<string, string | boolean | number | undefined>>[];

    const currentData = [
      {
        id: '1',
        conditionalValue: undefined,
      },
    ];

    render(
      <Table data={currentData} columns={columDefs}>
        <TableContent />
      </Table>
    );

    const cell1 = screen.getByTestId('table_row_0_cell_0');
    expect(cell1.textContent).toBe(DEFAULT_TEXT);
  });

  test('should not display default value when value is provided', () => {
    const DEFAULT_TEXT = 'Not Available';
    const columDefs = [
      {
        accessor: 'conditionalValue',
        Header: 'Default1',
        Cell: DefaultValueCell({ defaultValue: DEFAULT_TEXT }),
      },
    ] as Column<Record<string, string | boolean | number | undefined>>[];

    const currentData = [
      {
        id: '1',
        conditionalValue: 'Something here',
      },
    ];

    render(
      <Table data={currentData} columns={columDefs}>
        <TableContent />
      </Table>
    );

    const cell1 = screen.getByTestId('table_row_0_cell_0');
    expect(cell1.textContent).not.toBe(DEFAULT_TEXT);
    expect(cell1.textContent).toBe('Something here');
  });

  test('should render default value when it is a component', () => {
    const DEFAULT_TEXT_EL = (): JSX.Element => <div data-testid="default-text">Not Available</div>;

    const columDefs = [
      {
        accessor: 'conditionalValue',
        Header: 'Default1',
        Cell: DefaultValueCell({ defaultValue: <DEFAULT_TEXT_EL /> }),
      },
    ] as Column<Record<string, string | boolean | number | undefined>>[];

    const currentData = [
      {
        id: '1',
        conditionalValue: undefined,
      },
    ];

    render(
      <Table data={currentData} columns={columDefs}>
        <TableContent />
      </Table>
    );

    const cell1 = screen.getByTestId('table_row_0_cell_0');
    expect(cell1.querySelector('[data-testid=default-text]')).not.toBeNull();
  });

  test('should render default value when it is html', () => {
    const columDefs = [
      {
        accessor: 'conditionalValue',
        Header: 'Default1',
        Cell: DefaultValueCell({ defaultValue: <div data-testid="default-text">Not Available</div> }),
      },
    ] as Column<Record<string, string | boolean | number | undefined>>[];

    const currentData = [
      {
        id: '1',
        conditionalValue: undefined,
      },
    ];

    render(
      <Table data={currentData} columns={columDefs}>
        <TableContent />
      </Table>
    );

    const cell1 = screen.getByTestId('table_row_0_cell_0');
    expect(cell1.querySelector('[data-testid=default-text]')).not.toBeNull();
  });

  test('should just display empty string when no default value is provided', () => {
    const columDefs = [
      {
        accessor: 'conditionalValue',
        Header: 'Default1',
        Cell: DefaultValueCell({}),
      },
    ] as Column<Record<string, string | boolean | number | undefined>>[];

    const currentData = [
      {
        id: '1',
        conditionalValue: undefined,
      },
    ];

    render(
      <Table data={currentData} columns={columDefs}>
        <TableContent />
      </Table>
    );

    const cell1 = screen.getByTestId('table_row_0_cell_0');
    expect(cell1).toHaveTextContent('');
  });
});
