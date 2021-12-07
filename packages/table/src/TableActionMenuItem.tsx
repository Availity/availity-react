import React from 'react';
import { DropdownItem } from 'reactstrap';
import { SingleTableAction } from './types/TableActions';
import { TableRecord } from './types/TableRecord';

type Props = {
  id?: string;
  action: SingleTableAction;
  record: TableRecord;
};

const TableActionMenuItem = ({ id, action, record }: Props): JSX.Element | null => {
  const isVisible = action.isVisible ? action.isVisible(record) : true;
  if (!isVisible) {
    return null;
  }

  const setOnClickProps = () => {
    if (!action.onClick) {
      return null;
    }
    const clickEvent = action.onClick as (record: TableRecord) => void;
    return { onClick: () => clickEvent(record) };
  };

  return action.divider ? (
    <DropdownItem id={`${id}_action_${action.id}`} key={action.id} divider />
  ) : (
    <DropdownItem id={`${id}_action_${action.id}`} key={action.id} {...setOnClickProps()}>
      {action.displayText}
    </DropdownItem>
  );
};

export default TableActionMenuItem;
