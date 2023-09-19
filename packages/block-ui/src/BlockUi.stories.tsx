import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';

import BlockUi, { Props } from './BlockUi';
// import README from '../README.md';

export default {
  title: 'Components/Block UI',
  component: BlockUi,
  parameters: {
    docs: {
      // page: README,
      description: {
        component: 'Component for blocking sections of a User Interface',
      },
    },
  },
  args: {
    className: '',
    keepInView: false,
    message: 'Loading',
    renderChildren: true,
    tag: 'div',
  },
} as Meta;

const Template: Story<Props> = ({ tag, ...args }) => {
  const [blocking, setBlocking] = useState(true);
  const [blockedCount, setBlockedCount] = useState(0);
  const [unblockedCount, setUnblockedCount] = useState(0);

  return (
    <>
      <button type="button" onClick={() => setBlocking((prev) => !prev)} className="mb-2 btn btn-secondary">
        {blocking ? 'Unblock' : 'Block'}
      </button>
      <div
        style={{
          padding: '2rem',
          backgroundColor: 'steelblue',
          color: 'white',
        }}
      >
        <h1>Parent</h1>
        <BlockUi {...args} blocking={blocking} tag={tag || undefined}>
          <div>
            <h2>Blocked Section</h2>
            <p>This content is a child of BlockUi component and will be blocked.</p>
            <p>Buttons and other HTML elements are not accessible when the component is blocking.</p>
            <button type="button" onClick={() => setBlockedCount((prev) => prev + 1)} className="mr-2 btn btn-light">
              Click Me <span className="badge badge-secondary">{blockedCount}</span>
            </button>
            <button type="button" onClick={() => setBlockedCount(0)} className="btn btn-danger">
              Reset
            </button>
          </div>
        </BlockUi>
        <div style={{ paddingTop: '1rem' }}>
          <h2>Not Blocked Section</h2>
          <p>This content is not a child of BlockUi component and will not be blocked.</p>
          <button type="button" onClick={() => setUnblockedCount((prev) => prev + 1)} className="mr-2 btn btn-light">
            Click Me <span className="badge badge-secondary">{unblockedCount}</span>
          </button>
          <button type="button" onClick={() => setUnblockedCount(0)} className="btn btn-danger">
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export const Default = Template.bind({});
