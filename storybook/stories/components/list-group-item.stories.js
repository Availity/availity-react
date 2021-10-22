import React from 'react';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';

import README from '@availity/list-group-item/README.md';

import { Preview } from '../util';

const ListGroup = React.lazy(() => import('@availity/list-group'));
const ListGroupItem = React.lazy(() => import('@availity/list-group-item'));
const ListGroupItemStatus = React.lazy(() => import('@availity/list-group-item/src/ListGroupItemStatus'));

const colorOptions = {
  success: 'success',
  info: 'info',
  danger: 'danger',
  warning: 'warning',
  secondary: 'secondary',
  '(none)': '',
};

export default {
  title: 'Components/List Group Item',
  decorators: [withKnobs],

  parameters: {
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview,
    },
  },
};

export const Default = () => {
  const cards = boolean('Cards', false, 'Card') || undefined;
  return (
    <div>
      <ListGroup cards={cards} selectable={boolean('Selectable', false)}>
        <ListGroupItem
          borderColor={cards && select('Item 1 Border Color', colorOptions, '', 'Card')}
          color={select('Item 1 Background Color', colorOptions, '')}
        >
          item
        </ListGroupItem>
        <ListGroupItem
          borderColor={cards && select('Item 2 Border Color', colorOptions, '', 'Card')}
          color={select('Item 2 Background Color', colorOptions, '')}
        >
          item
        </ListGroupItem>
        <ListGroupItem
          borderColor={cards && select('Item 3 Border Color', colorOptions, '', 'Card')}
          color={select('Item 3 Background Color', colorOptions, '')}
        >
          item
        </ListGroupItem>
      </ListGroup>
      <p>
        When the <code>ListGroup</code> has <code>cards</code> props, <code>ListGroupItem</code> will be able to display
        color.
      </p>
    </div>
  );
};

Default.story = {
  name: 'default',
};

export const Status = () => {
  const cards = boolean('Cards', false, 'Card') || undefined;
  const title = <h5>Item Title</h5>;
  const content = 'item';

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const itemProps = (number) => ({
    color: select(`Item ${number} Color`, colorOptions, '', 'Card'),
    badge: {
      text: text(`Item ${number} Badge`, ''),
      color: select(`Item ${number} Badge Color`, colorOptions, ''),
    },
  });

  const item1Props = itemProps(1);
  const item2Props = itemProps(2);
  const item3Props = itemProps(3);

  return (
    <div>
      <ListGroup cards={cards} selectable={boolean('Selectable', false)}>
        <ListGroupItemStatus {...item1Props}>{content}</ListGroupItemStatus>
        <ListGroupItemStatus {...item2Props} titleContent={title}>
          {content}
        </ListGroupItemStatus>
        <ListGroupItemStatus {...item3Props} titleContent={title}>
          {content}
        </ListGroupItemStatus>
      </ListGroup>
      <p>
        When the <code>ListGroup</code> has <code>cards</code> props, <code>ListGroupItem</code> will be able to display
        color.
      </p>
    </div>
  );
};

Status.story = {
  name: 'status',
};
