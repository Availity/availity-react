import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const AvTableActionMenu = ({ actions, record }) => {
  const [isToggled, toggle] = useState(false);
  const setToggle = () => toggle(!isToggled);

  const buildDropdownItem = (action, index) =>
    action.divider ? (
      <DropdownItem key={index} divider />
    ) : (
      <DropdownItem key={index} onClick={() => action.onClick(record)}>
        {action.displayText}
      </DropdownItem>
    );

  return (
    <Dropdown className="dropdown-action-menu" direction="left" isOpen={isToggled} toggle={setToggle}>
      <DropdownToggle data-boundary="viewport" className="btn btn-ghost">
        <i className="icon icon-menu" />
      </DropdownToggle>
      <DropdownMenu>{actions.map((action, index) => buildDropdownItem(action, index))}</DropdownMenu>
    </Dropdown>
  );
};

AvTableActionMenu.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object),
  record: PropTypes.object,
};

export default AvTableActionMenu;
