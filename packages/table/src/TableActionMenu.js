import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

const TableActionMenu = ({ id, children }) => {
  const [isToggled, toggle] = useState(false);
  const setToggle = () => toggle(!isToggled);

  return (
    <Dropdown id={id} className="dropdown-action-menu" direction="left" isOpen={isToggled} toggle={setToggle}>
      <DropdownToggle id={`${id}_dropdown_toggle`} data-boundary="viewport" className="btn btn-ghost">
        <i id={`${id}_dropdown_toggle_icon`} className="icon icon-menu" />
      </DropdownToggle>
      <DropdownMenu id={`${id}_dropdown_toggle_icon`}>{children}</DropdownMenu>
    </Dropdown>
  );
};

TableActionMenu.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
};

export default TableActionMenu;
