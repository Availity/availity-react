import React from 'react';
import { render } from 'react-testing-library';
import Feedback from '..';

describe('Feedback', () => {
  test('should render', () => {
    const { container } = render(<Feedback appName="Payer Space" />);

    expect(container).toMatchSnapshot();
  });

  test('should render custom button text', () => {
    const { container } = render(
      <Feedback appName="Payer Space">Provide Valuable Feedback</Feedback>
    );

    expect(container).toMatchSnapshot();
  });

  test('should render custom button color', () => {
    const { container } = render(
      <Feedback appName="Payer Space" color="success" />
    );

    expect(container).toMatchSnapshot();
  });

  test('should render custom prompt text', () => {
    const { container } = render(
      <Feedback appName="Payer Space" prompt="Provide same feedback" />
    );

    expect(container).toMatchSnapshot();
  });

  test('should render custom form props', () => {
    const { container } = render(
      <Feedback
        appName="Payer Space"
        formProps={{
          aboutOptions: [
            { value: 'payerSpace', label: 'Payer Space' },
            { value: 'wholeSite', label: 'Whole Site' },
          ],
        }}
      />
    );

    expect(container).toMatchSnapshot();
  });

  test('should render custom className', () => {
    const { container } = render(
      <Feedback appName="Payer Space" className="junk and-stuff" />
    );

    expect(container).toMatchSnapshot();
  });
});
