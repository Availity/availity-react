import React, { useEffect, useState } from 'react';
import { Button, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, InputGroup, Label } from 'reactstrap';
import Icon from '@availity/icon';
import find from 'lodash/find';
import { AvailityTableState, TableSortConfig, TableSortOption, useTableContext } from '../TableContext';
import { ExtendedTableInstance } from '..';

type Props = {
    onSort?: (sortBy: TableSortConfig) => void;
}

const TableSorter = ({ onSort }: Props): JSX.Element | null => {
    const { sortOptions, instance, initialState } = useTableContext();
    const { toggleSortBy } = instance as ExtendedTableInstance;

    const [isSortingDropdownOpen, setIsSortingDropdownOpen] = useState<boolean>(false);
    const [tableSort, setTableSort] = useState<TableSortOption | undefined>();
    const [tableSortDesc, setTableSortDesc] = useState<boolean>(true);

    useEffect(() => {
        if (sortOptions && initialState && initialState.sortBy && !tableSort) {
            const { sortBy } = initialState as AvailityTableState;
            const defaultSortOption = find(sortOptions, (option) => option.value === (sortBy as TableSortConfig[])[0].id);
            if (defaultSortOption) {
                setTableSort(defaultSortOption);
                setTableSortDesc(true);
            }
        }
    }, [sortOptions]);

    const toggleSortingDropdown = () => setIsSortingDropdownOpen(!isSortingDropdownOpen);

    const handleSort = (sortOption: TableSortOption) => {

        setTableSort(sortOption);

        if (toggleSortBy) {
            toggleSortBy(sortOption.value, tableSortDesc, false);
        }

        if (onSort) {
            onSort({ id: sortOption.value, desc: tableSortDesc })
        }
    }

    const toggleSortDirection = async () => {
        const newSortDir = !tableSortDesc;
        await setTableSortDesc(newSortDir);

        if (!tableSort) {
            return;
        }

        if (toggleSortBy) {
            toggleSortBy(tableSort.value, newSortDir, false);
        }

        if (onSort) {
            onSort({ id: tableSort.value, desc: newSortDir })
        }
    }

    if (!sortOptions) {
        return null;
    }

    return (
        <InputGroup className="table-controls-sorting mb-2 me-sm-2 mb-sm-0">
            <Label className="me-sm-2">
                <strong>Sort By: </strong>
            </Label>
            <ButtonDropdown color="light" isOpen={isSortingDropdownOpen} toggle={toggleSortingDropdown}>
                <DropdownToggle color="light" caret>
                    {tableSort && tableSort.label}
                </DropdownToggle>
                <DropdownMenu color="light">
                    {sortOptions.map((sortOption: TableSortOption) =>
                        <DropdownItem key={sortOption.value} onClick={() => handleSort(sortOption)}>{sortOption.label}</DropdownItem>
                    )}
                </DropdownMenu>
                <Button color="light" onClick={async () => { await toggleSortDirection(); }}>
                    <Icon name={tableSortDesc ? 'sort-alt-down' : 'sort-alt-up'} />
                </Button>
            </ButtonDropdown>
        </InputGroup>
    );
}

export default TableSorter;