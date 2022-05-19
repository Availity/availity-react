import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import MockUpload from './mockUpload';
import { UploadProgressBar } from '..';

const instance = new MockUpload();

describe('UploadProgressBar', () => {
  afterEach(() => {
    instance.reset();
    cleanup();
    jest.clearAllMocks();
  });

  test('should render', () => {
    const el = render(<UploadProgressBar upload={instance} />);
    expect(el).toBeDefined();
  });

  test('should render progress', () => {
    const { getByTestId } = render(<UploadProgressBar upload={instance} />);
    instance.progress(50);

    const el = getByTestId('upload-progress');
    expect(el).toBeDefined();
  });

  test('should render success', () => {
    const { getByTestId } = render(<UploadProgressBar upload={instance} />);
    instance.success();

    const progressBar = getByTestId('upload-progress');

    expect(progressBar.className).toContain('progress-complete');
  });

  test('should render error', () => {
    const { getByTestId } = render(<UploadProgressBar upload={instance} />);
    instance.error('File upload rejected');

    const el = getByTestId('upload-error-message');
    expect(el).toBeDefined();
  });

  test('should render password verification button', () => {
    const { getByTestId } = render(<UploadProgressBar upload={instance} />);
    instance.error('Encrypted files require a password', 'encrypted');

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
