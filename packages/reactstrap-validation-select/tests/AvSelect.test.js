import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';
import { AvForm } from 'availity-reactstrap-validation';
import AvSelect from '..';

const options = [
  { label: 'Option 1', value: 'value for option 1' },
  { label: 'Option 2', value: 'value for option 2' },
  { label: 'Option 3', value: 'value for option 3' },
  { label: 'Option 4', value: 'value for option 4' },
];

const renderSelect = props =>
  render(
    <AvForm>
      <AvSelect name="test-form-input" {...props} />
    </AvForm>
  );

describe('AvSelect', () => {
  test('default behavior works', async () => {
    const { container, getByText } = renderSelect({
      options,
      classNamePrefix: 'test',
      getResult: 'regions',
    });

    const select = container.querySelector('.test__control');
    fireEvent.keyDown(select, { key: 'ArrowDown', keyCode: 40 });
    fireEvent.keyDown(select, { key: 'Enter', keyCode: 13 });

    const option = await waitForElement(() => getByText('Option 1'));

    expect(option).toBeDefined();

    fireEvent.click(option);

    expect(
      container.querySelector('.test__creatable__option--is-selected')
    ).toBeDefined();
    expect(select.querySelector('.test__creatable__placeholder')).toBe(null);
  });

  test('creatable works', async () => {
    const { container, getByText } = renderSelect({
      options,
      classNamePrefix: 'test__creatable',
      getResult: 'regions',
      creatable: true,
    });

    const selectInput = container.querySelector('#react-select-3-input');
    fireEvent.change(selectInput, {
      target: { value: 'Test' },
    });
    fireEvent.keyDown(selectInput, { key: 'Enter', keyCode: 13 });

    const selectOption = await waitForElement(() => getByText('Test'));

    expect(selectOption).toBeDefined();

    expect(
      container.querySelector('.test__creatable__option--is-selected')
    ).toBeDefined();
    expect(selectInput.querySelector('.test__creatable__placeholder')).toBe(
      null
    );
  });
});
