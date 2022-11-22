import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { Badge, BadgeProps, Button } from 'reactstrap';
import { RemovableBadge, BadgeItem, RemovableBadgeProps } from '.';
import { ArgsTable } from '@storybook/addon-docs';

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

export const hidden_RSBadge = (props: BadgeProps) => <Badge {...props} />;
export const Props: Story = () => (
  <>
    <h4>Availity Props</h4>
    <h5>Removable Badge</h5>
    <ArgsTable of={RemovableBadge} />

    <h4>Reactstrap Props</h4>
    <h5>Badge</h5>
    <div>Additional props on RemovableBadge spread to this component</div>
    <div className="argstable-remove-default">
      <ArgsTable of={hidden_RSBadge} />
    </div>
  </>
);

Default.storyName = 'default';
