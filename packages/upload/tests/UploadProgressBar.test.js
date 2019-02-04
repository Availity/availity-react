import React from 'react';
import { render } from 'react-testing-library';
import MockUpload from './mockUpload';
import { UploadProgressBar } from '..';

const instance = new MockUpload();

describe('UploadProgressBar', () => {
  afterEach(() => {
    instance.reset();
  });
  test('should render', () => {
    const { container } = render(<UploadProgressBar upload={instance} />);

    expect(container).toMatchSnapshot();
  });

  test('should render progress', () => {
    const { container } = render(<UploadProgressBar upload={instance} />);
    instance.progress(50);

    expect(container).toMatchSnapshot();
  });

  test('should render success', () => {
    const { container } = render(<UploadProgressBar upload={instance} />);
    instance.success();

    expect(container).toMatchSnapshot();
  });

  test('should render error', () => {
    const { container } = render(<UploadProgressBar upload={instance} />);
    instance.error('File upload rejected');

    expect(container).toMatchSnapshot();
  });

  test('should render password verification button', () => {
    const { container } = render(<UploadProgressBar upload={instance} />);
    instance.error('Encrypted files require a password', 'encrypted');

    expect(container).toMatchSnapshot();
  });
});
