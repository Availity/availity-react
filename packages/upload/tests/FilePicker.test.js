import React from 'react';
import renderer from 'react-test-renderer';
import { FilePicker } from '../';

describe('Upload', () => {
  test('should render', () => {
    const component = renderer.create(<FilePicker onChange={() => {}} />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
