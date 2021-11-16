import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Wizard from '..';

describe('Wizard', () => {
  afterEach(cleanup);

  test('should render bar style', () => {
    const { getByTestId } = render(<Wizard data-testId="step-wizard-container" bar />);

    const container = getByTestId('step-wizard-container');

    expect(container.className).toContain('stepwizard-bar');
  });

  test('should render stacked style', () => {
    const { getByTestId } = render(
      <Wizard data-testId="step-wizard-container" stacked>
        Foo
      </Wizard>
    );

    const container = getByTestId('step-wizard-container');

    expect(container.className).toContain('stepwizard-stacked');
  });

  test('should render progress style', () => {
    const { getByTestId } = render(<Wizard data-testId="step-wizard-container" progress />);

    const container = getByTestId('step-wizard-container');

    expect(container.className).toContain('stepwizard-progress');
  });
});
