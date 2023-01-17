import React from 'react';
import { render } from '@testing-library/react';

import { Label } from '../src';

describe('Label', () => {
  test('renders', () => {
    const { getByText } = render(<Label>Hello Label</Label>);

    const el = getByText('Hello Label');
    expect(el).toBeDefined();
  });

  test('renders with required asterisk', () => {
    const { getByTestId, getByText } = render(<Label required>Hello Label</Label>);

    expect(getByTestId('required-asterisk')).toBeDefined();
    expect(getByText('*')).toBeDefined();
  });

  test('renders with field help icon', () => {
    const { getByTestId } = render(<Label helpId="helloHelp">Hello Label</Label>);

    expect(getByTestId('field-help-icon')).toBeDefined();
  });

  test('renders field help icon with aria-describedby of label id', () => {
    const { getByTestId } = render(
      <Label id="label-id" helpId="helloHelp">
        Hello Label
      </Label>
    );

    const label = getByTestId('label');
    const helpIcon = getByTestId('field-help-icon');

    expect(label).toHaveAttribute('id', 'label-id');
    expect(helpIcon).toHaveAttribute('aria-describedby', 'label-id');
  });

  test('renders field help icon outside of Label', () => {
    const { getByTestId } = render(<Label helpId="helloHelp">Hello Label</Label>);

    expect(getByTestId('label')).toBeDefined();
    expect(getByTestId('field-help-icon')).toBeDefined();
    expect(getByTestId('label')).not.toContainElement(getByTestId('field-help-icon'));
  });

  test('renders no wrapper div when there is field help icon but no class/style changes', () => {
    const { container } = render(<Label helpId="helloHelp">Hello Label</Label>);

    expect(container.querySelector('div')).toBeNull();
    expect(container.querySelector('label')).toBeDefined();
  });

  test('renders no wrapper div when there is class/style changes but no field help icon', () => {
    const { container } = render(
      <Label className="h4" style={{ color: 'purple' }}>
        Hello Label
      </Label>
    );

    expect(container.querySelector('div')).toBeNull();
    expect(container.querySelector('label')).toBeDefined();
  });

  test('renders wrapper div when there is field help icon and class changes', () => {
    const { container } = render(
      <Label helpId="helloHelp" className="h4">
        Hello Label
      </Label>
    );

    expect(container.querySelector('div.h4')).toBeDefined();
    expect(container.querySelector('label.h4')).toBeDefined();
  });

  test('renders wrapper div when there is field help icon and style changes', () => {
    const { container } = render(
      <Label helpId="helloHelp" style={{ fontSize: '200%' }}>
        Hello Label
      </Label>
    );

    expect(container.querySelector("div[style='font-size: 200%']")).toBeDefined();
    expect(container.querySelector("label[style='font-size: 200%']")).toBeDefined();
  });
});
