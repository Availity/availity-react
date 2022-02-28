import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { Button } from 'reactstrap';
import RemovableBadge, { BadgeItem, RemovableBadgeProps } from '../src';

export default {
  title: 'Components/Badge/Removable Badge',
  parameters: {
    docs: {},
  },
} as Meta;

export const Default: Story<RemovableBadgeProps> = ({
  value = '1',
  color = 'primary',
  displayText = 'This is my Button',
}) => {
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
};
Default.storyName = 'default';
