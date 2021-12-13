import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import every from 'lodash/every';
import basicData from './data/basicData.json';
import TableControls from '../Controls/TableControls';
import BulkTableActions from '../Controls/BulkTableActions';
import TableProvider from '../TableProvider';
import { Column } from '../types/ReactTable';
import { TableContext } from '../TableContext';

const basicColumns = [
  {
    Header: 'First Name',
    accessor: 'first_name',
    defaultCanSort: true,
    disableSortBy: false,
  },
  {
    Header: 'Last Name',
    accessor: 'last_name',
    defaultCanSort: false,
    disableSortBy: true,
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
] as Column<Record<string, string | boolean | number>>[];

const bulkActions = [
  {
    id: 'action1',
    displayText: 'Action 1',
    isVisible: (records?: Record<string, string | boolean | number>[]) => every(records, { isActive: true }),
    onClick: jest.fn(),
  },
  {
    id: 'action2',
    displayText: 'Action 2',
    onClick: jest.fn(),
  },
];

describe('BulkTableActions', () => {
  test('should render default bulk actions', async () => {
    const { container, getByTestId } = render(
      <TableProvider data={basicData} columns={basicColumns}>
        <TableControls>
          <BulkTableActions bulkActions={bulkActions} />
        </TableControls>
      </TableProvider>
    );

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();

    const btnSelectDeselect = await waitFor(() => getByTestId('select_deselect_all_records'));
    expect(btnSelectDeselect).not.toBeNull();

    expect(btnSelectDeselect.textContent).toBe('0 Select All Records');
  });

  test('should render bulk actions with record name', async () => {
    const { getByTestId } = render(
      <TableProvider data={basicData} columns={basicColumns}>
        <TableControls>
          <BulkTableActions bulkActions={bulkActions} recordName="MyRecords" />
        </TableControls>
      </TableProvider>
    );

    const btnSelectDeselect = await waitFor(() => getByTestId('select_deselect_all_records'));
    expect(btnSelectDeselect).not.toBeNull();

    expect(btnSelectDeselect.textContent).toBe('0 Select All MyRecords');
  });

  test('should show number of selected records', async () => {
    const tableInstanceMock = {
      selectedFlatRows: [basicData[0]],
      data: basicData,
      columns: basicColumns,
    };

    const { getByTestId } = render(
      <TableContext.Provider
        value={{
          instance: tableInstanceMock,
        }}
      >
        <TableControls>
          <BulkTableActions bulkActions={bulkActions} />
        </TableControls>
      </TableContext.Provider>
    );

    const btnSelectDeselect = await waitFor(() => getByTestId('select_deselect_all_records'));
    expect(btnSelectDeselect).not.toBeNull();

    expect(btnSelectDeselect.textContent).toBe('1 Select All Records');
  });

  test('should call toggleAllRowsSelected when clicking button', async () => {
    const toggleAllRowsSelected = jest.fn();

    const tableInstanceMock = {
      selectedFlatRows: [basicData[0]],
      data: basicData,
      columns: basicColumns,
      toggleAllRowsSelected,
    };

    const { getByTestId } = render(
      <TableContext.Provider
        value={{
          instance: tableInstanceMock,
        }}
      >
        <TableControls>
          <BulkTableActions bulkActions={bulkActions} />
        </TableControls>
      </TableContext.Provider>
    );

    const btnSelectDeselect = await waitFor(() => getByTestId('select_deselect_all_records'));
    expect(btnSelectDeselect).not.toBeNull();

    fireEvent.click(btnSelectDeselect);

    await waitFor(() => {
      expect(toggleAllRowsSelected).toHaveBeenCalledTimes(1);
    });
  });

  test('should call bulk action when clicking event', async () => {
    const tableInstanceMock = {
      selectedFlatRows: [basicData[0]],
      data: basicData,
      columns: basicColumns,
    };

    const { getByTestId } = render(
      <TableContext.Provider
        value={{
          instance: tableInstanceMock,
        }}
      >
        <TableControls>
          <BulkTableActions bulkActions={bulkActions} />
        </TableControls>
      </TableContext.Provider>
    );

    const btnToggle = await waitFor(() => getByTestId('bulk_actions_toggle'));
    expect(btnToggle).not.toBeNull();
    fireEvent.click(btnToggle);

    const actionToDo = bulkActions[0];

    const btnAction = await waitFor(() => getByTestId(`bulk_action_${actionToDo.id}`));
    expect(btnAction).not.toBeNull();

    fireEvent.click(btnAction);

    await waitFor(() => {
      expect(actionToDo.onClick).toHaveBeenCalledTimes(1);
    });
  });
});
