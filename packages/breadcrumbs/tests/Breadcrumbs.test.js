import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Breadcrumbs from '..';

afterEach(cleanup);

describe('Breadcrumbs', () => {
  test('should render', () => {
    const { container } = render(<Breadcrumbs active="" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render child as current page', () => {
    const { container } = render(<Breadcrumbs active="Payer Space" />);

    expect(container.firstChild).toMatchSnapshot();
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
    const { container } = render(
      <Breadcrumbs crumbs={crumbs} active="Payer Space" />
    );
    expect(container.firstChild).toMatchSnapshot();
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
    const { container } = render(
      <Breadcrumbs crumbs={crumbs} active="Payer Space" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render custom ellipse', () => {
    const crumbs = [
      {
        name: '',
        url: '',
      },
    ];
    const { container } = render(
      <Breadcrumbs crumbs={crumbs} emptyState="???" active="Payer Space" />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
