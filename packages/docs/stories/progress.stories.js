import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number } from '@storybook/addon-knobs/react';
import README from '@availity/progress/README.md';
import Progress from '@availity/progress';

storiesOf('Components|Progress', module)
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
    const width = number('Width', 50);
    return (
      <div>
        <p>{width}% Complete</p>
        <Progress
          animated={boolean('Animated', false)}
          striped={boolean('Striped', false)}
          complete={boolean('Complete', false)}
          width={width}
        />
      </div>
    );
  });
