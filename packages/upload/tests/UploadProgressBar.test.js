import React from 'react';
import renderer from 'react-test-renderer';
import MockUpload from './mockUpload';
import { UploadProgressBar } from '../';

const instance = new MockUpload();

describe('UploadProgressBar', () => {
  afterEach(() => {
    instance.reset();
  });
  test('should render', () => {
    const component = renderer.create(<UploadProgressBar upload={instance} />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render progress', () => {
    const component = renderer.create(<UploadProgressBar upload={instance} />);
    instance.progress(50);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render success', () => {
    const component = renderer.create(<UploadProgressBar upload={instance} />);
    instance.success();
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render error', () => {
    const component = renderer.create(<UploadProgressBar upload={instance} />);
    instance.error('File upload rejected');
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render password verification button', () => {
    const component = renderer.create(<UploadProgressBar upload={instance} />);
    instance.error('Encrypted files require a password', 'encrypted');
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
