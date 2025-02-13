import React from 'react';
import { render } from '@testing-library/react';
import { FilePicker } from '..';

describe('FilePicker', () => {
  test('should render', () => {
    const { container } = render(<FilePicker onChange={() => {}} />);

    expect(container).toMatchSnapshot();
  });
});
