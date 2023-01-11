import React, { useState } from 'react';
import Icon from '@availity/icon';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

type Props = {
  /** This is a unique id that is prepended to the element **/
  id?: string;
  /** Children can be a react child. **/
  children: React.ReactNode;
  container?: string;
};

const TableActionMenu = ({ id, children, container = 'body' }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Dropdown id={id} className="dropdown-action-menu" direction="left" isOpen={isOpen} toggle={toggle}>
      <DropdownToggle
        id={`${id}_dropdown_toggle`}
        aria-label="Action Menu"
        data-boundary="viewport"
        className="btn btn-ghost"
      >
        <Icon id={`${id}_dropdown_toggle_icon`} name="menu" />
      </DropdownToggle>
      <DropdownMenu id={`${id}_dropdown_menu`} className="dropdown-action-menu" container={container}>
        {children}
      </DropdownMenu>
    </Dropdown>
  );
};

export default TableActionMenu;
