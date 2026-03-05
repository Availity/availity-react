import React, { useState } from 'react';
import { Button, Modal, ModalProps, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default {
  title: '3rd Party/Reactstrap/Modal',
  parameters: {
    docs: {
      description: {
        component:
          'Blocking modal dialog. Pay attention to accessibility issues with heading level and accessible name for the dialog.',
      },
      // page: README,
    },
    controls: {
      expanded: true,
    },
  },
};

const ModalElement = (args: ModalProps) => {
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

export const modal = {
  render: (args: ModalProps) => <ModalElement {...args} />,
  args: {
    fullscreen: false,
    size: undefined,
    backdrop: true,
    fade: true,
    centered: false,
    scrollable: false,
  },
  argTypes: {
    fullscreen: {
      control: { type: 'select' },
      options: ['', true, 'sm', 'md', 'lg', 'xl'],
    },
    size: {
      control: { type: 'select' },
      options: ['', 'sm', 'lg', 'xl'],
    },
  },
  name: 'default',
};

export const modalDisplayStory = {
  render: () => (
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
  ),
  name: 'Modal (display only)',
};
