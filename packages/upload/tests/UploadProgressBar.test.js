import React from 'react';
import { render } from '@testing-library/react';
import MockUpload from './mockUpload';
import { UploadProgressBar } from '..';

const instance = new MockUpload();

describe('UploadProgressBar', () => {
  afterEach(() => {
    instance.reset();
  });
  test('should render', () => {
    render(<UploadProgressBar upload={instance} />);
  });

  test('should render progress', () => {
    const { getByTestId } = render(<UploadProgressBar upload={instance} />);
    instance.progress(50);

    getByTestId('upload-progress');
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

    getByTestId('upload-error-message');
  });

  test('should render password verification button', () => {
    const { getByTestId } = render(<UploadProgressBar upload={instance} />);
    instance.error('Encrypted files require a password', 'encrypted');

    getByTestId('password-form-encrypted');
  });

  // 1 Test for striped and animated
  // striped
  // animated

  test('should render striped', () =>{
    const { getByTestId } = render(<UploadProgressBar upload={instance} striped />);
    
    const progressBar = getByTestId('progress-inner')

    expect(progressBar.className).toContain('progress-bar-striped')
    
  })

  test('should render animated', () =>{
    const { getByTestId } = render(<UploadProgressBar upload={instance} animated />);
    
    const progressBar = getByTestId('progress-inner')

    expect(progressBar.className).toContain('progress-bar-animated')
    
  })

  test('should render striped and animated', () =>{
    const { getByTestId } = render(<UploadProgressBar upload={instance} striped animated />);
    
    const progressBar = getByTestId('progress-inner')

    expect(progressBar.className).toContain('animated')
    expect (progressBar.className).toContain('striped')
    
  })


});
