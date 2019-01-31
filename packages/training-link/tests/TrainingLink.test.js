import React from 'react';
import renderer from 'react-test-renderer';
import TrainingLink from '..';

describe('TrainingLink', () => {
  test('should not render with link and name', () => {
    const component = renderer.create(
      <TrainingLink link="http://catvidoes.com" name="Appeals" />
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
