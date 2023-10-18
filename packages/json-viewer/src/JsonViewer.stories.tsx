import React from 'react';
import { StoryObj } from '@storybook/react';

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
  component: JsonViewer,
};

export const _Default: StoryObj<typeof JsonViewer> = {
  render: ({ data, expandAll }) => <JsonViewer data={data} expandAll={expandAll} />,
};
