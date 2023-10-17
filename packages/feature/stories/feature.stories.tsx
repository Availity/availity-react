import React from 'react';
import { StoryObj } from '@storybook/react';

import Feature from '../src/Feature';
// import README from "@availity/feature/README.md";

export default {
  title: 'Components/Feature',
  parameters: {
    docs: {
      // page: README,
      description: {
        component:
          'Check environment features for the current environment to determine if a particular feature is enabled.',
      },
    },
  },
  component: Feature,
};

export const _Default: StoryObj<typeof Feature> = {
  render: ({ features, negate, loader, whenDisabled, children }) => (
    <div>
      <p>
        For this demo, the following features are <b>disabled</b>: AV-1234, AV-2345, AV-3456, AV-4567, AV-5678, AV-6789
        (<b>All other features are enabled</b>). You can use the knobs to see what the component will do when you set
        the features to various things.
      </p>
      <hr />
      <Feature features={features} negate={negate} loader={loader} whenDisabled={whenDisabled}>
        {children}
      </Feature>
    </div>
  ),
  args: {
    features: ['AV-1234'],
    negate: false,
    loader: true,
    whenDisabled: 'This feature is disabled',
    children: 'This is the cool new feature. Lucky you, you get to see it.',
  },
};
