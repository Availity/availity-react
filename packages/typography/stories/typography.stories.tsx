import React from 'react';
import type { StoryObj } from '@storybook/react';
import Disclaimer from '../src/Disclaimer';
import Agreement from '../src/Agreement';

export default {
  title: 'Components/Typography',
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

export const _Disclaimer: StoryObj<typeof Disclaimer> = {
  render: ({ tag, className, styled, children }) => (
    <Disclaimer tag={tag} className={className} styled={styled}>
      {children}
    </Disclaimer>
  ),
  args: {
    tag: 'div',
    className: 'my-disclaimer-class',
    styled: true,
    children: 'Sample disclaimer text',
  },
};
