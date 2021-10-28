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

  test('should submit parent form on password submit', async () => {
    const handleSubmit = jest.fn();
    const SubmittingForm = () => (
      <form data-testid="form" onSubmit={handleSubmit}>
        <UploadProgressBar upload={instance} />
      </form>
    );
    const { getByTestId, findByLabelText, findByTestId } = render(<SubmittingForm />);
    instance.error('Encrypted files require a password', 'encrypted');
    fireEvent.click(getByTestId('password-form-button'));
    const input = await findByLabelText('Password');
    fireEvent.change(input, { target: { value: 'password123' } });
    const form = await findByTestId('password-form-modal');
    fireEvent.submit(form);
    const progress = await findByTestId('upload-progress');
    expect(progress).toBeDefined();
    expect(handleSubmit).toHaveBeenCalled();
  });

  test('should not submit parent form with onPasswordSubmit stopPropagation', async () => {
    const handleSubmit = jest.fn();
    const NonSubmittingForm = () => (
      <form data-testid="form" onSubmit={handleSubmit}>
        <UploadProgressBar upload={instance} onPasswordSubmit={(e) => e.stopPropagation()} />
      </form>
    );
    const { getByTestId, findByLabelText, findByTestId } = render(<NonSubmittingForm />);
    instance.error('Encrypted files require a password', 'encrypted');
    fireEvent.click(getByTestId('password-form-button'));
    const input = await findByLabelText('Password');
    fireEvent.change(input, { target: { value: 'password123' } });
    const form = await findByTestId('password-form-modal');
    fireEvent.submit(form);
    const progress = await findByTestId('upload-progress');
    expect(progress).toBeDefined();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  test('an undefined passwordModalZIndex should leave the modals zIndex as the default 1050', async () => {
    const { getByTestId, findByTestId } = render(<UploadProgressBar upload={instance} />);
    instance.error('Encrypted files require a password', 'encrypted');
    fireEvent.click(getByTestId('password-form-button'));
    const form = await findByTestId('password-form-modal');
    const container = form.parentElement.parentElement.parentElement.parentElement.parentElement;

    expect(container.style.zIndex).toBe('1050');
  });

  test('setting passwordModalZIndex should change the modals zIndex as the default 1050', async () => {
    const { getByTestId, findByTestId } = render(<UploadProgressBar upload={instance} passwordModalZIndex="auto" />);
    instance.error('Encrypted files require a password', 'encrypted');
    fireEvent.click(getByTestId('password-form-button'));
    const form = await findByTestId('password-form-modal');
    const container = form.parentElement.parentElement.parentElement.parentElement.parentElement;

    expect(container.style.zIndex).toBe('auto');
  });

  // 1 Test for striped and animated
  // striped
  // animated

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
