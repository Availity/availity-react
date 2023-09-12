import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import MockUpload from './mockUpload';
import { UploadProgressBar } from '../src';

describe('UploadProgressBar', () => {
  let instance;

  beforeEach(() => {
    instance = new MockUpload();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render', async () => {
    const { getByTestId } = render(<UploadProgressBar upload={instance} />);

    getByTestId('upload-progress');
  });

  test('should show progress', async () => {
    const { getByTestId } = render(<UploadProgressBar upload={instance} />);

    act(() => {
      instance.progress(50);
    });

    getByTestId('upload-progress');
  });

  test('should show success', () => {
    const { getByTestId } = render(<UploadProgressBar upload={instance} />);

    act(() => {
      instance.success();
    });

    const progressBar = getByTestId('upload-progress');
    expect(progressBar.className).toContain('progress-complete');
  });

  test('should show error', async () => {
    const { getByTestId } = render(<UploadProgressBar upload={instance} />);

    act(() => {
      instance.error('File upload rejected');
    });

    getByTestId('upload-error-message');
  });

  test('should show password verification button', async () => {
    const { getByTestId } = render(<UploadProgressBar upload={instance} />);

    act(() => {
      instance.error('Encrypted files require a password', 'encrypted');
    });

    getByTestId('password-form-encrypted');
  });

  test('should show password modal', () => {
    const { getByTestId, getByText } = render(<UploadProgressBar upload={instance} />);

    act(() => {
      instance.error('Encrypted files require a password', 'encrypted');
    });

    const enterPassword = getByText('Enter password');
    fireEvent.click(enterPassword);

    getByTestId('password-form-modal');
  });

  test('should not submit parent forms on password submit', () => {
    const submitFunction = jest.fn();

    const { getByTestId, getByText } = render(
      <form onSubmit={submitFunction}>
        <UploadProgressBar upload={instance} />
      </form>
    );

    act(() => {
      instance.error('Encrypted files require a password', 'encrypted');
    });

    const enterPassword = getByText('Enter password');
    fireEvent.click(enterPassword);

    const modal = getByTestId('password-form-modal');
    expect(modal).toBeDefined();

    const submit = getByText('Ok');
    fireEvent.click(submit);

    expect(submitFunction).not.toHaveBeenCalled();
  });

  test('should show striped', () => {
    const { getByTestId } = render(<UploadProgressBar upload={instance} striped />);

    const progressBar = getByTestId('progress-inner');
    expect(progressBar.className).toContain('progress-bar-striped');
  });

  test('should show animated', () => {
    const { getByTestId } = render(<UploadProgressBar upload={instance} animated />);

    const progressBar = getByTestId('progress-inner');
    expect(progressBar.className).toContain('progress-bar-animated');
  });

  test('should show striped and animated', () => {
    const { getByTestId } = render(<UploadProgressBar upload={instance} striped animated />);

    const progressBar = getByTestId('progress-inner');

    expect(progressBar.className).toContain('animated');
    expect(progressBar.className).toContain('striped');
  });
});
