import React from 'react';
import { DropdownItem } from 'reactstrap';
import { IdType } from './types/ReactTable';
import { SingleTableAction } from './types/TableActions';

type Props<T extends IdType> = {
  id?: string;
  action: SingleTableAction<T>;
  record: T;
};

const TableActionMenuItem = <T extends IdType>({ id, action, record }: Props<T>): JSX.Element | null => {
  const isVisible = action.isVisible ? action.isVisible(record) : true;
  if (!isVisible) {
    return null;
  }

  const setOnClickProps = () => {
    if (!action.onClick) {
      return null;
    }
    const clickEvent = action.onClick as (record: T) => void;
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
