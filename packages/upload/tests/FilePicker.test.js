import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { FilePicker } from '..';

afterEach(cleanup);

describe('Upload', () => {
  test('should render', () => {
    const { container } = render(<FilePicker onChange={() => {}} />);

    expect(container).toMatchSnapshot();
  });
});
