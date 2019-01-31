import React from 'react';
import renderer from 'react-test-renderer';
import TrainingLink from '@availity/training-link';
import PageHeader from '..';

describe('PageHeader', () => {
  test('should render', () => {
    const component = renderer.create(<PageHeader appName="Payer Space" />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render app icon', () => {
    const component = renderer.create(
      <PageHeader appName="Payer Space" appAbbr="PS" />
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render app icon color', () => {
    const component = renderer.create(
      <PageHeader appName="Payer Space" appAbbr="PS" iconColor="green" />
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render app icon color branded', () => {
    const component = renderer.create(
      <PageHeader
        appName="Payer Space"
        appAbbr="PS"
        iconColor="green"
        branded
      />
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render feedback', () => {
    const component = renderer.create(
      <PageHeader appName="Payer Space" feedback />
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should render children', () => {
    const component = renderer.create(
      <PageHeader appName="Payer Space">
        <p>this is cool</p>
      </PageHeader>
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
  test('should render trainingLink', () => {
    const component = renderer.create(
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
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
