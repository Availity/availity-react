import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ListGroupItemStatus } from '..';

afterEach(cleanup);

describe('ListGroupItem', () => {
  test('should render', () => {
    const { getByTestId } = render(<ListGroupItemStatus />);

    getByTestId('list-group-item-status-id');
  });

  test('should render color', () => {
    const { getByTestId } = render(<ListGroupItemStatus color="success" />);

    const el = getByTestId('list-group-item-status-id');
    expect(el.className).toContain('success list-group-item');
  });

  test('should render titleContent', () => {
    const { getByTestId } = render(
      <ListGroupItemStatus titleContent="Hello World" />
    );

    const el = getByTestId('lgi-title-content');
    expect(el.textContent).toBe('Hello World');
  });

  test('should render Badge Text', () => {
    const { getByTestId } = render(
      <ListGroupItemStatus borderColor="success" badge="Hello World" />
    );

    getByTestId('lgi-content-wrapper');
    const badge = getByTestId('lgi-badge');
    expect(badge.textContent).toBe('Hello World');
  });

  test('should render Badge Object', () => {
    const { getByTestId } = render(
      <ListGroupItemStatus
        badge={{
          text: 'Hello World',
          color: 'primary',
        }}
      />
    );

    const badge = getByTestId('lgi-badge');
    expect(badge.textContent).toBe('Hello World');
    expect(badge.className).toContain('badge-primary');
  });
});
