import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Authorize from '..';

afterEach(cleanup);

describe('Authorize', () => {
  test('should render', () => {
    const { container } = render(<Authorize permissions="1234" loader />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render with single permission', () => {
    const { container } = render(
      <Authorize
        permissions="1234"
        unauthorized="You do not have permission to see this"
      />
    );

    expect(container).toMatchSnapshot();
  });

  test('should render with array of permissions', () => {
    const { container } = render(
      <Authorize
        permissions={['1234', 2345, [3456, '4567']]}
        unauthorized="You do not have permission to see this"
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render negate permissions', () => {
    const { container } = render(
      <Authorize
        permissions="1234"
        negate
        unauthorized="You do not have permission to see this"
      >
        You can see this
      </Authorize>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
