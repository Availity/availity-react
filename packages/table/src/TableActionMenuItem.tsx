import React from 'react';
import { DropdownItem } from 'reactstrap';
import { IdType } from './types/ReactTable';
import { RecordAction } from './types/RecordAction';

type Props<T extends IdType> = {
  id?: string;
  action: RecordAction<T>;
  record: T;
};

const TableActionMenuItem = <T extends IdType>({ id, action, record }: Props<T>): JSX.Element | null => {
  const isVisible = action.isVisible ? action.isVisible(record) : true;
  if (!isVisible) {
    return null;
  }

  const displayText =
    typeof action.displayText === 'string'
      ? action.displayText
      : typeof action.displayText === 'function'
      ? (action.displayText as (record?: T) => string | React.ReactChild | React.ElementType)(record)
      : '';

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
      {displayText}
    </DropdownItem>
  );
};

export default TableActionMenuItem;
