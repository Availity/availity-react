import React from 'react';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

export default {
  title: '3rd Party/Reactstrap/ButtonGroup',
  parameters: {
    docs: {
      description: {
        component: 'Group a series of buttons together on a single line with the button group.',
      },
      // page: README,
    },
    controls: {
      expanded: true,
    },
  },
};

export const buttonGroup = {
  render: () => (
    <ButtonGroup>
      <Button>Left</Button>
      <Button>Middle</Button>
      <Button>Right</Button>
    </ButtonGroup>
  ),
  name: 'Button-Group',
  args: {},
};

export const toolbarStory = {
  render: () => (
    <ButtonToolbar>
      <ButtonGroup className="me-2">
        <Button color="primary">1</Button>
        <Button color="primary">2</Button>
        <Button color="primary">3</Button>
        <Button color="primary">4</Button>
      </ButtonGroup>
      <ButtonGroup className="me-2">
        <Button color="secondary">5</Button>
        <Button color="secondary">6</Button>
        <Button color="secondary">7</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button color="info">8</Button>
      </ButtonGroup>
    </ButtonToolbar>
  ),
};

export const sizingStory = {
  render: () => (
    <>
      <ButtonGroup size="lg" className="my-2">
        <Button outline>Left</Button>
        <Button outline>Middle</Button>
        <Button outline>Right</Button>
      </ButtonGroup>
      <br />
      <ButtonGroup className="my-2">
        <Button outline>Left</Button>
        <Button outline>Middle</Button>
        <Button outline>Right</Button>
      </ButtonGroup>
      <br />
      <ButtonGroup size="sm" className="my-2">
        <Button outline>Left</Button>
        <Button outline>Middle</Button>
        <Button outline>Right</Button>
      </ButtonGroup>
    </>
  ),
  name: 'Sizing',
};

export const nestingStory = {
  render: () => (
    <ButtonGroup className="my-2">
      <Button color="secondary">Left</Button>
      <Button color="secondary">Middle</Button>
      <ButtonGroup>
        <UncontrolledDropdown>
          <DropdownToggle caret>Dropdown</DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Header</DropdownItem>
            <DropdownItem disabled>Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Another Action</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </ButtonGroup>
    </ButtonGroup>
  ),
  name: 'Nesting',
  args: {},
};
