import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';

import ListGroup from '@availity/list-group';
import ListGroupItem, { ListGroupItemStatus } from '@availity/list-group-item';
import README from '@availity/list-group-item/README.md';

const colorOptions = {
  success: 'success',
  info: 'info',
  danger: 'danger',
  warning: 'warning',
  secondary: 'secondary',
  '(none)': '',
};

storiesOf('Components|List Group Item', module)
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
    const cards = boolean('Cards', false, 'Card') || undefined;
    return (
      <div>
        <ListGroup cards={cards} selectable={boolean('Selectable', false)}>
          <ListGroupItem
            borderColor={
              cards && select('Item 1 Border Color', colorOptions, '', 'Card')
            }
            color={select('Item 1 Background Color', colorOptions, '')}
          >
            item
          </ListGroupItem>
          <ListGroupItem
            borderColor={
              cards && select('Item 2 Border Color', colorOptions, '', 'Card')
            }
            color={select('Item 2 Background Color', colorOptions, '')}
          >
            item
          </ListGroupItem>
          <ListGroupItem
            borderColor={
              cards && select('Item 3 Border Color', colorOptions, '', 'Card')
            }
            color={select('Item 3 Background Color', colorOptions, '')}
          >
            item
          </ListGroupItem>
        </ListGroup>
        <p>
          When the <code>ListGroup</code> has <code>cards</code> props,{' '}
          <code>ListGroupItem</code> will be able to display color.
        </p>
      </div>
    );
  })
  .add('status', () => {
    const cards = boolean('Cards', false, 'Card') || undefined;
    const title = <h5>Item Title</h5>;
    const content = 'item';

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
          When the <code>ListGroup</code> has <code>cards</code> props,{' '}
          <code>ListGroupItem</code> will be able to display color.
        </p>
      </div>
    );
  });
