import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Button } from 'reactstrap';
import Analytics from '@availity/analytics';
import README from '@availity/analytics/README.md';

storiesOf('Components|Analytics', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      // eslint-disable-next-line react/prop-types
      StoryPreview: ({ children }) => <div>{children}</div>,
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
