import React from 'react';
import { render } from '@testing-library/react';
import { AvForm } from 'availity-reactstrap-validation';
import AvSelect from '..';

const options = [
  { label: 'Option 1', value: 'value for option 1' },
  { label: 'Option 2', value: 'value for option 2' },
  { label: 'Option 3', value: 'value for option 3' },
  { label: 'Option 4', value: 'value for option 4' },
];

describe('AvSelect', () => {
  test('should render', () => {
    const { container } = render(
      <AvForm>
        <AvSelect
          options={options}
          name="standAlone"
          aria-label="stand-alone"
        />
      </AvForm>
    );

    expect(container).toMatchSnapshot();
  });

  test('should show selected as active', () => {
    const { container } = render(
      <AvForm>
        <AvSelect
          options={options}
          name="standAlone"
          aria-label="stand-alone"
        />
      </AvForm>
    );

    expect(container).toMatchSnapshot();
  });
});
