# availity-react

> React components using Availity UIKit and Bootstrap 4

[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&logo=MIT)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://img.shields.io/david/dev/Availity/availity-react.svg?style=for-the-badge)](https://david-dm.org/Availity/availity-react)
[![Coverage](https://img.shields.io/codecov/c/github/Availity/availity-react?style=for-the-badge)](https://codecov.io/gh/Availity/availity-react)

## Supported Browsers

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Internet Explorer 11+ (Internet Explorer will no longer be supported starting August 21st, 2021)

## Storybook

https://availity.github.io/availity-react/storybook

## Availity Docs

https://availity.github.io/availity-react

## Contributing

[Contributing Guide](./.github/CONTRIBUTING.md)

## Additional Notes

We use `data-testid` for unit tests to use for grabbing unique attributes. If you are using `availity-workflow@6.0.0` or later it will be removed for you in production builds. However, if you don't want it and not using workflow, you will need to add the following babel plugin to remove it:

- [babel-plugin-jsx-remove-data-test-id](https://github.com/coderas/babel-plugin-jsx-remove-data-test-id)

## License

[MIT](./LICENSE)
