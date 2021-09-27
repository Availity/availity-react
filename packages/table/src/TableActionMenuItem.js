import React from 'react';
import PropTypes from 'prop-types';
import { DropdownItem } from 'reactstrap';

const TableActionMenuItem = ({ id, action, record }) => {
  const isVisible = action.isVisible ? action.isVisible(record) : true;
  if (!isVisible) {
    return null;
  }

  return action.divider ? (
    <DropdownItem id={`${id}_action_${action.id}`} key={action.id} divider />
  ) : (
    <DropdownItem
      id={`${id}_action_${action.id}`}
      key={action.id}
      onClick={() => action.onClick(record)}
    >
      {action.displayText}
    </DropdownItem>
  );
};

TableActionMenuItem.propTypes = {
  id: PropTypes.string,
  action: PropTypes.object,
  record: PropTypes.object,
};

export default TableActionMenuItem;
