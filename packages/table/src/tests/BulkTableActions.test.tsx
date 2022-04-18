import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import every from 'lodash/every';
import basicData from './data/basicData.json';
import TableControls from '../Controls/TableControls';
import BulkTableActions from '../Controls/BulkTableActions';
import { Column } from '../types/ReactTable';
import Table from '../Table';
import TableContent from '../TableContent';

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
  {
    id: 'action2',
    displayText: 'Action 2',
    onClick: jest.fn(),
    isVisible: () => false,
  },
];

describe('BulkTableActions', () => {
  test('should render default bulk actions', async () => {
    const { container, getByTestId } = render(
      <Table data={basicData} columns={basicColumns}>
        <TableControls>
          <BulkTableActions bulkActions={bulkActions} />
        </TableControls>
      </Table>
    );

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();

    const btnSelectDeselect = await waitFor(() => getByTestId('select_deselect_all_records'));
    expect(btnSelectDeselect).not.toBeNull();

    expect(btnSelectDeselect.textContent).toBe('0 Select All Records');
  });

  test('should render bulk actions with record name', async () => {
    const { getByTestId } = render(
      <Table data={basicData} columns={basicColumns}>
        <TableControls>
          <BulkTableActions bulkActions={bulkActions} recordName="MyRecords" />
        </TableControls>
      </Table>
    );

    const btnSelectDeselect = await waitFor(() => getByTestId('select_deselect_all_records'));
    expect(btnSelectDeselect).not.toBeNull();

    expect(btnSelectDeselect.textContent).toBe('0 Select All MyRecords');
  });

  test('should show number of selected records', async () => {
    const { getByTestId } = render(
      <Table
        initialState={{
          selectedRowIds: { '1': true },
        }}
        data={basicData}
        columns={basicColumns}
      >
        <TableControls>
          <BulkTableActions bulkActions={bulkActions} />
        </TableControls>
        <TableContent />
      </Table>
    );

    const btnSelectDeselect = await waitFor(() => getByTestId('select_deselect_all_records'));
    expect(btnSelectDeselect).not.toBeNull();

    expect(btnSelectDeselect.textContent).toBe('1 Select All Records');
  });

  test('should show Deselect all rows when all rows are selected', async () => {
    const { getByTestId } = render(
      <Table
        initialState={{
          selectedRowIds: { '0': true, '1': true, '2': true },
        }}
        data={basicData}
        columns={basicColumns}
        paged={false}
      >
        <TableControls>
          <BulkTableActions bulkActions={bulkActions} />
        </TableControls>
        <TableContent />
      </Table>
    );

    const btnSelectDeselect = await waitFor(() => getByTestId('select_deselect_all_records'));
    expect(btnSelectDeselect).not.toBeNull();

    expect(btnSelectDeselect.textContent).toBe('3 Deselect All Records');
  });

  test('should call bulk action when clicking event', async () => {

    const { getByTestId } = render(
      <Table
        initialState={{
          selectedRowIds: { '1': true },
        }}
        data={basicData}
        columns={basicColumns}
      >
        <TableControls>
          <BulkTableActions bulkActions={bulkActions} />
        </TableControls>
        <TableContent />
      </Table>
    );

    const btnToggle = await waitFor(() => getByTestId('bulk_actions_toggle'));
    expect(btnToggle).not.toBeNull();
    fireEvent.click(btnToggle);

    const actionToDo = bulkActions[1];

    const btnAction = await waitFor(() => getByTestId(`bulk_action_${actionToDo.id}`));
    expect(btnAction).not.toBeNull();

    fireEvent.click(btnAction);

    await waitFor(() => {
      expect(actionToDo.onClick).toHaveBeenCalledTimes(1);
    });
  });

  test('should fire onRecordsSelected when provided', async () => {
    const onRowsSelected = jest.fn();

    const { getByTestId } = render(
      <Table
        initialState={{
          selectedRowIds: { '1': true },
        }}
        data={basicData}
        columns={basicColumns}
      >
        <TableControls>
          <BulkTableActions bulkActions={bulkActions} onRecordsSelected={onRowsSelected} />
        </TableControls>
        <TableContent />
      </Table>
    );

    const btnSelectDeselect = await waitFor(() => getByTestId('select_deselect_all_records'));
    expect(btnSelectDeselect).not.toBeNull();

    fireEvent.click(btnSelectDeselect);

    await waitFor(() => {
      expect(onRowsSelected).toHaveBeenCalled();
    });
  });
});
