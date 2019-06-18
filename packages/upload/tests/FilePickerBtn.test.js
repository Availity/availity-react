import React from 'react';
import { render } from '@testing-library/react';
import { FilePickerBtn } from '..';

describe('Upload', () => {
  test('should render', () => {
    const { container } = render(<FilePickerBtn onChange={() => {}} />);

    expect(container).toMatchSnapshot();
  });
});
