import React from 'react';
import { render } from 'react-testing-library';
import PayerLogo from '..';

describe('PayerLogo', () => {
  test('should not render when no space or payer id', () => {
    const { container } = render(<PayerLogo />);

    expect(container).toMatchSnapshot();
  });

  test('should render with payer id', () => {
    const { container } = render(<PayerLogo payerId="BCBSF" />);

    expect(container).toMatchSnapshot();
  });

  test('should render with space id', () => {
    const { container } = render(
      <PayerLogo spaceId="73162546201441126239486200007187" />
    );

    expect(container).toMatchSnapshot();
  });
});
