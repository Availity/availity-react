import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number, text } from '@storybook/addon-knobs/react';
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
    const value = number('Value', 50);
    const max = number('Max', 100);
    return (
      <div>
        <p>{Math.round((value / max) * 100)}% Complete</p>
        <Progress
          animated={boolean('Animated', false)}
          striped={boolean('Striped', false)}
          complete={boolean('Complete', false)}
          color={text('Color', 'success')}
          value={value}
          max={max}
        />
      </div>
    );
  });
