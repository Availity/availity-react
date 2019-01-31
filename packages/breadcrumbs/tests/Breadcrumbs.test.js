import React from 'react';
import renderer from 'react-test-renderer';
import Breadcrumbs from '..';

describe('Breadcrumbs', () => {
  test('should render', () => {
    const component = renderer.create(<Breadcrumbs active="" />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render child as current page', () => {
    const component = renderer.create(<Breadcrumbs active="Payer Space" />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render crumbs', () => {
    const crumbs = [
      {
        name: 'my grand parent page',
        url: '/parent-page',
      },
      {
        name: 'my parent page',
        url: '/grand-parent-page',
      },
    ];
    const component = renderer.create(
      <Breadcrumbs crumbs={crumbs} active="Payer Space" />
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render crumbs with missing values', () => {
    const crumbs = [
      {
        name: 'my grand parent page',
        url: '/parent-page',
      },
      {
        name: '',
        url: '',
      },
    ];
    const component = renderer.create(
      <Breadcrumbs crumbs={crumbs} active="Payer Space" />
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render custom ellipse', () => {
    const crumbs = [
      {
        name: '',
        url: '',
      },
    ];
    const component = renderer.create(
      <Breadcrumbs crumbs={crumbs} emptyState="???" active="Payer Space" />
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
