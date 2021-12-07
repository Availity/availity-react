import React, { useEffect, useState } from 'react';
import { Button, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, InputGroup, Label, UncontrolledTooltip } from 'reactstrap';
import Icon from '@availity/icon';
import find from 'lodash/find';
import { TableSortConfig } from '../types/TableSortConfig';
import { useTableContext } from '../TableContext';
import { CurrentTableState, TableInstance } from '../types/ReactTable';
import { TableSortOption } from '../types/TableSortOption';

type Props = {
    id?: string;
    disabled?: boolean;
    color?: string;
    onSort?: (sortBy: TableSortConfig[]) => void;
} & React.HTMLAttributes<HTMLElement>;

const TableSorter = ({ id, onSort, disabled, color, ...rest }: Props): JSX.Element | null => {
    const { sortOptions, instance } = useTableContext();
    const { toggleSortBy, state } = instance as TableInstance;

    const [isSortingDropdownOpen, setIsSortingDropdownOpen] = useState<boolean>(false);
    const [tableSort, setTableSort] = useState<TableSortOption | undefined>();
    const [tableSortDesc, setTableSortDesc] = useState<boolean>(true);

    useEffect(() => {
        if (sortOptions && state) {
            const { sortBy } = state as CurrentTableState;
            const currentSort = (sortBy as TableSortConfig[])[0];

            const currentSortOption = find(sortOptions, (option) => option.value === currentSort.id);
            if (currentSortOption) {
                setTableSort(currentSortOption);
                setTableSortDesc(currentSort.desc);
            }
        }
    }, [sortOptions, state]);

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
    }

    const toggleSortDirection = async () => {
        const newSortDir = !tableSortDesc;
        await setTableSortDesc(newSortDir);

        if (!tableSort) {
            return;
        }

        sort(tableSort, newSortDir);
    }

    if (!sortOptions) {
        return null;
    }

    return (
        <InputGroup id={id} className="table-controls-sorting mb-2 me-sm-2 mb-sm-0" {...rest}>
            <Label className="me-sm-2 pr-1 pl-2">
                <strong>Sort By: </strong>
            </Label>
            <ButtonDropdown className="m1-1" disabled={disabled} isOpen={isSortingDropdownOpen} toggle={toggleSortingDropdown}>
                <DropdownToggle disabled={disabled} color={color} caret>
                    {tableSort && tableSort.label}
                </DropdownToggle>
                <DropdownMenu disabled={disabled} color={color}>
                    {sortOptions.map((sortOption: TableSortOption) =>
                        <DropdownItem key={sortOption.value} onClick={() => handleSort(sortOption)}>{sortOption.label}</DropdownItem>
                    )}
                </DropdownMenu>
                <UncontrolledTooltip id="tooltip-toggle-sort-dir" placement="top" target="btn-toggle-sort-dir">
                    {tableSortDesc ? 'Descending' : 'Ascending'}
                </UncontrolledTooltip>
                <Button id="btn-toggle-sort-dir" disabled={disabled} color={color} onClick={async () => { await toggleSortDirection(); }}>
                    <Icon name={tableSortDesc ? 'sort-alt-down' : 'sort-alt-up'} />
                </Button>
            </ButtonDropdown>
        </InputGroup>
    );
}

export default TableSorter;