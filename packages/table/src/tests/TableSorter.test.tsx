import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import basicData from './data/basicData.json';
import TableControls from '../Controls/TableControls';
import TableProvider from '../TableProvider';
import { Column } from '../types/ReactTable';
import TableSorter from '../Controls/TableSorter';
import { TableContext } from '../TableContext';
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
      <TableProvider>
        <TableControls>
          <TableSorter />
        </TableControls>
        <Table sortable data={basicData} columns={basicColumns} />
      </TableProvider>
    );

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();

    const sorterInputGrp = await waitFor(() => getByTestId('sorter_input_group'));
    expect(sorterInputGrp).not.toBeNull();
  });

  test('should render sort options in dropdown menu', async () => {
    const tableInstanceMock = {
      selectedFlatRows: [basicData[0]],
      data: basicData,
      columns: basicColumns,
      state: {
        sortBy: [{ id: 'first_name', desc: true }],
      },
    };

    const { container, getByTestId } = render(
      <TableContext.Provider
        value={{
          instance: tableInstanceMock,
          sortable: true,
          sortableColumns: [{ value: 'first_name', label: ' First name' }],
          selectedRows: [],
        }}
      >
        <TableControls>
          <TableSorter />
        </TableControls>
        <Table
          data={basicData}
          columns={basicColumns}
          initialState={{
            sortBy: [{ id: 'first_name', desc: true }],
          }}
        />
      </TableContext.Provider>
    );

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();

    const sorterMenu = await waitFor(() => getByTestId('sorter_menu'));
    expect(sorterMenu).not.toBeNull();

    const sorterMenuItem = await waitFor(() => getByTestId('sorter_menu_first_name'));
    expect(sorterMenuItem).not.toBeNull();
  });

  test('should show descending icon', async () => {
    const tableInstanceMock = {
      selectedFlatRows: [basicData[0]],
      data: basicData,
      columns: basicColumns,
      state: {
        sortBy: [{ id: 'first_name', desc: true }],
      },
    };

    const { container, getByTestId } = render(
      <TableContext.Provider
        value={{
          instance: tableInstanceMock,
          sortable: true,
          sortableColumns: [{ value: 'first_name', label: ' First name' }],
          selectedRows: [],
        }}
      >
        <TableControls>
          <TableSorter />
        </TableControls>
        <Table data={basicData} columns={basicColumns} />
      </TableContext.Provider>
    );

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();

    const sorterToggleButton = await waitFor(() => getByTestId('btn_toggle_sort_dir_icon'));
    expect(sorterToggleButton).not.toBeNull();
    expect(sorterToggleButton.className).toBe('icon icon-sort-alt-down');
  });

  test('should show ascending icon', async () => {
    const tableInstanceMock = {
      selectedFlatRows: [basicData[0]],
      data: basicData,
      columns: basicColumns,
      state: {
        sortBy: [{ id: 'first_name', desc: false }],
      },
    };

    const { container, getByTestId } = render(
      <TableContext.Provider
        value={{
          instance: tableInstanceMock,
          sortable: true,
          sortableColumns: [{ value: 'first_name', label: ' First name' }],
          selectedRows: [],
        }}
      >
        <TableControls>
          <TableSorter />
        </TableControls>
        <Table data={basicData} columns={basicColumns} />
      </TableContext.Provider>
    );

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();

    const sorterToggleButton = await waitFor(() => getByTestId('btn_toggle_sort_dir_icon'));
    expect(sorterToggleButton).not.toBeNull();
    expect(sorterToggleButton.className).toBe('icon icon-sort-alt-up');
  });

  test('should sort on dropdown select', async () => {
    const onSort = jest.fn();
    const toggleSortBy = jest.fn();

    const tableInstanceMock = {
      selectedFlatRows: [basicData[0]],
      data: basicData,
      columns: basicColumns,
      state: {
        sortBy: [{ id: 'first_name', desc: false }],
      },
      toggleSortBy,
    };

    const { getByTestId } = render(
      <TableContext.Provider
        value={{
          instance: tableInstanceMock,
          sortable: true,
          sortableColumns: [{ value: 'first_name', label: ' First name' }],
          selectedRows: [],
        }}
      >
        <TableControls>
          <TableSorter onSort={onSort} />
        </TableControls>
        <Table data={basicData} columns={basicColumns} />
      </TableContext.Provider>
    );

    const btnDropdownToggle = await waitFor(() => getByTestId('sorter_toggle'));
    expect(btnDropdownToggle).not.toBeNull();
    fireEvent.click(btnDropdownToggle);

    const btnAction = await waitFor(() => getByTestId('sorter_menu_first_name'));
    expect(btnAction).not.toBeNull();

    fireEvent.click(btnAction);

    await waitFor(() => {
      expect(onSort).toHaveBeenCalledTimes(1);
      expect(toggleSortBy).toHaveBeenCalledTimes(1);
    });
  });

  test('should populate sortOptions when provided', async () => {
    const onSort = jest.fn();
    const toggleSortBy = jest.fn();

    const tableInstanceMock = {
      selectedFlatRows: [basicData[0]],
      data: basicData,
      columns: basicColumns,
      state: {
        sortBy: [{ id: 'first_name', desc: false }],
      },
      toggleSortBy,
    };

    const { getByTestId } = render(
      <TableContext.Provider
        value={{
          instance: tableInstanceMock,
          sortable: true,
          sortableColumns: [{ value: 'first_name', label: ' First name' }],
          selectedRows: [],
        }}
      >
        <TableControls>
          <TableSorter onSort={onSort} sortOptions={[{ value: 'last_name', label: ' Last name' }]} />
        </TableControls>
        <Table data={basicData} columns={basicColumns} />
      </TableContext.Provider>
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
