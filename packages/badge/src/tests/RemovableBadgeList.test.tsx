import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { BadgeItem, RemovableBadgeList } from '..';

const badgeList: BadgeItem[] = [
  { value: '1', color: 'primary', displayText: 'Test 1' },
  { value: '2', color: 'success', displayText: 'Test 2' },
  { value: '3', color: 'danger', displayText: 'Test 3' },
  { value: '4', color: 'warning', displayText: 'Test 4' },
  { value: '5', color: 'info', displayText: 'Test 5' },
  { value: '6', color: 'light', displayText: 'Test 6' },
  { value: '7', color: 'dark', displayText: 'Test 7' },
  { value: '8', displayText: 'Test 9' },
];

describe('Removable Badge List', () => {
  test('should render', async () => {
    const { container, getByTestId, getAllByTestId } = render(<RemovableBadgeList badges={badgeList} />);

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();

    const badgeListElement = await waitFor(() => getByTestId('removable_badge_list_section'));
    expect(badgeListElement).not.toBeNull();

    const badgeListItemElements = await waitFor(() => getAllByTestId('removable_badge_list_item'));
    expect(badgeListItemElements.length).toBe(badgeList.length);
  });

  test('should call onRemove onClick', async () => {
    const onRemove = jest.fn();

    const { container, getByTestId, getAllByTestId } = render(
      <RemovableBadgeList badges={badgeList} onRemove={onRemove} />
    );

    expect(container).toBeDefined();

    const badgeListElement = await waitFor(() => getByTestId('removable_badge_list_section'));
    expect(badgeListElement).not.toBeNull();

    const badgeListItemElements = await waitFor(() => getAllByTestId('removable_badge_list_item'));
    expect(badgeListItemElements).not.toBeNull();

    const firstBadgeElement = getAllByTestId('removable_badge_remove');
    fireEvent.click(firstBadgeElement[0]);

    await waitFor(() => {
      expect(onRemove).toHaveBeenCalledTimes(1);
    });
  });
});
