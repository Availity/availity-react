import React from 'react';
import renderer from 'react-test-renderer';
import { FilePickerBtn } from '..';

describe('Upload', () => {
  test('should render', () => {
    const component = renderer.create(<FilePickerBtn onChange={() => {}} />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
