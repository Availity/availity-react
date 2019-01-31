import queryString from 'query-string';

import LinkBuilder from './LinkBuilder';

import constants from './constant';

describe('LinkBuilder', () => {
  let linkBuilder;
  beforeEach(() => {
    linkBuilder = new LinkBuilder();
  });
  test('should be defined', () => {
    expect(linkBuilder).toBeDefined();

    // for docs
    // eslint-disable-next-line no-console
    console.log(
      linkBuilder.getLink({
        href: '/public/apps/myApp',
        target: 'newBody',
        navSearch: { hello: 'world' },
      })
    );
  });

  describe('addQuery', () => {
    const testUrl = 'http://www.test.com';
    const testQueryString = 'hello=world';
    const testQuery = {
      // should match the params on testQueryString
      hello: 'world',
    };

    const testFullUrl = `${testUrl}?${testQueryString}`;

    const newQuery = {
      test: 'string',
    };
    const newQueryString = 'test=string';
    const longerFullUrl = `${testFullUrl}&${newQueryString}`;

    test('query-string works as expected', () => {
      const { url, query } = queryString.parseUrl(testFullUrl);
      expect(url).toBe(testUrl);
      expect(query).toEqual(testQuery);

      expect(queryString.stringify(testQuery)).toBe(testQueryString);
    });

    test('should add search to href', () => {
      expect(linkBuilder.addQuery(testUrl, testQuery)).toBe(testFullUrl);
      expect(linkBuilder.addQuery(testFullUrl, newQuery)).toBe(longerFullUrl);
    });

    test('should return existing url if no new queries given', () => {
      expect(linkBuilder.addQuery(testUrl)).toBe(testUrl);
      expect(linkBuilder.addQuery(testUrl, {})).toBe(testUrl);

      expect(linkBuilder.addQuery(testFullUrl)).toBe(testFullUrl);
      expect(linkBuilder.addQuery(testFullUrl, {})).toBe(testFullUrl);
      expect(linkBuilder.addQuery(testFullUrl, testQuery)).toBe(testFullUrl);
    });

    test('should update values in existing query', () => {
      const testQueryChange = { hello: 'otherWorld' };
      const newFullUrl = `${testUrl}?hello=otherWorld`;

      expect(linkBuilder.addQuery(testFullUrl, testQueryChange)).toBe(
        newFullUrl
      );
    });
  });

  describe('getLink', () => {
    const testLink = {
      href: 'helloWorld',
      target: '_top',
    };

    beforeEach(() => {
      linkBuilder.validateLink = jest.fn(val => val);
      linkBuilder.addQuery = jest.fn(val => val);
      linkBuilder.checkTopNavLink = jest.fn(val => val);
    });

    test('should call validateLink and checkTopNavLink', () => {
      linkBuilder.getLink(testLink);
      expect(linkBuilder.validateLink).toHaveBeenCalledWith(testLink);
      expect(linkBuilder.checkTopNavLink).toHaveBeenCalledWith(testLink);
    });

    test('should return the results of validateLink and checkTopNavLink', () => {
      linkBuilder.validateLink = jest.fn(val => ({ ...val, validated: true }));
      linkBuilder.checkTopNavLink = jest.fn(val => ({
        ...val,
        topNavChecked: true,
      }));

      const inputLink = testLink;
      const validatedLink = linkBuilder.validateLink(inputLink);
      const expectedOutput = linkBuilder.checkTopNavLink(validatedLink);

      expect(linkBuilder.getLink(inputLink)).toEqual(expectedOutput);
    });

    test('should call addQuery and delete search if in linkObj', () => {
      const testSearch = { hello: 'world' };
      const testInput = { ...testLink, search: testSearch };

      const output = linkBuilder.getLink(testInput);
      expect(output).toEqual(testLink);
      expect(linkBuilder.addQuery).toHaveBeenCalledWith(
        testLink.href,
        testSearch
      );
    });
  });

  describe('validateLink', () => {
    test('should return copy of input not reference', () => {
      const testInput = {
        href: 'hello',
        target: 'world',
        random: 'value',
      };
      const output = linkBuilder.validateLink(testInput);
      expect(output).toEqual(testInput);
      expect(output).not.toBe(testInput);
    });

    test('should set target to default if not defined', () => {
      const testInput = { href: 'hello', random: 'value' };
      const expectedOutput = {
        ...testInput,
        target: constants.defaultLink.target,
      };
      expect(linkBuilder.validateLink(testInput)).toEqual(expectedOutput);
    });

    test('should set href to default not defined', () => {
      const testInput = { target: 'hello', random: 'value' };
      const expectedOutput = { ...testInput, href: constants.defaultLink.href };
      expect(linkBuilder.validateLink(testInput)).toEqual(expectedOutput);
    });
  });

  // // checks if the link should be changed into a loadAppUrl
  // shouldConvert({ target } = {}) {
  //   return (
  //     target === this.contentFrame ||
  //     (target === '_self' && window.name === this.contentFrame)
  //   );
  // }

  describe('shouldConvert', () => {
    test('should return true if target is contentFrame', () => {
      const testInput = {
        href: 'hello',
        target: constants.contentFrame,
      };
      expect(linkBuilder.shouldConvert(testInput)).toBeTruthy();
    });

    test('should return true if target is "_self" and current window is contentFrame', () => {
      window.name = constants.contentFrame;
      const testInput = {
        href: 'hello',
        target: '_self',
      };
      expect(window.name).toBe(constants.contentFrame);
      expect(linkBuilder.shouldConvert(testInput)).toBeTruthy();
    });

    test('should return false if not targeting contentFrame or self in frame', () => {
      window.name = `${constants.contentFrame}ButSomethingElse`;
      expect(window.name).not.toBe(constants.contentFrame);
      const targets = ['_top', '_blank', '_self', 'randomFrame'];
      targets.forEach(target => {
        expect(
          linkBuilder.shouldConvert({
            href: 'testUrl',
            target,
          })
        ).toBeFalsy();
      });
    });
  });

  describe('newHref', () => {
    const testHostName = window.top.location.hostname;
    const mockHost = `${testHostName}:8888`;
    const mockRest = '/helloworld#stuff';
    const mockHref = `https://${mockHost}${mockRest}`;

    const testLink = {
      href: 'href',
      target: 'target',
    };
    beforeEach(() => {
      // mock link tag keeping
      linkBuilder.a = {
        get href() {
          return mockHref;
        },
        set href(val) {
          return mockHref;
        },
        hostname: testHostName,
        host: mockHost,
      };

      linkBuilder.shouldConvert = jest.fn(() => true);
    });
    test('should return false if shouldConvert returns false', () => {
      linkBuilder.shouldConvert = jest.fn(() => false);
      expect(linkBuilder.newHref(testLink)).toBeFalsy();
    });
    test('should createElement if this.a not defined yet', () => {
      // const spy = jest.spyOn(document, 'createElement');
      document.createElement = jest.fn(() => ({}));
      linkBuilder.a = false;
      linkBuilder.newHref(testLink);
      expect(document.createElement).toHaveBeenCalledWith('a');
    });

    test("should return false if href doesn't change", () => {
      const falseTestLink = { ...testLink, href: mockHref };
      expect(linkBuilder.newHref(falseTestLink)).toBeFalsy();
    });

    test('should return href as is if a.hostname does not match window.top.location.hostname', () => {
      linkBuilder.a.hostname = `${testHostName}Other`;
      expect(linkBuilder.a.hostname).not.toBe(testHostName);
      expect(linkBuilder.newHref(testLink)).toBe(mockHref);
    });

    test('should return the path after host if hostname matches top window', () => {
      expect(linkBuilder.newHref(testLink)).toBe(mockRest);
    });
  });

  describe('checkTopNavLink', () => {
    let mockHref = 'testHref';
    const fullTopUrl = constants.topNavDefaultUrl + constants.navTo;
    const testInput = {
      href: 'mockHref',
      target: 'target',
    };

    beforeEach(() => {
      mockHref = 'testHref';
      linkBuilder.newHref = jest.fn(() => mockHref);
      linkBuilder.addQuery = jest.fn(val => val);
    });

    test('should return input if newHref returns false', () => {
      mockHref = false;
      expect(linkBuilder.checkTopNavLink(testInput)).toBe(testInput);
      expect(linkBuilder.addQuery).not.toHaveBeenCalled();
    });

    test('should return default topApp url if new href is dashboard url', () => {
      mockHref = constants.bodyDefaultUrl;
      const expectedOutput = {
        href: constants.topNavDefaultUrl,
        target: constants.topNavTarget,
      };

      expect(linkBuilder.checkTopNavLink(testInput)).toEqual(expectedOutput);

      // will only be called if there are params to add
      expect(linkBuilder.addQuery).not.toHaveBeenCalled();
    });

    test('should add href to topUrl with addQuery', () => {
      const expectedOutput = {
        href: fullTopUrl,
        target: constants.topNavTarget,
      };
      const expectedSearch = {
        [constants.navParam]: mockHref,
      };
      expect(linkBuilder.checkTopNavLink(testInput)).toEqual(expectedOutput);
      expect(linkBuilder.addQuery).toHaveBeenCalledWith(
        fullTopUrl,
        expectedSearch
      );
    });

    test('should add and remove navSearch to topUrl', () => {
      const testSearch = {
        hello: 'world',
        test: 'value',
      };
      const input = {
        ...testInput,
        navSearch: testSearch,
      };
      const expectedOutput = {
        href: fullTopUrl,
        target: constants.topNavTarget,
      };
      const expectedSearch = {
        ...testSearch,
        [constants.navParam]: mockHref,
      };

      expect(linkBuilder.checkTopNavLink(input)).toEqual(expectedOutput);
      expect(linkBuilder.addQuery).toHaveBeenCalledWith(
        expectedOutput.href,
        expectedSearch
      );

      // reset calls to addQuery to make sure there isn't overlap
      linkBuilder.addQuery.mockClear();
      expect(linkBuilder.addQuery).not.toHaveBeenCalled();

      mockHref = constants.bodyDefaultUrl;
      expectedOutput.href = constants.topNavDefaultUrl;
      expect(linkBuilder.checkTopNavLink(input)).toEqual(expectedOutput);
      // test with testSearch since default topNav url will not use navParam
      expect(linkBuilder.addQuery).toHaveBeenCalledWith(
        expectedOutput.href,
        testSearch
      );
    });
  });
});
