import React from 'react';
import type { StoryObj } from '@storybook/react';
import Agreement from '../src/Agreement';

export default {
  title: 'Components/Typography/Agreement',
  component: Agreement,
};

export const _Agreement: StoryObj<typeof Agreement> = {
  render: ({ tag, className, children }) => (
    <Agreement tag={tag} className={className}>
      {children}
    </Agreement>
  ),
  args: {
    tag: 'div',
    className: 'my-agreement-class',
    children: 'Sample agreement text',
  },
};
