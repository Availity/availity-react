import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FilePickerBtn } from '../index.js';

describe('FilePickerBtn', () => {
  test('should render a button with default text', () => {
    const { getByRole } = render(<FilePickerBtn onChange={() => {}} />);
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Select File');
  });

  test('should be disabled when using disabled prop', () => {
    const { getByRole } = render(<FilePickerBtn disabled onChange={() => {}} />);
    expect(getByRole('button')).toBeDisabled();
  });

  test('should be enabled when not using disabled prop', () => {
    const { getByRole } = render(<FilePickerBtn onChange={() => {}} />);
    expect(getByRole('button')).not.toBeDisabled();
  });

  test('should render custom children text', () => {
    const { getByRole } = render(<FilePickerBtn onChange={() => {}}>Upload</FilePickerBtn>);
    expect(getByRole('button')).toHaveTextContent('Upload');
  });

  test('should call onClick when button is clicked', () => {
    const onClick = vi.fn();
    const { getByRole } = render(<FilePickerBtn onChange={() => {}} onClick={onClick} />);
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
