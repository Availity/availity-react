import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Wizard from '..';

describe('Wizard', () => {
  afterEach(cleanup);

  test('should render bar style', () => {
    const { getByTestId } = render(<Wizard bar />);

    const container = getByTestId('step-wizard-container');

    expect(container.className).toContain('stepwizard-bar');
  });

  test('should render stacked style', () => {
    const { getByTestId } = render(<Wizard stacked />);

    const container = getByTestId('step-wizard-container');

    expect(container.className).toContain('stepwizard-stacked');
  });

  test('should render progress style', () => {
    const { getByTestId } = render(<Wizard progress />);

    const container = getByTestId('step-wizard-container');

    expect(container.className).toContain('stepwizard-progress');
  });
});
