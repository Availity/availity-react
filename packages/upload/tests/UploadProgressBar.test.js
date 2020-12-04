import React from 'react';
import { render, cleanup } from '@testing-library/react';
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
    const bar = render(<UploadProgressBar upload={instance} />);
    expect(bar).toBeDefined();
  });

  test('should render progress', () => {
    const { getByTestId } = render(<UploadProgressBar upload={instance} />);
    instance.progress(50);

    const progress = getByTestId('upload-progress');
    expect(progress).toBeDefined();
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

    const message = getByTestId('upload-error-message');
    expect(message).toBeDefined();
  });

  test('should render password verification button', () => {
    const { getByTestId } = render(<UploadProgressBar upload={instance} />);
    instance.error('Encrypted files require a password', 'encrypted');

    const btn = getByTestId('password-form-encrypted');
    expect(btn).toBeDefined();
  });

  // 1 Test for striped and animated
  // striped
  // animated

  test('should render striped', () => {
    const { getByTestId } = render(
      <UploadProgressBar upload={instance} striped />
    );

    const progressBar = getByTestId('progress-inner');

    expect(progressBar.className).toContain('progress-bar-striped');
  });

  test('should render animated', () => {
    const { getByTestId } = render(
      <UploadProgressBar upload={instance} animated />
    );

    const progressBar = getByTestId('progress-inner');

    expect(progressBar.className).toContain('progress-bar-animated');
  });

  test('should render striped and animated', () => {
    const { getByTestId } = render(
      <UploadProgressBar upload={instance} striped animated />
    );

    const progressBar = getByTestId('progress-inner');

    expect(progressBar.className).toContain('animated');
    expect(progressBar.className).toContain('striped');
  });
});
