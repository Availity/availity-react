/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { StoryObj } from '@storybook/react';
import { Badge, BadgeProps, Button } from 'reactstrap';
import { RemovableBadge, BadgeItem } from '.';

export default {
  title: 'Bootstrap Components/Badge/Removable Badge',
  component: RemovableBadge,
  parameters: {
    docs: {},
  },
};

export const _Default: StoryObj<typeof RemovableBadge> = {
  render: ({ value = '1', color = 'primary', displayText = 'This is my Button' }) => {
    const [badgeList, setBadgeList] = useState<BadgeItem[]>([{ value, color, displayText }]);

    const remove = () => {
      setBadgeList([]);
    };

    const onReset = () => {
      setBadgeList([{ value, color, displayText }]);
    };

    return (
      <>
        {badgeList.map((badge) => (
          <RemovableBadge key={badge.value} color={badge.color} value={badge.value} onRemove={remove}>
            {displayText}
          </RemovableBadge>
        ))}

        <section>
          <Button color="secondary" onClick={onReset}>
            Reset Badge
          </Button>
        </section>
      </>
    );
  },
};

export const hidden_RSBadge = (props: BadgeProps) => <Badge {...props} />;
