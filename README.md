# Availity React Component Library

> React components using Availity UIKit and Bootstrap 4

[![Build](https://img.shields.io/github/workflow/status/availity/sdk-js/Publish%20Release?style=for-the-badge)](https://github.com/Availity/sdk-js/actions/workflows/deploy.yml)
[![Coverage](https://img.shields.io/codecov/c/github/Availity/availity-react?style=for-the-badge)](https://codecov.io/gh/Availity/availity-react)
[![Activity](https://img.shields.io/github/commit-activity/m/availity/availity-react?style=for-the-badge)](https://availity.github.io/availity-react/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&logo=MIT)](http://opensource.org/licenses/MIT)

## Storybook

We have a [Storybook](https://availity.github.io/availity-react/storybook) setup where you can see the components in action.

## Documentation

Check out our [documentation site](https://availity.github.io/availity-react)!

## Contributing

See our [contributing guide](./.github/CONTRIBUTING.md) on how to become a contributor for the repo

## Supported Browsers

Packages in this repository are designed to work with the following browsers

- Google Chrome
- Microsoft Edge
- Mozilla Firefox

### Internet Explorer Support

Active support for Internet Explorer was dropped in August 2021.

If you still need support for IE 11, you can use [`@availity/workflow >=8.5.0 && <9.0.0`](https://github.com/Availity/availity-workflow/blob/master/packages/workflow/CHANGELOG.md#850-2021-04-07). This will transpile _all_ your code and add polyfills needed for IE 11 support.

If you do not want to, or can't, use `@availity/workflow`, then you can use your own `babel` configuration to polyfill the necessary code

## Additional Notes

We use `data-testid` for unit tests to use for grabbing unique attributes. If you are using `availity-workflow@6.0.0` or later it will be removed for you in production builds. However, if you don't want it and not using workflow, you will need to add the following babel plugin to remove it:

- [babel-plugin-jsx-remove-data-test-id](https://github.com/coderas/babel-plugin-jsx-remove-data-test-id)

## License

[MIT](./LICENSE)
