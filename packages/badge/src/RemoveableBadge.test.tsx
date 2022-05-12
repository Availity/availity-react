import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import RemovableBadge from './RemovableBadge';

describe('Removable Badge', () => {
  test('should render', async () => {
    const onRemove = jest.fn();
    const displayText = 'My Badge';
    const color = 'primary';

    render(
      <RemovableBadge onRemove={onRemove} value="badgeValue" color={color}>
        {displayText}
      </RemovableBadge>
    );

    const badgeElement = await waitFor(() => screen.getByTestId('removable_badge'));
    expect(badgeElement).not.toBeNull();
    expect(badgeElement.textContent).toBe(displayText);
    expect(badgeElement.className).toContain(color);
  });

  test('should call onRemove onClick', async () => {
    const onRemove = jest.fn();
    const displayText = 'My Badge';
    const color = 'primary';

    render(
      <RemovableBadge onRemove={onRemove} value="badgeValue" color={color}>
        {displayText}
      </RemovableBadge>
    );

    const badgeElement = await waitFor(() => screen.getByTestId('removable_badge'));
    expect(badgeElement).not.toBeNull();

    const removeIcon = await waitFor(() => screen.getByTestId('removable_badge_remove'));
    expect(removeIcon).not.toBeNull();
    fireEvent.click(removeIcon);

    await waitFor(() => {
      expect(onRemove).toHaveBeenCalledTimes(1);
    });
  });
});
