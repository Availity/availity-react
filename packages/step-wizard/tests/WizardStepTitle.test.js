import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { WizardStepTitle } from '..';

describe('WizardStepTitle', () => {
  afterEach(cleanup);

  test('should render with stepwizard class', () => {
    const { getByTestId } = render(<WizardStepTitle data-testid="step-wizard-title" />);

    const container = getByTestId('step-wizard-title');

    expect(container.className).toContain('stepwizard-title');
  });
});
