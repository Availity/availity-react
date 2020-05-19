import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { FilePickerBtn } from '..';

afterEach(cleanup);

describe('Upload', () => {
  test('should render', () => {
    const { container } = render(<FilePickerBtn onChange={() => {}} />);

    expect(container).toMatchSnapshot();
  });
});
