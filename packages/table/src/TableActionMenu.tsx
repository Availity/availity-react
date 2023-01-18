import React, { useState } from 'react';
import Icon from '@availity/icon';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownProps,
  DropdownToggleProps,
  DropdownMenuProps,
} from 'reactstrap';

export type TableActionMenuProps = {
  id?: string;
  children: React.ReactNode;
  container?: string;
  dropdownProps?: DropdownProps;
  dropdownToggleProps?: DropdownToggleProps;
  dropdownMenuProps?: DropdownMenuProps;
  onMenuToggled?: (isOpen: boolean) => void;
};

const TableActionMenu = ({
  id,
  children,
  container = 'body',
  dropdownProps,
  dropdownToggleProps,
  dropdownMenuProps,
  onMenuToggled,
}: TableActionMenuProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    const newIsOpenVal = !isOpen;
    setIsOpen(newIsOpenVal);

    if (onMenuToggled) {
      onMenuToggled(newIsOpenVal);
    }
  };

  return (
    <Dropdown
      id={id}
      className="dropdown-action-menu"
      direction="left"
      isOpen={isOpen}
      toggle={toggle}
      {...dropdownProps}
    >
      <DropdownToggle
        id={`${id}_dropdown_toggle`}
        aria-label="Action Menu"
        data-boundary="viewport"
        className="btn btn-ghost"
        {...dropdownToggleProps}
      >
        <Icon id={`${id}_dropdown_toggle_icon`} name="menu" />
      </DropdownToggle>
      <DropdownMenu
        id={`${id}_dropdown_menu`}
        className="dropdown-action-menu"
        container={container}
        {...dropdownMenuProps}
      >
        {children}
      </DropdownMenu>
    </Dropdown>
  );
};

export default TableActionMenu;
