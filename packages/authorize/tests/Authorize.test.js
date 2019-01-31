import React from 'react';
import renderer from 'react-test-renderer';
import Authorize from '..';

describe('Authorize', () => {
  test('should render', () => {
    const component = renderer.create(<Authorize permissions="1234" loader />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
  test('should render with single permission', () => {
    const component = renderer.create(
      <Authorize
        permissions="1234"
        unauthorized="You do not have permission to see this"
      />
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
  test('should render with array of permissions', () => {
    const component = renderer.create(
      <Authorize
        permissions={['1234', 2345, [3456, '4567']]}
        unauthorized="You do not have permission to see this"
      />
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
  test('should render negate permissions', () => {
    const component = renderer.create(
      <Authorize
        permissions="1234"
        negate
        unauthorized="You do not have permission to see this"
      >
        You can see this
      </Authorize>
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
