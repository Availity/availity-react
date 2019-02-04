import React from 'react';
import { render, cleanup } from 'react-testing-library';
import AppIcon from '..';

afterEach(cleanup);

describe('AppIcon', () => {
  test('should render', () => {
    const { container } = render(<AppIcon />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render color', () => {
    const { container } = render(<AppIcon color="green" />);

    expect(container.firstChild.className).toContain('app-icon-green');
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render size', () => {
    const { container } = render(<AppIcon size="lg" />);

    expect(container.firstChild.className).toContain('app-icon-lg');
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render children', () => {
    const { container } = render(<AppIcon>AI</AppIcon>);

    expect(container.firstChild.textContent).toEqual('AI');
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render branded', () => {
    const { container } = render(<AppIcon branded />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render additional classNames', () => {
    const { container } = render(<AppIcon className="and-more" />);

    expect(container.firstChild.className).toContain('and-more');
    expect(container).toMatchSnapshot();
  });

  test('should render additional attributes', () => {
    const { container, getAllByTitle } = render(
      <AppIcon title="Availity Icon" />
    );

    expect(getAllByTitle('Availity Icon')).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  test('should render custom tags', () => {
    const { container } = render(<AppIcon tag="i" />);

    expect(container.firstChild.tagName.toLowerCase()).toEqual('i');
    expect(container).toMatchSnapshot();
  });
});
