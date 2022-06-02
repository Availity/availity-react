import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PropTypes from 'prop-types';
import useTabsEventHandlers from '../src/useTabsEventHandlers';

function setup(...args) {
  const returnVal = {};
  function TestComponent() {
    Object.assign(returnVal, useTabsEventHandlers(...args));
    return null;
  }
  render(<TestComponent />);
  return returnVal;
}

const Example = ({ initialActive, useObjects, customFindFn }) => {
  const [activeTab, setActiveTab] = useState(initialActive);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const tabs = useObjects ? [{ name: 'one' }, { name: 'two' }] : ['one', 'two'];

  const firstHandler = useTabsEventHandlers('one', tabs, setActiveTab, activeTab, { customFindFn });
  const secondHandler = useTabsEventHandlers('two', tabs, setActiveTab, activeTab, {
    customFindFn,
  });
  return (
    <div>
      <button type="button" id="sibling-above" tabIndex={0}>
        Some Stuff
      </button>
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
      <TabContent tabIndex={0} data-testid="tabPanel" id="tabPanel" activeTab={activeTab}>
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
      <button type="button" id="sibling-below" tabIndex={0}>
        Other Stuff
      </button>
    </div>
  );
};

Example.propTypes = {
  initialActive: PropTypes.string,
  useObjects: PropTypes.bool,
  customFindFn: PropTypes.func,
};

// taken from https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/#:~:text=.-,Keyboard%20Interaction,-For%20the%20tab
// Tab:
// When focus moves into the tab list, places focus on the active tab element.
// When the tab list contains the focus, moves focus to the next element in the page tab sequence outside the tablist, which is the tabpanel unless the first element containing meaningful content inside the tabpanel is focusable.
// When focus is on a tab element in a horizontal tab list:
// Left Arrow: moves focus to the previous tab. If focus is on the first tab, moves focus to the last tab. Optionally, activates the newly focused tab (See note below).
// Right Arrow: Moves focus to the next tab. If focus is on the last tab element, moves focus to the first tab. Optionally, activates the newly focused tab (See note below).
// When focus is on a tab in a tablist with either horizontal or vertical orientation:
// Space or Enter: Activates the tab if it was not activated automatically on focus.

describe('useTabsEventHandlers', () => {
  test('focus moving into tabList focuses on active tab', () => {
    render(<Example initialActive="two" />);
    const buttonAbove = screen.getByText('Some Stuff');
    buttonAbove.focus();
    userEvent.tab();
    const tab2 = screen.getByText('More Tabs');
    expect(tab2).toHaveFocus();
  });
  test('pressing tab key while focus in tab list goes to tab panel', () => {
    render(<Example initialActive="one" />);
    const tab1 = screen.getByText('Tab1');
    tab1.focus();
    userEvent.tab();
    const tabPanel = screen.getByTestId('tabPanel');
    expect(tabPanel).toHaveFocus();
  });

  test('left arrow moves focus to previous tab and will wrap around', () => {
    render(<Example initialActive="two" />);
    const buttonAbove = screen.getByText('Some Stuff');
    buttonAbove.focus();
    userEvent.tab();
    const tab2 = screen.getByText('More Tabs');
    expect(tab2).toHaveClass('active');
    expect(tab2).toHaveFocus();
    userEvent.keyboard('[ArrowLeft]');
    const tab1 = screen.getByText('Tab1');
    expect(tab1).toHaveFocus();
    expect(tab1).toHaveClass('active');
    expect(tab2).not.toHaveClass('active');
    userEvent.keyboard('[ArrowLeft]');
    expect(tab2).toHaveFocus();
    expect(tab2).toHaveClass('active');
    expect(tab1).not.toHaveClass('active');
  });
  test('right arrow moves focus to next tab and will wrap around', () => {
    render(<Example initialActive="one" />);
    const buttonAbove = screen.getByText('Some Stuff');
    buttonAbove.focus();
    userEvent.tab();
    const tab2 = screen.getByText('More Tabs');
    const tab1 = screen.getByText('Tab1');
    expect(tab1).toHaveClass('active');
    userEvent.keyboard('[ArrowRight]');
    expect(tab2).toHaveFocus();
    expect(tab2).toHaveClass('active');
    expect(tab1).not.toHaveClass('active');
    userEvent.keyboard('[ArrowRight]');
    expect(tab1).toHaveFocus();
    expect(tab1).toHaveClass('active');
    expect(tab2).not.toHaveClass('active');
  });

  test('space or enter while focused on inactive tab will make it active', () => {
    render(<Example initialActive="two" />);
    const tab1 = screen.getByText('Tab1');
    tab1.focus();
    expect(tab1).not.toHaveClass('active');
    userEvent.type(tab1, '[Space]');
    expect(tab1).toHaveClass('active');
  });
  test('it throws if tabs are objects without a name property', () => {
    const firstTab = { id: 'firsttab' };
    const secondTab = { id: 'secondtab' };
    const tabs = [firstTab, secondTab];
    expect(() => setup(firstTab, tabs, () => tabs[1], firstTab)).toThrow(
      'useTabsEventHandler requires tabs to be strings or objects with a name property'
    );
  });

  test('using tab objects without a custom find function wont work and so will throw', () => {
    const firstTab = { name: 'firsttab' };
    const secondTab = { name: 'secondtab' };
    const tabs = [firstTab, secondTab];
    expect(() => setup(firstTab, tabs, () => tabs[1], firstTab)).toThrow(
      'when using tab objects a custom find function is required'
    );
  });

  test('use tab objects and provide a custom find function', () => {
    render(
      <Example
        useObjects
        initialActive="two"
        customFindFn={(tabs, active) => {
          tabs.find((tab) => tab.name === active.name);
        }}
      />
    );
    const buttonAbove = screen.getByText('Some Stuff');
    buttonAbove.focus();
    userEvent.tab();
    const tab2 = screen.getByText('More Tabs');
    const tab1 = screen.getByText('Tab1');
    expect(tab2).toHaveClass('active');
    expect(tab2).toHaveFocus();
    userEvent.keyboard('[ArrowLeft]');
    expect(tab1).toHaveFocus();
  });

  test('arrow up and arrow down have no effect on tab active or focus state', () => {
    render(<Example useObjects initialActive="two" />);
    const buttonAbove = screen.getByText('Some Stuff');
    buttonAbove.focus();
    userEvent.tab();
    const tab2 = screen.getByText('More Tabs');
    expect(tab2).toHaveClass('active');
    expect(tab2).toHaveFocus();
    userEvent.keyboard('[ArrowDown]');
    expect(tab2).toHaveFocus();
    userEvent.keyboard('[ArrowUp]');
    expect(tab2).toHaveFocus();
    expect(tab2).toHaveClass('active');
  });
});
