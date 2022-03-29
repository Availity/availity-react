import React from 'react';
import { render, cleanup } from '@testing-library/react';
import JsonViewer from '..';

afterEach(cleanup);

describe('JsonViewer', () => {
  test('renders keys with null or undefined values without throwing error', () => {
    const { getByText } = render(<JsonViewer data={{ foo: 'bar', baz: null, somethingElse: undefined }} expandAll={false} />);
    const el = getByText(/bar/i);
    expect(el).toBeInTheDocument();
  });
});