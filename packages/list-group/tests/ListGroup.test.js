import React from 'react';
import renderer from 'react-test-renderer';
import ListGroup from '..';

describe('ListGroup', () => {
  test('should render', () => {
    const component = renderer.create(<ListGroup />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render cards', () => {
    const component = renderer.create(<ListGroup cards />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render selectable', () => {
    const component = renderer.create(<ListGroup selectable />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render selectable cards', () => {
    const component = renderer.create(<ListGroup selectable cards />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
