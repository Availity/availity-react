import React, { useState } from 'react';
import { ArgsTable } from '@storybook/addon-docs';
import {
  Button,
  Modal,
  ModalProps,
  ModalHeader,
  ModalHeaderProps,
  ModalBody,
  ModalBodyProps,
  ModalFooter,
  ModalFooterProps,
} from 'reactstrap';

export default {
  title: '3rd Party/Reactstrap/Modal',
  parameters: {
    docs: {
      description: {
        component:
          'Custom Buttons for actions in forms, dialogs, and more with support for multiple sizes, states, and more.',
      },
      // page: README,
    },
    controls: {
      expanded: true,
    },
  },
};

export const modal = (args) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Click Me
      </Button>
      <Modal isOpen={modal} toggle={toggle} labelledBy="modal-story-header" {...args}>
        <ModalHeader id="modal-story-header" toggle={toggle}>
          Modal title
        </ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
modal.args = {
  fullscreen: false,
  size: undefined,
  backdrop: true,
  fade: true,
  centered: false,
  scrollable: false,
};

modal.argTypes = {
  fullscreen: {
    control: { type: 'select' },
    options: ['', true, 'sm', 'md', 'lg', 'xl'],
  },
  size: {
    control: { type: 'select' },
    options: ['', 'sm', 'lg', 'xl'],
  },
};
modal.storyName = 'default';

export const modalDisplayStory = () => (
  <div className="modal-dialog" aria-labelledby="display-modal-story-header" role="dialog" tabIndex={-1}>
    <div className="modal-content">
      <ModalHeader id="display-modal-story-header" toggle={() => null}>
        Header
      </ModalHeader>
      <ModalBody>Body</ModalBody>
      <ModalFooter>
        <Button>Button</Button>
      </ModalFooter>
    </div>
  </div>
);
modalDisplayStory.storyName = 'Modal (display only)';

// export const ButtonStory = (args) => <Button {...args} />;
// ButtonStory.storyName = 'Button';
// ButtonStory.args = {
//   children: 'Click Me',
//   color: 'primary',
//   outline: false,
//   size: undefined,
//   block: false,
//   active: false,
//   close: false,
// };
// ButtonStory.argTypes = {
//   color: {
//     control: { type: 'select' },
//     options: colors,
//   },
//   size: {
//     control: { type: 'select' },
//     options: ['', 'sm', 'lg'],
//   },
// };

export const hidden_RSModal = ({ children, ...ModalProps }: ModalProps): Modal => (
  <Modal {...ModalProps}>{children}</Modal>
);
export const hidden_RSModalHeader = ({ children, ...ModalHeaderProps }: ModalHeaderProps): ModalHeader => (
  <ModalHeader {...ModalHeaderProps}>{children}</ModalHeader>
);
export const hidden_RSModalBody = ({ children, ...ModalBodyProps }: ModalBodyProps): ModalBody => (
  <ModalBody {...ModalBodyProps}>{children}</ModalBody>
);
export const hidden_RSModalFooter = ({ children, ...ModalFooterProps }: ModalFooterProps): ModalFooter => (
  <ModalFooter {...ModalFooterProps}>{children}</ModalFooter>
);

export const Props = () => (
  <>
    <h4>Reactstrap Props</h4>
    <h5>Modal</h5>
    <div className="argstable-remove-default">
      <ArgsTable of={hidden_RSModal} />
    </div>
    <h5>ModalHeader</h5>
    <div className="argstable-remove-default">
      <ArgsTable of={hidden_RSModalHeader} />
    </div>
    <h5>ModalBody</h5>
    <div className="argstable-remove-default">
      <ArgsTable of={hidden_RSModalBody} />
    </div>
    <h5>ModalFooter</h5>
    <div className="argstable-remove-default">
      <ArgsTable of={hidden_RSModalFooter} />
    </div>
  </>
);
