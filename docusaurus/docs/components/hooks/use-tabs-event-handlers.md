---
title: useTabsEventHandlers
---

Hook that returns keydown event handler for a tab. Intended for use with Reactstrap tab components (see example for full list) but should be configurable if you are using alternate tab components. Tested and compatible with proxy-based state management libraries(you may need to use the custom find function to ensure that you are return a referentially identical tab from your tab list) as well as apps using plain context for managing state. Note that this hook relies on users adding tabIndex = 0 for active tab and tabIndex = -1 for inactive tabs and a few other conventions related to the way the tab element Ids are created. 

### Example

```jsx
import * as React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

const Example = ({ initialActive }) => {
  const [activeTab, setActiveTab] = useState(initialActive);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const tabs = ['one', 'two'];

  const firstHandler = useTabsEventHandlers(
    'one',
    tabs,
    setActiveTab,
    activeTab
  );
  const secondHandler = useTabsEventHandlers('two', tabs, setActiveTab, activeTab);
  return (
    <>
      <Button type="button" id="sibling-above" tabIndex={0}>
        Some Stuff
      </Button>
      <Nav id="tabListParentNav" tabs>
        <NavItem>
          <NavLink
            id="one-tab"
            tabIndex={activeTab === 'one' ? 0 : -1}
            onKeyDown={firstHandler}
            className={classnames({ active: activeTab === 'one' })}
            onClick={() => {
              toggle('one');
            }}
          >
            Tab1
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            onKeyDown={secondHandler}
            tabIndex={activeTab === 'two' ? 0 : -1}
            id="two-tab"
            className={classnames({ active: activeTab === 'two' })}
            onClick={() => {
              toggle('two');
            }}
          >
            More Tabs
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent tabIndex={activeTab == 'one' ? 0 : undefined} data-testid="tabPanel" id="tabPanel" activeTab={activeTab}>
        <TabPane tabId="one">
          <Row>
            <Col sm="12">
              <h4>Tab 1 Contents</h4>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="two">
          <Row>
            <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
      <Button type="button" id="sibling-below" tabIndex={0}>
        Other Stuff
      </Button>
    </>
  );
};

```

## Props

### `tab: Tab`

The tab component to attach the onKeyDown listener to. This should be an element of a list of Tabs (i.e. if your list has objects this tab should be referentially equal to one element in the list). Tabs can be either strings, like in the example, or can be objects with a name property (and any other properties you need but they will be safely ignored by this hook, but name is required). Also note that the NavLinks must use the tab or tab.name as part of building their elementID so any tab name must make a valid id (i.e. tabs can't be ['1', '2', '3'] but instead ['one', 'two', 'three] because 1-tab is not a valid id)

### `tabs: Tab[]`

The complete list of your available tabs.


### `updaterFn: UpdaterFn`

This is the function used to update your state management with any newly active tab. In the example the updaterFn is simply the function returned by useState. In other solutions with a centralized state management library this may be the updating function for that centralized state (like with Mobx or Redux).

### `active: Tab`

The currently active tab.

### `options?: {customFindFn?: CustomFindFunction}`

Optional overrides for certain features, customFindFn if you have a tab list of objects you will need to use a function like Lodash's isEqual or your own custom find logic, see tests for examples. If you need additional overrides PR's are welcome.

## Returns

### handleKeys: React.KeyboardEventHandler<HTMLAnchorElement>

Used as a keydown event handler on a HTML anchor tag. Type signature for event handler is (event: React.KeyboardEvent<HTMLAnchorElement>) => void. 