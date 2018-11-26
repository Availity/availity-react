import React from 'react';
import { mount, shallow } from 'enzyme';
import AvBreadcrumbsSpacesContainer from '.';

describe('AvBreadcrumbsSpacesContainer', () => {
  const SPACE_NAME = 'a';
  const SPACE_PAGE = 'b';
  const SPACE_ID = '1';

  let spy;

  beforeEach(() => {
    global.jsdom.reconfigure({
      url: 'https://dev.local?spaceId=1',
    });

    spy = jest
      .spyOn(AvBreadcrumbsSpacesContainer.prototype, 'getSpaceName')
      .mockImplementation(() => Promise.resolve(SPACE_NAME));
  });

  test('should show space name when loaded', () => {
    const wrapper = shallow(
      <AvBreadcrumbsSpacesContainer pageName={SPACE_PAGE} />
    );
    wrapper.setState({
      spaceName: SPACE_NAME,
      spaceId: SPACE_ID,
    });
    const component = wrapper.find('BreadcrumbsSpaces');
    expect(component.props().spaceId).toBe(SPACE_ID);
    expect(component.props().spaceName).toBe(SPACE_NAME);
  });

  test('should parse spaceId from query param', () => {
    mount(<AvBreadcrumbsSpacesContainer pageName={SPACE_PAGE} />);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(SPACE_ID);

    spy.mockClear();
  });

  afterEach(() => {
    spy.mockClear();
  });
});
