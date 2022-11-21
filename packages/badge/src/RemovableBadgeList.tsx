import React, { useEffect, useState } from 'react';
import type { BadgeProps } from 'reactstrap';
import find from 'lodash/find';
import without from 'lodash/without';
import orderBy from 'lodash/orderBy';

import RemovableBadge from './RemovableBadge';

export type BadgeItem = {
  /** This is the text that will be displayed in the badge. */
  displayText: string;
  /** This is a unique value for the badge, which is passed up to the onRemove function to describe which badge is being removed. */
  value: string;
  /** Optionally display the badges in a specified order. */
  order?: number;
} & BadgeProps;

export type RemovableBadgeListProps = {
  badges: BadgeItem[];
  id?: string;
  /** This is the function that is called whenever a badge in the list has been removed. It passes in the current badge list, after the badge has been removed. */
  onRemove?: (badgeList: BadgeItem[]) => void;
} & React.HTMLAttributes<HTMLElement>;

const RemovableBadgeList = ({ badges, id, onRemove, ...rest }: RemovableBadgeListProps): JSX.Element => {
  const [badgeList, setBadgeList] = useState(badges);

  useEffect(() => {
    setBadgeList(badges);
  }, [badges]);

  const handleBadgeRemoved = (value: string) => {
    const badgeToRemove = find(badgeList, (badge) => badge.value === value);

    const newBadges = without(badgeList, badgeToRemove) as BadgeItem[];
    setBadgeList(newBadges);

    if (onRemove) {
      onRemove(newBadges);
    }
  };

  return (
    <section data-testid="removable_badge_list_section" {...rest}>
      {orderBy(badgeList, ['order'], ['asc']).map((badge, key) => (
        <RemovableBadge
          data-testid="removable_badge_list_item"
          id={`${id || 'removable_badge_list'}_${badge.value}`}
          key={`${badge.value}${key.toString()}`}
          color={badge.color}
          className="ml-1"
          value={badge.value}
          onRemove={handleBadgeRemoved}
        >
          {badge.displayText}
        </RemovableBadge>
      ))}
    </section>
  );
};
export default RemovableBadgeList;
