import React from 'react';
import { TabContent, TabPane } from 'reactstrap';
import { TabValues } from './Tabs';

export type TabBodyProps = {
  tabArray: Array<TabValues>;
  activeTab: string;
};

const TabBody = ({ tabArray, activeTab }: TabBodyProps): JSX.Element => {
  const tabToBe = tabArray.find((tab: TabValues) => tab?.label === activeTab);

  return (
    <TabContent activeTab={activeTab}>
      <TabPane
        id={`${tabToBe?.label?.toLowerCase()}-tab`}
        className="p-1"
        aria-labelledby={tabToBe?.label}
        role="tabpanel"
        tabId={tabToBe?.label}
      >
        {tabToBe?.component}
      </TabPane>
    </TabContent>
  );
};

export default TabBody;
