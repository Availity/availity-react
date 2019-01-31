import React from 'react';
import renderer from 'react-test-renderer';
import AppIcon from '..';

describe('AppIcon', () => {
  test('should render', () => {
    const component = renderer.create(<AppIcon />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render color', () => {
    const component = renderer.create(<AppIcon color="green" />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render size', () => {
    const component = renderer.create(<AppIcon size="lg" />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render children', () => {
    const component = renderer.create(<AppIcon>AI</AppIcon>);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render branded', () => {
    const component = renderer.create(<AppIcon branded />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render additional classNames', () => {
    const component = renderer.create(<AppIcon className="and-more" />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render additional attributes', () => {
    const component = renderer.create(<AppIcon title="Availity Icon" />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render custom tags', () => {
    const component = renderer.create(<AppIcon tag="i" />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
