import React from 'react';
import renderer from 'react-test-renderer';
import ListGroupItem from '..';

describe('ListGroupItem', () => {
  test('should render', () => {
    const component = renderer.create(<ListGroupItem />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render color', () => {
    const component = renderer.create(<ListGroupItem color="success" />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render border color', () => {
    const component = renderer.create(<ListGroupItem borderColor="success" />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render border color and color', () => {
    const component = renderer.create(
      <ListGroupItem borderColor="success" color="success" />
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
