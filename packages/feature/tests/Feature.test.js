import React from 'react';
import { render } from 'react-testing-library';
import Feature from '..';

describe('Feature', () => {
  test('should render', () => {
    const { container } = render(<Feature features="1234" loader />);

    expect(container).toMatchSnapshot();
  });
  test('should render with single permission', () => {
    const { container } = render(
      <Feature
        features="1234"
        whenDisabled="You do not have permission to see this"
      />
    );

    expect(container).toMatchSnapshot();
  });
  test('should render with array of features', () => {
    const { container } = render(
      <Feature
        features={['1234', '2345', ['3456', '4567']]}
        whenDisabled="You do not have permission to see this"
      />
    );

    expect(container).toMatchSnapshot();
  });
  test('should render negate features', () => {
    const { container } = render(
      <Feature
        features="1234"
        negate
        whenDisabled="You do not have permission to see this"
      >
        You can see this
      </Feature>
    );

    expect(container).toMatchSnapshot();
  });
});
