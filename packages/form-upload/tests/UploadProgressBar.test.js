import React from 'react';
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import MockUpload from './mockUpload';

import { UploadProgressBar } from '../src';

describe('UploadProgressBar', () => {
  let instance;
  beforeEach(() => {
    instance = new MockUpload();
  });
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('should render', () => {
    const { container } = render(<UploadProgressBar upload={instance} />);
    expect(container).toBeDefined();
  });

  test('should render progress', () => {
    const { getByTestId } = render(<UploadProgressBar upload={instance} />);
    act(() => {
      instance.progress(50);
    });

    const el = getByTestId('upload-progress');
    expect(el).toBeDefined();
  });

  test('should render success', () => {
    const { getByTestId } = render(<UploadProgressBar upload={instance} />);
    act(() => {
      instance.success();
    });

    const progressBar = getByTestId('upload-progress');
    expect(progressBar.className).toContain('progress-complete');
  });

  test('should render error', async () => {
    const { getByTestId } = render(<UploadProgressBar upload={instance} />);

    act(() => {
      instance.error('File upload rejected');
    });

    await waitFor(() => {
      const el = getByTestId('upload-error-message');
      expect(el).toBeDefined();
    });
  });

  test('should render password verification button', () => {
    const { getByTestId } = render(<UploadProgressBar upload={instance} />);
    act(() => {
      instance.error('Encrypted files require a password', 'encrypted');
    });

    const el = getByTestId('password-form-encrypted');
    expect(el).toBeDefined();
  });

  test('should render password modal', () => {
    const { getByTestId, getByText } = render(<UploadProgressBar upload={instance} />);
    instance.error('Encrypted files require a password', 'encrypted');

    const enterPassword = getByText('Enter password');
    fireEvent.click(enterPassword);

    const modal = getByTestId('password-form-modal');
    expect(modal).toBeDefined();
  });

  test('should not submit parent forms on password submit', () => {
    const submitFunction = jest.fn();

    const { getByTestId, getByText } = render(
      <form onSubmit={submitFunction}>
        <UploadProgressBar upload={instance} />
      </form>
    );
    instance.error('Encrypted files require a password', 'encrypted');

    const enterPassword = getByText('Enter password');
    fireEvent.click(enterPassword);

    const modal = getByTestId('password-form-modal');
    expect(modal).toBeDefined();

    const submit = getByText('Ok');
    fireEvent.click(submit);

    expect(submitFunction).not.toHaveBeenCalled();
  });

  test('should render striped', () => {
    const { getByTestId } = render(<UploadProgressBar upload={instance} striped />);

    const progressBar = getByTestId('progress-inner');
    expect(progressBar.className).toContain('progress-bar-striped');
  });

  test('should render animated', () => {
    const { getByTestId } = render(<UploadProgressBar upload={instance} animated />);

    const progressBar = getByTestId('progress-inner');
    expect(progressBar.className).toContain('progress-bar-animated');
  });

  test('should render striped and animated', () => {
    const { getByTestId } = render(<UploadProgressBar upload={instance} striped animated />);

    const progressBar = getByTestId('progress-inner');

    expect(progressBar.className).toContain('animated');
    expect(progressBar.className).toContain('striped');
  });
});
