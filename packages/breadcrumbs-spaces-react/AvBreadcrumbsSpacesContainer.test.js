import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { shallow } from 'enzyme';
import AvBreadcrumbsSpacesContainer from './';

const origLocation = document.location.href;
let location = origLocation;

// https://github.com/facebook/jest/issues/890
beforeAll(() => {
  const parser = document.createElement('a');
  [
    'href',
    'protocol',
    'host',
    'hostname',
    'origin',
    'port',
    'pathname',
    'search',
    'hash',
  ].forEach(prop => {
    Object.defineProperty(window.location, prop, {
      get() {
        parser.href = location;
        return parser[prop];
      },
    });
  });
});

afterEach(() => {
  location = origLocation;
});

describe('AvBreadcrumbsSpacesContainer', () => {
  test('should render with api', () => {
    location = 'https://dev.local?spaceId=1';
    const mock = new MockAdapter(axios);
    mock.onGet('/api/sdk/platform/v1/spaces').reply(200, {
      name: 'Acme Maryland',
    });

    const component = shallow(<AvBreadcrumbsSpacesContainer pageName="b" />);
    expect(component).toMatchSnapshot();
  });
});
