import React, { useState } from 'react';
import { Nav } from 'reactstrap';

const Tabs = ({ tabArray }) => {
  const [activeTab, setActiveTab] = useState();

  /* accessibility for keyboard controls on tabs */
  const handleKeyDown = (e) => {
    let index = tabArray.indexOf(activeTab);
    if (e.keyCode === 37) {
      index -= 1;
      if (index < 0) index = tabArray.length - 1;
    }

    if (e.keyCode === 39) index += 1;
    index %= tabArray.length;
    setActiveTab(tabArray[index]);

    // move focus to active tab
    document.getElementById(tabArray[index])?.focus();
  };

  return (
    <Nav tabs tag="div" role="tablist" id="navigation-container" onKeyDown={handleKeyDown}>
      {tabArray?.map((tab) => {
        <NavTab role="tab" key={tab} active={activeTab === tab} label={tab} />;
      })}
    </Nav>
  );
};

export default Tabs;
