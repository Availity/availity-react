import React from 'react';
import { render } from '@testing-library/react';
import { AvDate } from '..';
import { AvForm } from 'availity-reactstrap-validation';

describe('AvDate', () => {
  test('should render', () => {
    const { container } = render(
      <AvForm>
        <AvDate
          min="Min Date (yyyy-mm-dd)"
          max="Max Date (yyyy-mm-dd)"
          type="date"
          name="standAlone"
          aria-label="stand-alone"
          datepicker
        />
      </AvForm>
    );

    expect(container).toMatchSnapshot();
  });
});
