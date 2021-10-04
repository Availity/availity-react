import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@availity/icon';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

const TableActionMenu = ({ id, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Dropdown id={id} className="dropdown-action-menu" direction="left" isOpen={isOpen} toggle={toggle}>
      <DropdownToggle id={`${id}_dropdown_toggle`} data-boundary="viewport" className="btn btn-ghost">
        <Icon id={`${id}_dropdown_toggle_icon`} name="icon-menu" />
      </DropdownToggle>
      <DropdownMenu id={`${id}_dropdown_toggle_icon`} className="dropdown-action-menu" container=".av-grid-row-even td">
        {children}
      </DropdownMenu>
    </Dropdown>
  );
};

TableActionMenu.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
};

export default TableActionMenu;
