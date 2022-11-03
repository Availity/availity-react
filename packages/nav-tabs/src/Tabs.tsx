import React, { useState, useEffect } from 'react';
import { Nav, NavLink } from 'reactstrap';
import type { NavProps } from 'reactstrap';
import TabBody from './TabBody';

export interface TabValues {
  label: string;
  default: boolean;
  component: React.FC;
}

export type NavigationProps = {
  tabArray: Array<TabValues>;
} & NavProps;

const Tabs = ({ tabArray }: NavigationProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState('');

  const toggleTabs = (tabLabel: string) => {
    if (activeTab !== tabLabel) setActiveTab(tabLabel);
  };

  useEffect(() => {
    if (tabArray) {
      tabArray.forEach((tab) => {
        if (tab?.default) setActiveTab(tab?.label);
      });
    }
  }, []);

  /* accessibility for keyboard controls on tabs */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    let index = tabArray.findIndex((item) => {
      return item.label === activeTab;
    });

    if (e.key === 'ArrowLeft') {
      index -= 1;
      if (index < 0) index = tabArray.length - 1;
    }

    if (e.key === 'ArrowRight') index += 1;
    index %= tabArray.length;
    setActiveTab(tabArray[index].label);

    // move focus to active tab
    document.getElementById(tabArray[index].label)?.focus();
  };

  return (
    <>
      <Nav tabs tag="div" role="tablist" id="navigation-container" onKeyDown={handleKeyDown}>
        {tabArray?.map((tab) => {
          const { label } = tab;

          return (
            <NavLink
              id={label}
              className="mr-1"
              key={label}
              tag="button"
              role="tab"
              aria-selected={!!activeTab}
              aria-controls={`${label?.toLowerCase()}-tab`}
              tabIndex={activeTab ? 0 : -1}
              onClick={() => toggleTabs(label)}
              active={activeTab === label}
            >
              {label}
            </NavLink>
          );
        })}
      </Nav>

      <TabBody activeTab={activeTab} tabArray={tabArray} />
    </>
  );
};

export default Tabs;
