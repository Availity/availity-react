import React from 'react';
import { render } from '@testing-library/react';

import TrainingLink from './TrainingLink';

describe('TrainingLink', () => {
  test('should render a link with correct href', () => {
    const { getByRole } = render(<TrainingLink link="http://catvidoes.com" />);

    const link = getByRole('link');

    expect(link.getAttribute('href')).toBe('http://catvidoes.com');
  });

  test('should render without name', () => {
    const { container } = render(<TrainingLink link="http://catvidoes.com" />);

    expect(container).toHaveTextContent('Need Help? Learn More');
  });

  test('should render link with proper styling', () => {
    const { getByRole } = render(<TrainingLink link="http://catvidoes.com" />);

    const link = getByRole('link');

    expect(link).toHaveAttribute('class', 'link');
    expect(link).toHaveAttribute('style', 'font-weight: bold;');
  });
});
