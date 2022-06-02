---
title: useTabsEventHandlers
---

Hook that returns keydown event handler for a tab and a focus event handler for the nav element containing your tabs. Intended for use with Reactstrap nav and tab components (see example for full list) but should be configurable if you are using alternate tab components. Tested and compatible with proxy-based state management libraries(you may need to use the custom find function to ensure that you are return a referentially identical tab from your tab list) as well as apps using plain context for managing state. Note that this hook relies on users adding tabIndex = 0 for their NavLink Reactstrap component and a few other conventions related to the way the tab element Ids are created. 

### Example

```jsx
import * as React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

const Example = ({initialActive}) => {
  const [activeTab, setActiveTab] = useState(initialActive);

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }
  const tabs = ['1', '2']

  const {handleKeys: firstHandler, handleFocus: navHandler} = useTabsEventHandlers('1', tabs, setActiveTab, activeTab)
  const {handleKeys: secondHandler} = useTabsEventHandlers('2', tabs, setActiveTab, activeTab)
  return (
    <>
    <button type='button' id='sibling-above' tabIndex={0}>Some Stuff</button>
      <Nav onFocus={navHandler} id='tabListParentNav' tabs>
        <NavItem>
          <NavLink
            id='1-tab'
            tabIndex={0}
            onKeyDown = {firstHandler}
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Tab1
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            onKeyDown={secondHandler}
            tabIndex={0}
            id='2-tab'
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
          More Tabs
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent data-testid='tabPanel' id='tabPanel' activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <h4>Tab 1 Contents</h4>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
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
      <button type='button' id='sibling-below' tabIndex={0}>Other Stuff</button>
    </>
  );
}
```

## Props

### `tab: Tab`

The tab component to attach the onKeyDown listener to. This should be an element of a list of Tabs (i.e. if your list has objects this tab should be referentially equal to one element in the list). Tabs can be either strings, like in the example, or can be objects with a name property (and any other properties you need but they will be safely ignored by this hook, but name is required)

### `tabs: Tab[]`

The complete list of your available tabs.


### `updaterFn: UpdaterFn`

This is the function used to update your state management with any newly active tab. In the example the updaterFn is simply the function returned by useState. In other solutions with a centralized state management library this may be the updating function for that centralized state (like with Mobx or Redux).

### `active: Tab`

The currently active tab.

### `options?: {customFindFn?: CustomFindFunction, customSelector?: string}`

Optional overrides for certain features, customFindFn if you have a tab list of objects you may need to use a function like Lodash's isEqual. Or a custom selector to override the id's we are checking in some cases. If you need additional overrides PR's are welcome.