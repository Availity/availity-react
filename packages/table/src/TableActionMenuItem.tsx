import React from 'react';
import { DropdownItem } from 'reactstrap';
import { SingleTableAction } from '.';

type Props = {
  id?: string;
  action: SingleTableAction<any>;
  record: any;
}

const TableActionMenuItem = ({ id, action, record }: Props): JSX.Element | null => {
  const isVisible = action.isVisible ? action.isVisible(record) : true;
  if (!isVisible) {
    return null;
  }

  const setOnClickProps = () => {
    if (action.onClick) {
      const clickEvent = action.onClick as (record: object) => void;
      return { onClick: () => clickEvent(record) };
    }
    return undefined;
  }

  return action.divider ? (
    <DropdownItem id={`${id}_action_${action.id}`} key={action.id} divider />
  ) : (
    <DropdownItem id={`${id}_action_${action.id}`} key={action.id} {...setOnClickProps()}>
      {action.displayText}
    </DropdownItem>
  );
};

export default TableActionMenuItem;
