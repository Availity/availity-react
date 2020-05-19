---
title: Introduction
summary: React components using Availity UIKit and Bootstrap 4
---

[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&logo=MIT)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://img.shields.io/david/dev/Availity/availity-react.svg?style=for-the-badge)](https://david-dm.org/Availity/availity-react)
[![Build](https://img.shields.io/circleci/build/github/Availity/availity-react?style=for-the-badge)](https://circleci.com/gh/Availity/availity-react)
[![Coverage](https://img.shields.io/codecov/c/github/Availity/availity-react?style=for-the-badge)](https://codecov.io/gh/Availity/availity-react)

## Supported Browsers

- Internet Explorer 11+
- Google Chrome
- Mozilla Firefox

## Additional Notes

We use `data-testid` in unit tests in order to grab unique attributes. If you are using `availity-workflow@6.0.0` or later, it is removed for you in production builds. To remove it if you are not using `availity-workflow`, add the following babel plugin to your project:

- [babel-plugin-jsx-remove-data-test-id](https://github.com/coderas/babel-plugin-jsx-remove-data-test-id)
