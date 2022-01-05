---
title: Introduction
slug: /
---

Availity React is a repo of [React](https://beta.reactjs.org/) components built for web projects on the Availity Portal. This site contains documentation on how to use those components.

Many of the packages provided by `availity-react` are wrappers around common `reactstrap` components. If you can't find what you're looking for in these docs, we recommend looking at the [Reactstrap documentation](https://reactstrap.github.io).

:::note
If you can't find what you are looking for on any of the left sub menus try out the `search bar` at the top of every page that leverages [Algolia](https://www.algolia.com/) to provide lightning fast searches across all of our docs.
:::

## Supported Browsers

Packages in this repository are designed to work with the following browsers

- Google Chrome
- Microsoft Edge
- Mozilla Firefox

### Internet Explorer Support

Active support for Internet Explorer was dropped in August 2021.

If you still need support for IE 11, you can use [`@availity/workflow >=8.5.0 && <9.0.0`](https://github.com/Availity/availity-workflow/blob/master/packages/workflow/CHANGELOG.md#850-2021-04-07). This will transpile _all_ your code and add polyfills needed for IE 11 support.

If you do not want to, or can't, use `@availity/workflow`, then you can use your own `babel` configuration to polyfill the necessary code
