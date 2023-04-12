import React from 'react';
import { ArgsTable } from '@storybook/addon-docs';
import {
  Button,
  ButtonGroup,
  ButtonGroupProps,
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

export const buttonGroup = (args) => (
  <ButtonGroup>
    <Button>Left</Button>
    <Button>Middle</Button>
    <Button>Right</Button>
  </ButtonGroup>
);
buttonGroup.storyName = 'Button-Group';
buttonGroup.args = {};

export const toolbarStory = (args) => (
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
);

export const sizingStory = (args) => (
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
);
sizingStory.storyName = 'Sizing';

export const nestingStory = (args) => (
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
);
nestingStory.storyName = 'Nesting';
nestingStory.args = {};

const verticalStory = (args) => (
  <ButtonGroup vertical>
    <Button color="danger">Button</Button>
    <Button color="warning">Button</Button>
    <Button color="success">Button</Button>
  </ButtonGroup>
);
verticalStory.storyName = 'Vertical';

export const hidden_RSButtonGroup = ({ children, ...buttonGroupProps }: ButtonGroupProps): ButtonGroup => (
  <ButtonGroup {...buttonGroupProps}>{children}</ButtonGroup>
);

export const Props = () => (
  <>
    <h4>Reactstrap Props</h4>
    <h5>Button Group</h5>
    <div className="argstable-remove-default">
      <ArgsTable of={hidden_RSButtonGroup} />
    </div>
  </>
);
