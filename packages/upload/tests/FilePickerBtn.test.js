import React from 'react';
import { render } from '@testing-library/react';
import { FilePickerBtn } from '..';

describe('FilePickerBtn', () => {
  test('should render', () => {
    const { container } = render(<FilePickerBtn onChange={() => {}} />);

    expect(container).toMatchSnapshot();
  });

  test('should be disabled when using disabled prop', () => {
    const { getByRole } = render(<FilePickerBtn disabled onChange={() => {}} />);
    const buttonElement = getByRole('button');
    expect(buttonElement).toBeDisabled();
  });

  test('should be enabled when not using disabled prop', () => {
    const { getByRole } = render(<FilePickerBtn onChange={() => {}} />);
    const buttonElement = getByRole('button');
    expect(buttonElement).not.toBeDisabled();
  });
});
