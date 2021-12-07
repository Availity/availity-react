import React, { useEffect, useState } from 'react';
import { Badge, Button, ButtonDropdown, ButtonGroup, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { useTableContext } from '../TableContext';
import { TableInstance } from '../types/ReactTable';
import { BulkTableAction } from '../types/TableActions';
import { TableRecord } from '../types/TableRecord';

type Props = {
    id?: string;
    disabled?: boolean;
    recordName: string;
    bulkActions: BulkTableAction[];
    color?: string;
    onRecordsSelected?: (records: TableRecord[]) => void;
} & React.HTMLAttributes<HTMLElement>;

const BulkTableActions = ({ id, disabled, color, recordName, bulkActions, onRecordsSelected }: Props): JSX.Element | null => {
    const { instance } = useTableContext();

    const { selectedFlatRows: selectedRows, isAllRowsSelected, toggleAllRowsSelected } = instance as TableInstance;

    const [isSelectionDropdownOpen, setIsSelectionDropdownOpen] = useState<boolean>(false);
    const [numberOfSelectedRows, setNumberOfSelectedRows] = useState<number>(0);
    const [selectionButtonText, setSelectionButtonText] = useState('Select');
    const [isDisabled, setIsDisabled] = useState<boolean>(disabled || false);

    useEffect(() => {
        setNumberOfSelectedRows(selectedRows?.length);
        if (isAllRowsSelected) {
            setSelectionButtonText('Deselect');
        } else {
            setSelectionButtonText('Select');
        }

        if (onRecordsSelected) {
            const records = selectedRows.map(row =>  row.original);
            onRecordsSelected(records);
        }

        setIsDisabled(disabled || selectedRows?.length === 0);
    }, [selectedRows, disabled, numberOfSelectedRows]);

    const toggleSelectionDropdown = () => setIsSelectionDropdownOpen(!isSelectionDropdownOpen);

    const handleToggleSelectAll = () => {
        if (toggleAllRowsSelected) {
            toggleAllRowsSelected();
        }
    }

    return (
        <ButtonGroup id={id} disabled={isDisabled} className="btn-group">
            <Button
                disabled={isDisabled}
                onClick={() => { handleToggleSelectAll() }}
                color={color}>
                <Badge>{numberOfSelectedRows}</Badge> {selectionButtonText} All {recordName}
            </Button>
            <ButtonDropdown disabled={isDisabled} isOpen={isSelectionDropdownOpen} toggle={toggleSelectionDropdown}>
                <DropdownToggle disabled={isDisabled} color={color} caret />
                <DropdownMenu color={color}>
                    {bulkActions.map((action) => {
                        const isVisible = action.isVisible ? action.isVisible() : true;
                        const setProps = () => {
                            if (!action.onClick) {
                                return null;
                            }
                            const clickEvent = action.onClick;
                            return { onClick: () => clickEvent(selectedRows.map(row =>  row.original)) };
                        }

                        if (isVisible) {
                            return <DropdownItem key={action.displayText} {...setProps()}>{action.displayText}</DropdownItem>
                        }
                        return null;
                    }
                    )}
                </DropdownMenu>
            </ButtonDropdown>
        </ButtonGroup>
    );
}

export default BulkTableActions;