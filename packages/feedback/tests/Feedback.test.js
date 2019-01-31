import React from 'react';
import renderer from 'react-test-renderer';
import Feedback from '..';

describe('Feedback', () => {
  test('should render', () => {
    const component = renderer.create(<Feedback appName="Payer Space" />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render custom button text', () => {
    const component = renderer.create(
      <Feedback appName="Payer Space">Provide Valuable Feedback</Feedback>
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render custom button color', () => {
    const component = renderer.create(
      <Feedback appName="Payer Space" color="success" />
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render custom prompt text', () => {
    const component = renderer.create(
      <Feedback appName="Payer Space" prompt="Provide same feedback" />
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render custom form props', () => {
    const component = renderer.create(
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
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render custom className', () => {
    const component = renderer.create(
      <Feedback appName="Payer Space" className="junk and-stuff" />
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
