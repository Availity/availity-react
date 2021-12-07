import React, { useState } from 'react';
import Icon from '@availity/icon';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

type Props = {
  id?: string;
  children: React.ReactNode;
};

const TableActionMenu = ({ id, children }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Dropdown id={id} className="dropdown-action-menu" direction="left" isOpen={isOpen} toggle={toggle}>
      <DropdownToggle id={`${id}_dropdown_toggle`} data-boundary="viewport" className="btn btn-ghost">
        <Icon id={`${id}_dropdown_toggle_icon`} name="menu" />
      </DropdownToggle>
      <DropdownMenu id={`${id}_dropdown_toggle_icon`} className="dropdown-action-menu" container=".av-grid-row-even td">
        {children}
      </DropdownMenu>
    </Dropdown>
  );
};

export default TableActionMenu;
