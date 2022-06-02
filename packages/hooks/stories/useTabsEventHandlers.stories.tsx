import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import {Tab} from '../types/useTabsEventHandlers'
import { useTabsEventHandlers } from '..';


const Example = ({initialActive}: {initialActive: string}) => {
  const [activeTab, setActiveTab] = React.useState(initialActive);

  const toggle = (tab: Tab) => {
    if(activeTab !== tab) setActiveTab(tab);
  }
  const tabs = ['one', 'two']

  const {handleKeys: firstHandler, handleFocus: navHandler} = useTabsEventHandlers('one', tabs, setActiveTab, activeTab)
  const {handleKeys: secondHandler} = useTabsEventHandlers('two', tabs, setActiveTab, activeTab)
  return (
    <>
      <button type='button' id='sibling-above' tabIndex={0}>Some Stuff</button>
      <Nav onFocus={navHandler} id='tabListParentNav' tabs>
        <NavItem>
          <NavLink
            id='one-tab'
            tabIndex={0}
            onKeyDown = {firstHandler}
            className={classnames({ active: activeTab === 'one' })}
            onClick={() => { toggle('one'); }}
          >
            Tab1
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            onKeyDown={secondHandler}
            tabIndex={0}
            id='two-tab'
            className={classnames({ active: activeTab === 'two' })}
            onClick={() => { toggle('two'); }}
          >
          More Tabs
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent tabIndex={0} data-testid='tabPanel' id='tabPanel' activeTab={activeTab}>
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
      <button type='button' id='sibling-below' tabIndex={0}>Other Stuff</button>
    </>
  );
}

  export default {
    title: 'Hooks/useTabsEventHandlers',
    parameters: {
      docs: {},
    },
  } as Meta;
  
  export const Default: Story = () => <Example initialActive='one' />;
  Default.storyName = 'default';
  