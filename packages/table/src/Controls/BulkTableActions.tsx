import React, { useEffect, useState } from 'react';
import { Badge, Button, ButtonDropdown, ButtonGroup, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { useTableContext } from '../TableContext';
import { BulkRecordAction } from '../types/BulkRecordAction';
import { IdType, TableInstance } from '../types/ReactTable';

type Props<T> = {
  id?: string;
  disabled?: boolean;
  recordName?: string;
  bulkActions?: BulkRecordAction<T>[];
  color?: string;
  onRecordsSelected?: (records: T[]) => void;
} & React.HTMLAttributes<HTMLElement>;

const BulkTableActions = <T extends IdType>({
  id,
  disabled,
  color,
  recordName = 'Records',
  bulkActions,
  onRecordsSelected,
}: Props<T>): JSX.Element | null => {
  const { instance } = useTableContext();
  const { isAllRowsSelected, toggleAllRowsSelected, selectedFlatRows } = instance as TableInstance<T>;

  const [isSelectionDropdownOpen, setIsSelectionDropdownOpen] = useState(false);
  const [numberOfSelectedRows, setNumberOfSelectedRows] = useState(0);
  const [selectionButtonText, setSelectionButtonText] = useState('Select');
  const [isDisabled, setIsDisabled] = useState(disabled || false);

  useEffect(() => {
    setNumberOfSelectedRows(selectedFlatRows?.length);
    if (isAllRowsSelected) {
      setSelectionButtonText('Deselect');
    } else {
      setSelectionButtonText('Select');
    }

    if (onRecordsSelected) {
      const records = selectedFlatRows.map((row: { original: T }) => row.original);
      onRecordsSelected(records);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFlatRows]);

  useEffect(() => {
    setIsDisabled(disabled || false);
  }, [disabled]);

  const toggleSelectionDropdown = () => setIsSelectionDropdownOpen(!isSelectionDropdownOpen);

  const handleToggleSelectAll = () => {
    if (toggleAllRowsSelected) {
      toggleAllRowsSelected();
    }
  };

  return (
    <ButtonGroup data-testid="bulk_actions_btn_group" id={id} disabled={isDisabled} className="btn-group">
      <Button
        data-testid="select_deselect_all_records"
        disabled={disabled}
        onClick={() => {
          handleToggleSelectAll();
        }}
        color={color}
      >
        <Badge pill>{numberOfSelectedRows}</Badge> {selectionButtonText} All {recordName}
      </Button>
      {bulkActions && (
        <ButtonDropdown isOpen={isSelectionDropdownOpen} toggle={toggleSelectionDropdown}>
          <DropdownToggle
            data-testid="bulk_actions_toggle"
            disabled={numberOfSelectedRows === 0 || disabled}
            color={color}
            caret
          />
          <DropdownMenu color={color}>
            {bulkActions?.map((action) => {
              const isVisible = action.isVisible ? action.isVisible(selectedFlatRows.map((row) => row.original)) : true;
              const setProps = () => {
                if (!action.onClick) {
                  return null;
                }
                const clickEvent = action.onClick;
                return { onClick: () => clickEvent(selectedFlatRows.map((row) => row.original)) };
              };

              if (isVisible) {
                return action.divider ? (
                  <DropdownItem data-testid={`bulk_action_${action.id}`} key={action.id} divider />
                ) : (
                  <DropdownItem data-testid={`bulk_action_${action.id}`} key={`${action.id}`} {...setProps()}>
                    {action.displayText}
                  </DropdownItem>
                );
              }
              return null;
            })}
          </DropdownMenu>
        </ButtonDropdown>
      )}
    </ButtonGroup>
  );
};

export default BulkTableActions;
