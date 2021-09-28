import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Button } from 'reactstrap';

import README from '@availity/analytics/README.md';

import { Preview } from '../util';

const Analytics = React.lazy(() => import('@availity/analytics'));

storiesOf('Components/Analytics', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview,
    },
  })
  .addDecorator(withKnobs)
  .add('default', () => {
    const plugin = {
      isEnabled: () => true,
      init: () => {},
      trackEvent: (e) => {
        alert(JSON.stringify(e));
      },
      trackPageView: () => {},
    };

    return (
      <Analytics
        plugins={[plugin]}
        options={{
          recursive: true,
          attributePrefix: 'data-av-analytics',
        }}
      >
        <Button
          id="buttonId"
          data-av-analytics-on="click"
          data-av-analytics-action="click"
          data-av-analytics-test-id="hello"
        >
          Click Me
        </Button>
      </Analytics>
    );
  });
