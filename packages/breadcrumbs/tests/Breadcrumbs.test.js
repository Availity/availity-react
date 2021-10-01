import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { NavLink } from 'reactstrap';
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
    const { container } = render(<Breadcrumbs crumbs={crumbs} active="Payer Space" />);
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
    const { container } = render(<Breadcrumbs crumbs={crumbs} active="Payer Space" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render custom ellipse', () => {
    const crumbs = [
      {
        name: '',
        url: '',
      },
    ];
    const { container } = render(<Breadcrumbs crumbs={crumbs} emptyState="???" active="Payer Space" />);

    expect(container.firstChild).toMatchSnapshot();
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
