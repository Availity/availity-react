import React from 'react';
import type { StoryObj } from '@storybook/react-vite';
import Agreement from '../src/Agreement';

export default {
  title: 'Deprecated/Typography/Agreement',
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
