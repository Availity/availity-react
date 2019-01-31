import React from 'react';
import renderer from 'react-test-renderer';
import PayerLogo from '..';

describe('PayerLogo', () => {
  test('should not render when no space or payer id', () => {
    const component = renderer.create(<PayerLogo />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render with payer id', () => {
    const component = renderer.create(<PayerLogo payerId="BCBSF" />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render with space id', () => {
    const component = renderer.create(
      <PayerLogo spaceId="73162546201441126239486200007187" />
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
