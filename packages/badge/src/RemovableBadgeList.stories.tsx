import React, { useState } from 'react';
import { StoryObj } from '@storybook/react';
import { Button } from 'reactstrap';
import { RemovableBadgeList, BadgeItem, RemovableBadgeProps } from '.';

export default {
  title: 'Components/Badge/Removable Badge/List',
  component: RemovableBadgeList,
  parameters: {
    docs: {
      // page: README,
      description: {
        component:
          'This component allows you to specify a list of badges and handles removing the badge from the badge list.',
      },
    },
  },
};

export const _Default: StoryObj<typeof RemovableBadgeList> = {
  render: () => {
    const defaultBadgeList: BadgeItem[] = [
      { value: '1', color: 'primary', displayText: 'Test 1' },
      { value: '2', color: 'success', displayText: 'Test 2' },
      { value: '3', color: 'danger', displayText: 'Test 3' },
      { value: '4', color: 'warning', displayText: 'Test 4' },
      { value: '5', color: 'info', displayText: 'Test 5' },
      { value: '6', color: 'light', displayText: 'Test 6' },
      { value: '7', color: 'dark', displayText: 'Test 7' },
      { value: '8', displayText: 'Test 9' },
    ];
    const [badgeList, setBadgeList] = useState<BadgeItem[]>(defaultBadgeList);

    const remove = () => {
      setBadgeList(defaultBadgeList);
    };

    const onRemoveBadge = (badgeList: BadgeItem[]) => {
      setBadgeList(badgeList);
    };

    return (
      <>
        <RemovableBadgeList badges={badgeList} onRemove={onRemoveBadge} />
        <section>
          <Button color="secondary" onClick={remove}>
            Reset Badges
          </Button>
        </section>
      </>
    );
  },
};
