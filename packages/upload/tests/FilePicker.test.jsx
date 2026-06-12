import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FilePicker } from '../index.js';

describe('FilePicker', () => {
  test('should render a file input', () => {
    const { container } = render(<FilePicker onChange={() => {}} />);
    const input = container.querySelector('input[type="file"]');
    expect(input).toBeInTheDocument();
  });

  test('should call onChange when a file is selected', () => {
    const onChange = vi.fn();
    const { container } = render(<FilePicker onChange={onChange} />);
    const input = container.querySelector('input[type="file"]');

    fireEvent.change(input, { target: { files: [new File(['content'], 'test.txt', { type: 'text/plain' })] } });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('should accept allowedFileTypes as accept attribute', () => {
    const { container } = render(<FilePicker onChange={() => {}} allowedFileTypes={['.pdf', '.jpg']} />);
    const input = container.querySelector('input[type="file"]');
    expect(input).toHaveAttribute('accept', '.pdf,.jpg');
  });
});
