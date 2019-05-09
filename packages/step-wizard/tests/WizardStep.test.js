import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { WizardStep } from '..';

describe('WizardStep', () => {
  afterEach(cleanup);

  test('should render complete style', () => {
    const { getByTestId } = render(<WizardStep complete />);

    const container = getByTestId('step-wizard-step');

    expect(container.className).toContain('complete');
  });

  test('should render active style', () => {
    const { getByTestId } = render(<WizardStep active />);

    const container = getByTestId('step-wizard-step');

    expect(container.className).toContain('active');
  });

  test('should render disabled style', () => {
    const { getByTestId } = render(<WizardStep disabled />);

    const container = getByTestId('step-wizard-step');

    expect(container.className).toContain('disabled');
  });

  test('should render clickable style', () => {
    const { getByTestId } = render(<WizardStep clickable />);

    const container = getByTestId('step-wizard-step');

    expect(container.className).toContain('stepwizard-step-clickable');
  });

  test('should render link href when tag is an anchor tag', () => {
    const { getByTestId } = render(<WizardStep link href="#step1" />);

    const container = getByTestId('step-wizard-step');

    expect(container.getAttribute('href')).toBe('#step1');
  });

  test('should not render link href when tag is not an anchor tag ', () => {
    const { getByTestId } = render(<WizardStep href="#step1" />);

    const container = getByTestId('step-wizard-step');

    expect(container.getAttribute('href')).toBeFalsy();
  });
});
