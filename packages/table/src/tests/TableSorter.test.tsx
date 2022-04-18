import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import basicData from './data/basicData.json';
import TableControls from '../Controls/TableControls';
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

describe('TableSorter', () => {
  test('should render table Sorter', async () => {
    const { container, getByTestId } = render(
      <Table sortable data={basicData} columns={basicColumns}>
        <TableControls>
          <TableSorter />
        </TableControls>
      </Table>
    );

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();

    const sorterInputGrp = await waitFor(() => getByTestId('sorter_input_group'));
    expect(sorterInputGrp).not.toBeNull();
  });

  test('should render sort options in dropdown menu', async () => {
    const { container, getByTestId } = render(
      <Table
        sortable
        data={basicData}
        columns={basicColumns}
        initialState={{
          sortBy: [{ id: 'first_name', desc: true }],
        }}
      >
        <TableControls>
          <TableSorter />
        </TableControls>
      </Table>
    );

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();

    const sorterMenu = await waitFor(() => getByTestId('sorter_menu'));
    expect(sorterMenu).not.toBeNull();

    const sorterMenuItem = await waitFor(() => getByTestId('sorter_menu_first_name'));
    expect(sorterMenuItem).not.toBeNull();
  });

  test('should show descending icon', async () => {
    const { container, getByTestId } = render(
      <Table
        initialState={{
          sortBy: [{ id: 'first_name', desc: true }],
        }}
        sortable
        data={basicData}
        columns={basicColumns}
      >
        <TableControls>
          <TableSorter />
        </TableControls>
      </Table>
    );

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();

    const sorterToggleButton = await waitFor(() => getByTestId('btn_toggle_sort_dir_icon'));
    expect(sorterToggleButton).not.toBeNull();
    expect(sorterToggleButton.className).toBe('icon icon-sort-alt-down');
  });

  test('should show ascending icon', async () => {
    const { container, getByTestId } = render(
      <Table
        initialState={{
          sortBy: [{ id: 'first_name', desc: false }],
        }}
        sortable
        data={basicData}
        columns={basicColumns}
      >
        <TableControls>
          <TableSorter />
        </TableControls>
      </Table>
    );

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();

    const sorterToggleButton = await waitFor(() => getByTestId('btn_toggle_sort_dir_icon'));
    expect(sorterToggleButton).not.toBeNull();
    expect(sorterToggleButton.className).toBe('icon icon-sort-alt-up');
  });

  test('should sort on dropdown select', async () => {
    const onSort = jest.fn();

    const { getByTestId } = render(
      <Table sortable data={basicData} columns={basicColumns}>
        <TableControls>
          <TableSorter onSort={onSort} />
        </TableControls>
      </Table>
    );

    const btnDropdownToggle = await waitFor(() => getByTestId('sorter_toggle'));
    expect(btnDropdownToggle).not.toBeNull();
    fireEvent.click(btnDropdownToggle);

    const btnAction = await waitFor(() => getByTestId('sorter_menu_first_name'));
    expect(btnAction).not.toBeNull();

    fireEvent.click(btnAction);

    await waitFor(() => {
      expect(onSort).toHaveBeenCalledTimes(1);
    });
  });

  test('should populate sortOptions when provided', async () => {
    const onSort = jest.fn();

    const { getByTestId } = render(
      <Table sortable data={basicData} columns={basicColumns}>
        <TableControls>
          <TableSorter
            onSort={onSort}
            sortOptions={[
              { value: 'last_name', label: 'Last name' },
            ]}
          />
        </TableControls>
      </Table>
    );

    const btnDropdownToggle = await waitFor(() => getByTestId('sorter_toggle'));
    expect(btnDropdownToggle).not.toBeNull();
    fireEvent.click(btnDropdownToggle);

    const btnAction1 = await waitFor(() => getByTestId('sorter_menu_first_name'));
    expect(btnAction1).not.toBeNull();

    const btnAction2 = await waitFor(() => getByTestId('sorter_menu_last_name'));
    expect(btnAction2).not.toBeNull();
  });
});
