import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  InputGroup,
  Label,
  UncontrolledTooltip,
} from 'reactstrap';
import Icon from '@availity/icon';
import find from 'lodash/find';
import { TableSort } from '../types/TableSort';
import { useTableContext } from '../TableContext';
import { CurrentTableState, IdType, TableInstance } from '../types/ReactTable';
import { TableSortOption } from '../types/TableSortOption';

type Props = {
  id?: string;
  disabled?: boolean;
  color?: string;
  onSort?: (sortBy: TableSort[]) => void;
} & React.HTMLAttributes<HTMLElement>;

const TableSorter = <T extends IdType>({ id, onSort, disabled, color, ...rest }: Props): JSX.Element | null => {
  const { sortOptions, instance } = useTableContext();
  const { toggleSortBy, state } = instance as TableInstance<T>;

  const [isSortingDropdownOpen, setIsSortingDropdownOpen] = useState<boolean>(false);
  const [tableSort, setTableSort] = useState<TableSortOption | undefined>();
  const [tableSortDesc, setTableSortDesc] = useState<boolean>(true);
  const [isDisabled, setIsDisabled] = useState<boolean>(disabled || false);

  useEffect(() => {
    if (sortOptions && state) {
      const { sortBy } = state as CurrentTableState;
      if (!sortBy) {
        return;
      }

      const currentSort = (sortBy as TableSort[])[0];
      if (!currentSort) {
        return;
      }

      const currentSortOption = find(sortOptions, (option) => option.value === currentSort.id);
      if (currentSortOption) {
        setTableSort(currentSortOption);
        setTableSortDesc(currentSort.desc);
      }
    }
  }, [sortOptions, state]);

  useEffect(() => {
    setIsDisabled(disabled || false);
  }, [disabled]);

  const sort = async (sortBy: TableSortOption, isDesc: boolean) => {
    if (toggleSortBy) {
      toggleSortBy(sortBy.value, isDesc, false);
    }

    if (onSort) {
      onSort([{ id: sortBy.value, desc: isDesc }]);
    }
  };

  const toggleSortingDropdown = () => setIsSortingDropdownOpen(!isSortingDropdownOpen);

  const handleSort = async (sortOption: TableSortOption) => {
    await setTableSort(sortOption);

    sort(sortOption, tableSortDesc);
  };

  const toggleSortDirection = async () => {
    const newSortDir = !tableSortDesc;
    await setTableSortDesc(newSortDir);

    if (!tableSort) {
      return;
    }

    sort(tableSort, newSortDir);
  };

  if (!sortOptions) {
    return null;
  }

  return (
    <InputGroup
      data-testid="sorter_input_group"
      id={id}
      className="table-controls-sorting mb-2 me-sm-2 mb-sm-0"
      {...rest}
    >
      <Label className="me-sm-2 pr-1 pl-2">
        <strong>Sort By: </strong>
      </Label>
      <ButtonDropdown className="m1-1" isOpen={isSortingDropdownOpen} toggle={toggleSortingDropdown}>
        <DropdownToggle data-testid="sorter_toggle" disabled={isDisabled} color={color} caret>
          {tableSort && tableSort.label}
        </DropdownToggle>
        <DropdownMenu data-testid="sorter_menu" disabled={isDisabled} color={color}>
          {sortOptions.map((sortOption: TableSortOption) => (
            <DropdownItem
              data-testid={`sorter_menu_${sortOption.value}`}
              key={sortOption.value}
              onClick={() => handleSort(sortOption)}
            >
              {sortOption.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
        <UncontrolledTooltip
          data-testid="tooltip_toggle_sort_dir"
          id="tooltip-toggle-sort-dir"
          placement="top"
          target="btn-toggle-sort-dir"
        >
          {tableSortDesc ? 'Descending' : 'Ascending'}
        </UncontrolledTooltip>
        <Button
          data-testid="btn_toggle_sort_dir"
          id="btn-toggle-sort-dir"
          disabled={isDisabled}
          color={color}
          onClick={async () => {
            await toggleSortDirection();
          }}
        >
          <Icon data-testid="btn_toggle_sort_dir_icon" name={tableSortDesc ? 'sort-alt-down' : 'sort-alt-up'} />
        </Button>
      </ButtonDropdown>
    </InputGroup>
  );
};

export default TableSorter;