import React, { useEffect, useState } from 'react';
import { useTableContext } from '../TableContext';
import { Badge, Button, ButtonDropdown, ButtonGroup, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { BulkTableAction, ExtendedTableInstance } from '..';

type Props = {
    recordName: string;
    bulkActions: BulkTableAction<any>[];
    onRecordsSelected?: (records: any[]) => void;
}

const BulkTableActions = ({ recordName, bulkActions, onRecordsSelected }: Props): JSX.Element | null => {
    const { instance } = useTableContext();

    const { selectedFlatRows: selectedRows, isAllRowsSelected, toggleAllRowsSelected } = instance as ExtendedTableInstance;

    const [isSelectionDropdownOpen, setIsSelectionDropdownOpen] = useState<boolean>(false);
    const [numberOfSelectedRows, setNumberOfSelectedRows] = useState<number>(0);
    const [selectionButtonText, setSelectionButtonText] = useState('Select');

    useEffect(() => {
        setNumberOfSelectedRows(selectedRows?.length);
        if (isAllRowsSelected) {
            setSelectionButtonText('Deselect');
        } else {
            setSelectionButtonText('Select');
        }

        if (onRecordsSelected) {
            onRecordsSelected(selectedRows);
        }

    }, [selectedRows]);

    const toggleSelectionDropdown = () => setIsSelectionDropdownOpen(!isSelectionDropdownOpen);

    const handleToggleSelectAll = () => {
        if (toggleAllRowsSelected) {
            toggleAllRowsSelected();
        }
    }

    return (
        <ButtonGroup className='btn-group' color="light">
            <Button
                onClick={() => { handleToggleSelectAll() }}
                color="light">
                <Badge>{numberOfSelectedRows}</Badge> {selectionButtonText} All {recordName}
            </Button>
            <ButtonDropdown disabled={numberOfSelectedRows === 0} color="light" isOpen={isSelectionDropdownOpen} toggle={toggleSelectionDropdown}>
                <DropdownToggle disabled={numberOfSelectedRows === 0} color="light" caret></DropdownToggle>
                <DropdownMenu color="light">
                    {bulkActions.map((action) => {
                        const isVisible = action.isVisible ? action.isVisible() : true;
                        const setProps = () => {
                            if (action.onClick) {
                                const clickEvent = action.onClick as (records: object[]) => void;
                                return { onClick: () => clickEvent(selectedRows) };
                            }
                        }

                        if (isVisible) {
                            return <DropdownItem key={action.displayText} {...setProps()}>{action.displayText}</DropdownItem>
                        }
                    }
                    )}
                </DropdownMenu>
            </ButtonDropdown>
        </ButtonGroup>
    );
}

export default BulkTableActions;