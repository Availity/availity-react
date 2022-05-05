import React from 'react';
import { render, waitFor } from '@testing-library/react';
import every from 'lodash/every';
import basicData from './data/basicData.json';
import TableControls from '../Controls/TableControls';
import BulkTableActions from '../Controls/BulkTableActions';
import { Column } from '../types/ReactTable';
import TableSorter from '../Controls/TableSorter';
import Table from '../Table';

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
    onClick: (records?: Record<string, string | boolean | number>[]) => {
      if (!records) {
        return;
      }

      for (const record of records) {
        // eslint-disable-next-line no-console
        console.log(`action on record ${record?.id}`);
      }
    },
  },
  {
    id: 'action2',
    displayText: 'Action 2',
    onClick: (records?: Record<string, string>[]) => {
      if (!records) {
        return;
      }

      for (const record of records) {
        // eslint-disable-next-line no-console
        console.log(`action on record ${record?.id}`);
      }
    },
  },
];

describe('TableControls', () => {
  test('should render table controls with one child', () => {
    const { container } = render(
      <Table data={basicData} columns={basicColumns}>
        <TableControls>
          <BulkTableActions bulkActions={bulkActions} />
        </TableControls>
      </Table>
    );

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  test('should not render table controls when there is no table wrapper', async () => {
    const { queryByTestId } = render(
      <TableControls>
        <BulkTableActions bulkActions={bulkActions} />
      </TableControls>
    );

    const tableControlsEl = await waitFor(() => queryByTestId('test-controls-container'));
    expect(tableControlsEl).toBeNull();
  });

  test('should render table controls with two children', () => {
    const { container } = render(
      <Table data={basicData} columns={basicColumns}>
        <TableControls>
          <BulkTableActions bulkActions={bulkActions} />
          <TableSorter />
        </TableControls>
      </Table>
    );

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  test('should disable all records when disabled is true', async () => {
    const { container, getByTestId } = render(
      <Table data={basicData} columns={basicColumns}>
        <TableControls disabled>
          <BulkTableActions bulkActions={bulkActions} />
          <TableSorter />
        </TableControls>
      </Table>
    );

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();

    const bulkActionsBtn = await waitFor(() => getByTestId('bulk_actions_btn_group'));
    expect(bulkActionsBtn).not.toBeNull();
    expect(bulkActionsBtn).toHaveAttribute('disabled');

    const sorterInput = await waitFor(() => getByTestId('sorter_toggle'));
    expect(sorterInput).not.toBeNull();
    expect(sorterInput).toHaveAttribute('disabled');
  });

  test('should disable all records when disabled is false', async () => {
    const { container, getByTestId } = render(
      <Table data={basicData} columns={basicColumns}>
        <TableControls>
          <BulkTableActions bulkActions={bulkActions} />
          <TableSorter />
        </TableControls>
      </Table>
    );

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();

    const bulkActionsBtn = await waitFor(() => getByTestId('bulk_actions_btn_group'));
    expect(bulkActionsBtn).not.toBeNull();
    expect(bulkActionsBtn).not.toHaveAttribute('disabled');

    const sorterInput = await waitFor(() => getByTestId('sorter_toggle'));
    expect(sorterInput).not.toBeNull();
    expect(sorterInput).not.toHaveAttribute('disabled');
  });
});
