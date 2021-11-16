import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { WizardStep } from '..';

describe('WizardStep', () => {
  afterEach(cleanup);

  test('should render complete style', () => {
    const { getByTestId } = render(<WizardStep data-testid="step-wizard-step" complete />);

    const container = getByTestId('step-wizard-step');

    expect(container.className).toContain('complete');
  });

  test('should render active style', () => {
    const { getByTestId } = render(<WizardStep data-testid="step-wizard-step" active />);

    const container = getByTestId('step-wizard-step');

    expect(container.className).toContain('active');
  });

  test('should render disabled style', () => {
    const { getByTestId } = render(<WizardStep data-testid="step-wizard-step" disabled />);

    const container = getByTestId('step-wizard-step');

    expect(container.className).toContain('disabled');
  });

  test('should render clickable style', () => {
    const { getByTestId } = render(<WizardStep data-testid="step-wizard-step" clickable />);

    const container = getByTestId('step-wizard-step');

    expect(container.className).toContain('stepwizard-step-clickable');
  });

  test('should render anchor tag when href is provided', () => {
    const { getByTestId } = render(<WizardStep data-testid="step-wizard-step" href="#step1" />);

    const container = getByTestId('step-wizard-step');

    expect(container.querySelector('a[href="#step1"]')).toBeDefined();
  });
});
