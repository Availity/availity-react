import React from 'react';
import type { StoryObj } from '@storybook/react';
import Disclaimer from '../src/Disclaimer';

export default {
  title: 'Components/Typography/Disclaimer',
  component: Disclaimer,
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
