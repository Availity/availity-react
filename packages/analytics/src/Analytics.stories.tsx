/* eslint-disable no-console */
import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Button } from 'reactstrap';
import { ArgsTable } from '@storybook/addon-docs';

import Analytics from './Analytics';
// import README from '../README.md';

export default {
  title: 'Components/Analytics',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const Default: Story = ({ id, action, eventModifiers, recursive }) => {
  const [state, setState] = React.useState('');
  const [count, setCount] = React.useState(0);

  const plugins = React.useMemo(
    () => [
      {
        isEnabled: () => {
          console.log('checking isEnabled');
          return true;
        },
        init: () => {
          console.log('init');
        },
        trackEvent(event: unknown) {
          console.log('track event', event);
          setState(JSON.stringify(event, null, 2));
          setCount((current) => current + 1);
        },
        trackPageView(url: unknown) {
          console.log('track page view', url);
        },
      },
    ],
    []
  );

  return (
    <Analytics plugins={plugins} eventModifiers={eventModifiers} recursive={recursive}>
      <p>
        This example is set up to track user events. <code>Select</code> allows logging for the blur event.{' '}
        <code>Textarea</code> and <code>Input</code> log when focused. Both of these buttons log when clicked.
      </p>
      <p>Events logged: {count}</p>
      <pre>Last Event: {state}</pre>
      <div data-analytics-app-name="app" className="d-flex flex-column" style={{ maxWidth: '500px' }}>
        <div data-analytics-container="select" className="d-flex justify-content-between">
          <label id="select-label" htmlFor="select">
            Select
          </label>
          <select id="select" aria-labelledby="select-label" data-analytics-action="blur">
            <option value="charmander">Charmander</option>
            <option value="squirtle">Squirtle</option>
            <option value="bulbasaur">Bulbasaur</option>
          </select>
        </div>
        <div data-analytics-container="textarea" className="d-flex justify-content-between">
          <label id="textarea-label" htmlFor="textarea">
            Text Area
          </label>
          <textarea id="textarea" data-analytics-action="focus" />
        </div>
        <div data-analytics-container="input" className="d-flex justify-content-between">
          <label id="input-label" htmlFor="input">
            Input
          </label>
          <input id="input" data-analytics-action="focus" />
        </div>
        <div data-analytics-container="buttons" className="mt-3">
          <Button
            id="reset-button"
            data-analytics-action="click"
            data-analytics-test-id="world"
            className="mr-2"
            onClick={() => setCount(0)}
          >
            Reset Count
          </Button>
          <Button id={id} data-analytics-action={action} data-analytics-test-id="hello" color="primary">
            Click Me
          </Button>
        </div>
      </div>
    </Analytics>
  );
};

export const Props: Story = () => (
  <>
    <h4>Availity Props</h4>
    <h5>Analytics</h5>
    <ArgsTable of={Analytics} />
  </>
);

Default.args = {
  id: 'my-button',
  action: 'click',
  eventModifiers: ['action'],
  recursive: true,
};

Default.storyName = 'default';
