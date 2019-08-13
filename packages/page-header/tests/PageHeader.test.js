import React from 'react';
import { render, cleanup } from '@testing-library/react';
import TrainingLink from '@availity/training-link';
import PageHeader from '..';

afterEach(cleanup);

describe('PageHeader', () => {
  test('should render', () => {
    const { container } = render(<PageHeader appName="Payer Space" />);

    expect(container).toMatchSnapshot();
  });

  test('should render app icon', () => {
    const { container } = render(
      <PageHeader appName="Payer Space" appAbbr="PS" />
    );

    expect(container).toMatchSnapshot();
  });

  test('should render app icon color', () => {
    const { container } = render(
      <PageHeader appName="Payer Space" appAbbr="PS" iconColor="green" />
    );

    expect(container).toMatchSnapshot();
  });

  test('should render app icon color branded', () => {
    const { container } = render(
      <PageHeader
        appName="Payer Space"
        appAbbr="PS"
        iconColor="green"
        branded
      />
    );

    expect(container).toMatchSnapshot();
  });

  test('should render feedback', () => {
    const { getByTestId } = render(
      <PageHeader appName="Payer Space" feedback />
    );

    expect(getByTestId('face-options')).toBeDefined();
  });

  test('should render children', () => {
    const { container } = render(
      <PageHeader appName="Payer Space">
        <p>this is cool</p>
      </PageHeader>
    );

    expect(container).toMatchSnapshot();
  });
  test('should render trainingLink', () => {
    const { getByText } = render(
      <PageHeader
        appName="Payer Space"
        component={
          <TrainingLink
            name="Appeals"
            link="https://www.youtube.com/watch?v=GgwE94KZJ7E"
          />
        }
      >
        <p>this is cool</p>
      </PageHeader>
    );

    getByText('Watch a demo');
  });
});
