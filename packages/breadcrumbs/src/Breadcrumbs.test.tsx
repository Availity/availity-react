import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { NavLink } from 'reactstrap';

import Breadcrumbs from './Breadcrumbs';

afterEach(cleanup);

describe('Breadcrumbs', () => {
  test('should render', () => {
    const { container } = render(<Breadcrumbs active="" />);
    expect(container).toBeDefined();
  });

  test('should render child as current page', () => {
    const { getByText } = render(<Breadcrumbs active="Payer Space" />);

    const element = getByText('Payer Space');
    expect(element.className).toBe('active breadcrumb-item');
  });

  test('should render crumbs', () => {
    const crumbs = [
      {
        name: 'my grand parent page',
        url: '/grand-parent-page',
      },
      {
        name: 'my parent page',
        url: '/parent-page',
      },
    ];
    const { getByText } = render(<Breadcrumbs crumbs={crumbs} active="Payer Space" />);

    expect(getByText('my parent page').getAttribute('href')).toBe('/parent-page');
    expect(getByText('my grand parent page').getAttribute('href')).toBe('/grand-parent-page');
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
    const { getByText } = render(<Breadcrumbs crumbs={crumbs} active="Payer Space" />);

    expect(getByText('...')).toBeDefined();
  });

  test('should render custom empty state', () => {
    const crumbs = [
      {
        name: '',
        url: '',
      },
    ];
    const { getByText } = render(<Breadcrumbs crumbs={crumbs} emptyState="???" active="Payer Space" />);

    expect(getByText('???')).toBeDefined();
  });

  test('should render custom home url', () => {
    const { getByText } = render(<Breadcrumbs homeUrl="/go-home" active="Payer Space" />);

    const homeBtn = getByText('Home');

    expect(homeBtn.getAttribute('href')).toBe('/go-home');
  });

  test('should render custom link tag', () => {
    const { getByText } = render(<Breadcrumbs homeUrl="/go-home" active="Payer Space" linkTag={NavLink} />);

    const homeBtn = getByText('Home');

    expect(homeBtn.className).toBe('nav-link');
  });
});
