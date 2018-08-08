import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import Upload from '../';

describe('Upload', () => {
  test('should render', () => {
    const component = renderer.create(
      <Upload clientId="a" bucketId="b" customerId="c" />
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('adding a file', () => {
    const component = shallow(
      <Upload clientId="a" bucketId="b" customerId="c" />
    );
    const instance = component.instance();
    const file = new Buffer.from('hello world'.split('')); // eslint-disable-line new-cap
    file.name = 'fileName.png';
    const fileEvent = { target: { files: [file] } };
    instance.handleFileInputChange(fileEvent);

    expect(instance.files.length).toBe(1);
  });

  test('removing a file', () => {
    const component = shallow(
      <Upload clientId="a" bucketId="b" customerId="c" />
    );
    const instance = component.instance();
    const file = new Buffer.from('hello world'.split('')); // eslint-disable-line new-cap
    file.name = 'fileName.png';
    const fileEvent = { target: { files: [file] } };
    instance.handleFileInputChange(fileEvent);

    expect(instance.files.length).toBe(1);
    instance.removeFile(instance.files[0].id);

    expect(instance.files.length).toBe(0);
  });

  test('calls onFileRemove callback', () => {
    const mockFunc = jest.fn();
    const component = shallow(
      <Upload
        clientId="a"
        bucketId="b"
        customerId="c"
        onFileRemove={mockFunc}
      />
    );
    const instance = component.instance();
    const file = new Buffer.from('hello world'.split('')); // eslint-disable-line new-cap
    file.name = 'fileName.png';
    const fileEvent = { target: { files: [file] } };
    instance.handleFileInputChange(fileEvent);

    expect(instance.files.length).toBe(1);
    instance.removeFile(instance.files[0].id);
    expect(mockFunc.mock.calls.length).toBe(1);
  });
});
