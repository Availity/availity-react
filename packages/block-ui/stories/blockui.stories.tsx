import React from 'react';
import { Story, Meta } from '@storybook/react';

import BlockUi, { Props } from '../src/BlockUi';
// import README from '../README.md';

export default {
  title: 'Components/Block UI',
  parameters: {
    docs: {
      // page: README,
    },
  },
  args: {
    blocking: true,
    className: '',
    keepInView: false,
    message: 'Loading',
    renderChildren: true,
    tag: 'div',
  },
} as Meta;

const Template: Story<Props> = (args) => (
  <div
    style={{
      height: '150vh',
      width: '75%',
      borderStyle: 'solid',
      padding: '2rem',
      backgroundColor: 'navy',
      color: 'white',
    }}
  >
    <h1>This content will not be blocked</h1>
    <BlockUi {...args}>
      <div style={{ height: '100vh', borderStyle: 'solid', padding: '2rem', borderColor: 'white' }}>
        <h2>Header</h2>
        <p>This content is a child of BlockUi component and will be blocked.</p>
        <p>Buttons and other HTML elements are not accessible when the component is blocking.</p>
        <button
          type="button"
          onClick={() => {
            // eslint-disable-next-line no-alert
            alert('Button was clicked');
          }}
        >
          Click Me
        </button>
      </div>
    </BlockUi>
  </div>
);

export const Default = Template.bind({});

Default.storyName = 'default';
