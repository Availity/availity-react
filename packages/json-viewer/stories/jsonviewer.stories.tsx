import React from 'react';
import { Story, Meta } from '@storybook/react';

import JsonViewer from '..';
// import README from '../README.md';

export default {
  title: 'Components/JsonViewer',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const WithoutExpandAll: Story = () => ( 
    <JsonViewer data={{foo: {bar: {baz: ['stuff', 'things', 'etc.']}}}} expandAll={false}/>
);

WithoutExpandAll.storyName = 'with expandAll false';

export const WithExpandAll: Story = () => (
    <JsonViewer data={{foo: {bar: {baz: ['stuff', 'things', 'etc.']}}}} expandAll/>
);
WithExpandAll.storyName = 'with expandAll true';
