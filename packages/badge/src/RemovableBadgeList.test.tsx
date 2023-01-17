import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BadgeItem, RemovableBadgeList } from '.';

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
    render(<RemovableBadgeList badges={badgeList} />);

    const badgeListElement = await waitFor(() => screen.getByTestId('removable_badge_list_section'));
    expect(badgeListElement).not.toBeNull();

    const badgeListItemElements = await waitFor(() => screen.getAllByTestId('removable_badge_list_item'));
    expect(badgeListItemElements.length).toBe(badgeList.length);
  });

  test('should call onRemove onClick', async () => {
    const onRemove = jest.fn();

    render(<RemovableBadgeList badges={badgeList} onRemove={onRemove} />);

    const badgeListElement = await waitFor(() => screen.getByTestId('removable_badge_list_section'));
    expect(badgeListElement).not.toBeNull();

    const badgeListItemElements = await waitFor(() => screen.getAllByTestId('removable_badge_list_item'));
    expect(badgeListItemElements).not.toBeNull();

    const firstBadgeElement = screen.getAllByTestId('removable_badge_remove');
    fireEvent.click(firstBadgeElement[0]);

    await waitFor(() => {
      expect(onRemove).toHaveBeenCalledTimes(1);
    });
  });
});
