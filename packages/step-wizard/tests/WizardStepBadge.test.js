import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { WizardStepBadge } from '..';

describe('WizardStepBadge', () => {
  afterEach(cleanup);

  test('should render with stepwizard class', () => {
    const { getByTestId } = render(
      <WizardStepBadge data-testid="step-wizard-badge" />
    );

    const container = getByTestId('step-wizard-badge');

    expect(container.className).toContain('stepwizard-badge');
  });
});
