import React from 'react';
import renderer from 'react-test-renderer';
import Feature from '..';

describe('Feature', () => {
  test('should render', () => {
    const component = renderer.create(<Feature features="1234" loader />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
  test('should render with single permission', () => {
    const component = renderer.create(
      <Feature
        features="1234"
        whenDisabled="You do not have permission to see this"
      />
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
  test('should render with array of features', () => {
    const component = renderer.create(
      <Feature
        features={['1234', '2345', ['3456', '4567']]}
        whenDisabled="You do not have permission to see this"
      />
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
  test('should render negate features', () => {
    const component = renderer.create(
      <Feature
        features="1234"
        negate
        whenDisabled="You do not have permission to see this"
      >
        You can see this
      </Feature>
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
