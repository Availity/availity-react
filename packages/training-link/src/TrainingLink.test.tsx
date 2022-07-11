import React from 'react';
import { render } from '@testing-library/react';

import TrainingLink from './TrainingLink';

describe('TrainingLink', () => {
  test('should render a link with correct href', () => {
    const { getByRole } = render(<TrainingLink link="http://catvidoes.com" name="Appeals" />);

    const link = getByRole('link');

    expect(link.getAttribute('href')).toBe('http://catvidoes.com');
  });

  test('should render with name', () => {
    const { container } = render(<TrainingLink link="http://catvidoes.com" name="Appeals" />);

    expect(container).toHaveTextContent('Need Help? Watch a demo (opens in a new tab) for Appeals');
  });

  test('should render link with proper styling', () => {
    const { getByRole } = render(<TrainingLink link="http://catvidoes.com" name="Appeals" />);

    const link = getByRole('link');

    expect(link).toHaveAttribute('class', 'link');
    expect(link).toHaveAttribute('style', 'font-weight: bold;');
  });
});
