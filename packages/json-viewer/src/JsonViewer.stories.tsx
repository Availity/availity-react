import React from 'react';
import { ArgsTable } from '@storybook/addon-docs';
import { Story, Meta } from '@storybook/react';

import JsonViewer from '.';
// import README from '../README.md';

export default {
  title: 'Components/JsonViewer',
  parameters: {
    docs: {
      // page: README,
      description: {
        component:
          'A straightforward and accessible component for rendering json. Typically used for internal/admin pages for formatting deeply nested objects.',
      },
    },
  },
  args: {
    expandAll: false,
    data: { foo: { bar: { baz: ['stuff', 'things', 'etc.'] } } },
  },
} as Meta;

export const Default: Story = ({ data, expandAll }) => <JsonViewer data={data} expandAll={expandAll} />;

export const Props: Story = () => (
  <>
    <h4>Availity Props</h4>
    <h5>JsonViewer</h5>
    <ArgsTable of={JsonViewer} />
  </>
);

Default.storyName = 'default';
