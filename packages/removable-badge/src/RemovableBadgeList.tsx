import React, { useEffect, useState } from 'react';
import { BadgeProps } from 'reactstrap';
import find from 'lodash/find';
import without from 'lodash/without';
import orderBy from 'lodash/orderBy';
import RemovableBadge from './RemovableBadge';

export type BadgeItem = {
  displayText: string;
  value: string;
  order?: number;
} & BadgeProps;

export type Props = {
  id?: string;
  onRemove?: (badgeList: BadgeItem[]) => void;
  badges: BadgeItem[];
} & React.HTMLAttributes<HTMLElement>;

const RemovableBadgeList = ({ id, badges, onRemove, ...rest }: Props): JSX.Element => {
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
