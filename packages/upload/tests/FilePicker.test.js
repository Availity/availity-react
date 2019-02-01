import React from 'react';
import { render } from 'react-testing-library';
import { FilePicker } from '..';

describe('Upload', () => {
  test('should render', () => {
    const { container } = render(<FilePicker onChange={() => {}} />);

    expect(container).toMatchSnapshot();
  });
});
