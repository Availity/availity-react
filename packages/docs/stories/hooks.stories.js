/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import { text, number } from '@storybook/addon-knobs/react';
import { withKnobs } from '@storybook/addon-knobs';
import {
  useToggle,
  useEffectAsync,
  useCurrentRegion,
  useDisclaimer,
  useMount,
  useTimeout,
} from '@availity/hooks';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';

import README from '@availity/hooks/README.md';

const asyncFunction = data =>
  new Promise(resolve => setInterval(() => resolve(data), 1000));

const Component = ({ initialValue = false }) => {
  const [isToggled, toggle] = useToggle(initialValue);

  return (
    <Button onClick={toggle} color="primary">
      {isToggled ? 'World' : 'Hello'}
    </Button>
  );
};

const AsyncComponent = ({ mockData }) => {
  const [loading, toggle] = useToggle(true);
  const [state, setState] = useState(null);

  useEffectAsync(async () => {
    if (!loading) {
      toggle();
    }

    const newState = await asyncFunction(mockData);

    setState(newState);
    toggle();
  }, [mockData]);

  return <Card>{loading ? 'Loading...' : state}</Card>;
};

storiesOf('Hooks|useToggle', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      // eslint-disable-next-line react/prop-types
      StoryPreview: ({ children }) => <div>{children}</div>,
    },
  })
  .add('default', () => <Component />)
  .add('with initialValue', () => <Component initialValue />);

storiesOf('Hooks|useEffectAsync', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      // eslint-disable-next-line react/prop-types
      StoryPreview: ({ children }) => <div>{children}</div>,
    },
  })
  .addDecorator(withKnobs)
  .add('default', () => (
    <AsyncComponent mockData={text('Data', 'Test Data')} />
  ));

storiesOf('Hooks|useMount', module)
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
    const Component = () => {
      const [text, setText] = useState('hello');

      useMount(() => {
        setText('world');
      });

      return <span>{text}</span>;
    };

    return <Component />;
  });

storiesOf('Hooks|useTimeout', module)
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
    const beforeTimeoutText = text('Before Timeout', 'Hello');
    const afterTimeoutText = text('After Timeout', 'World');

    const Component = () => {
      const [value, setValue] = useState(beforeTimeoutText);
      const ready = useTimeout(number('Timeout', 3000));

      useEffect(() => {
        if (ready) {
          setValue(afterTimeoutText);
        }
      }, [ready]);

      return <span>{value}</span>;
    };

    return <Component />;
  });

storiesOf('Hooks|resources', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      // eslint-disable-next-line react/prop-types
      StoryPreview: ({ children }) => <div>{children}</div>,
    },
  })
  .addDecorator(withKnobs)
  .add('useDisclaimer', () => {
    const SomeComponent = () => {
      const [disclaimer, loading] = useDisclaimer('1234');

      return (
        <Card>
          <CardTitle className="text-center" tag="h4">
            Disclaimer
          </CardTitle>
          <CardBody>{loading ? 'Loading...' : disclaimer}</CardBody>
        </Card>
      );
    };

    return <SomeComponent />;
  })
  .add('useCurrentRegion', () => {
    const SomeComponent = () => {
      const [currentRegion, loading] = useCurrentRegion();

      return (
        <Card body>
          <CardTitle className="text-center" tag="h4">
            Region
          </CardTitle>
          <CardBody>
            {loading ? 'Loading...' : JSON.stringify(currentRegion)}
          </CardBody>
        </Card>
      );
    };

    return <SomeComponent />;
  });
