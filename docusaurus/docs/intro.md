---
title: Introduction
slug: /
---

Availity React is a repo of [React](https://beta.reactjs.org/) components built for web projects on the Availity Portal. This site provides documentation on how to use those components.

Many of the packages provided by `availity-react` are wrappers around common `reactstrap` components. If you can't find what you're looking for in these docs, take a look at the [Reactstrap documentation](https://reactstrap.github.io).

:::note
Try the `search bar` at the top right of every page for faster browsing. The search bar leverages [Algolia](https://www.algolia.com/) to provide lightning fast searches across all our docs.
:::

## Supported Browsers

Packages in this repository work with

- Google Chrome
- Microsoft Edge
- Mozilla Firefox

### Internet Explorer Support

Active support for Internet Explorer ended in August 2021.

If you still need support for IE 11, use [`@availity/workflow >=8.5.0 && <9.0.0`](https://github.com/Availity/availity-workflow/blob/master/packages/workflow/CHANGELOG.md#850-2021-04-07). This transpiles _all_ your code and adds polyfills needed for IE 11 support.

If you do not want to, or can't, use `@availity/workflow`, use your own `babel` configuration to polyfill the necessary code

## Additional Notes

We use `data-testid` for unit tests to use for grabbing unique attributes. If you are using `availity-workflow@6.0.0` or later it will be removed for you in production builds. If you don't want `data-testid`, however, and you're not using `@availity/workflow`, add the following `babel` plugin to remove it:

- [babel-plugin-jsx-remove-data-test-id](https://github.com/coderas/babel-plugin-jsx-remove-data-test-id)
