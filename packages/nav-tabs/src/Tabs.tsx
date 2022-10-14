import React, { useState } from 'react';
import { Nav, NavLink } from 'reactstrap';
import type { NavProps } from 'reactstrap';

export type NavigationProps = {
  tabArray: string[];
} & NavProps;

const Tabs = ({ tabArray }: NavigationProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState('');

  const toggleTabs = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  /* accessibility for keyboard controls on tabs */
  // TODO: double test this since using key vs keyCode switch
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    let index = tabArray.indexOf(activeTab);
    if (e.key === 'ArrowLeft') {
      index -= 1;
      if (index < 0) index = tabArray.length - 1;
    }

    if (e.key === 'ArrowRight') index += 1;
    index %= tabArray.length;
    setActiveTab(tabArray[index]);

    // move focus to active tab
    document.getElementById(tabArray[index])?.focus();
  };

  return (
    <Nav tabs tag="div" role="tablist" id="navigation-container" onKeyDown={handleKeyDown}>
      {tabArray?.map((tab) => {
        return (
          <NavLink
            id={tab}
            className="mr-1"
            onClick={toggleTabs}
            active={activeTab === tab}
            tag="button"
            role="tab"
            aria-selected={activeTab}
            aria-controls={`${tab?.toLowerCase()}-tab`}
            tabIndex={activeTab ? 0 : -1}
          >
            {tab}
          </NavLink>
        );
      })}
    </Nav>
  );
};

export default Tabs;
