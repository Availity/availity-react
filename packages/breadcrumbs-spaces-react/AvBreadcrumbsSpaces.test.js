import React from 'react';
import renderer from 'react-test-renderer';
import { AvBreadcrumbsSpaces } from '.';

describe('AvBreadcrumbsSpaces', () => {
  test('should render with attributes', () => {
    const component = renderer.create(
      <AvBreadcrumbsSpaces spaceId="1" spaceName="a" pageName="b" />
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render with with no name', () => {
    const component = renderer.create(
      <AvBreadcrumbsSpaces spaceId="1" pageName="b" />
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
