import queryString from 'query-string';

import constants from './constant';

// link object has href, target and
// lets make some search params and such easier:
// search object, search params to add to the href for you
// navSearch object, search params to add to top app if changing to loadApp url
class LinkBuilder {
  constructor() {
    Object.assign(this, constants);
  }

  addQuery(href, search) {
    const { url, query } = queryString.parseUrl(href);
    Object.assign(query, search);
    const searchString = queryString.stringify(query, {
      strict: true,
    });

    if (!searchString) {
      return url;
    }

    return `${url}?${searchString}`;
  }

  getLink(linkObj = {}) {
    const output = this.validateLink(linkObj);
    if (output.search) {
      output.href = this.addQuery(output.href, output.search);
      delete output.search;
    }
    return this.checkTopNavLink(output);
  }

  // set default values if needed
  validateLink(linkObj = {}) {
    return {
      ...this.defaultLink,
      ...linkObj,
    };
  }

  // checks if the link should be changed into a loadAppUrl
  shouldConvert({ target } = {}) {
    return (
      target === this.contentFrame ||
      (target === '_self' && window.name === this.contentFrame)
    );
  }

  // converts href into syntax to work in loadApp
  // ex. #someId => currentUrl#someId
  newHref(linkObj) {
    if (!this.shouldConvert(linkObj)) {
      return false;
    }
    const { href } = linkObj;

    if (!this.a) this.a = document.createElement('a');
    this.a.href = href;

    // if not changes were made, ex a protocol tag like :mailto
    if (this.a.href === href) {
      return false;
    }

    if (this.a.hostname !== window.top.location.hostname) {
      return this.a.href;
    }

    return this.a.href.split(this.a.host)[1];
  }

  // convert to loadApp as needed
  checkTopNavLink(linkObj = {}) {
    const newHref = this.newHref(linkObj);
    if (!newHref) {
      return linkObj;
    }
    // set output href to the standard topNavUrl
    const output = Object.assign({}, linkObj, {
      href: this.topNavDefaultUrl,
      target: this.topNavTarget,
    });

    const search = {};
    if (output.navSearch) {
      Object.assign(search, output.navSearch);
      delete output.navSearch;
    }
    // if not default url, add param and navTo
    if (newHref !== this.bodyDefaultUrl) {
      // add loadApp url
      output.href += this.navTo;
      search[this.navParam] = newHref;
    }

    if (Object.keys(search).length > 0) {
      output.href = this.addQuery(output.href, search);
    }
    return output;
  }
}

export default LinkBuilder;
