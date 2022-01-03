# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.4](https://github.com/Availity/availity-react/compare/@availity/mock@2.1.3...@availity/mock@2.1.4) (2021-12-20)

**Note:** Version bump only for package @availity/mock





## 2.1.3 (2021-12-14)

**Note:** Version bump only for package @availity/mock





## 2.1.2 (2021-11-30)


### Bug Fixes

* **mock:** add null checks ([fe32ec4](https://github.com/Availity/availity-react/commit/fe32ec4a9984b5630680982c0c07ff123eadaaf0))





## 2.1.1 (2021-10-28)


### Bug Fixes

* **mock:** add exported type and run formatter ([1e25c88](https://github.com/Availity/availity-react/commit/1e25c88d3f310ad2f2b2781ba5cf25f5703be7d7))





# 2.1.0 (2021-09-01)


### Features

* **mock:** add permissions and GET to mocks ([c153fa8](https://github.com/Availity/availity-react/commit/c153fa8c390b628ee8be4c0e4f83543c14a24424))





# 2.0.0 (2021-07-27)


### Features

* **spaces:** switch to webQL from slotmachine ([8394552](https://github.com/Availity/availity-react/commit/839455227d78d5eef37e47ad4b5885f92fc178b3))


### BREAKING CHANGES

* **spaces:** response format of webQL is different than from
slotmachine

This is unlikely to break anyone using the components in this package in
a typical fashion, but if you:

1. use the `useSpaces` hook to do anything
custom, the shape of a configuration (returned by webQL) differs
slightly from a space (return by slotmachine). you may need to account
for this

2. pass in a custom query or variables to the Spaces provider the query
   format and variables structure in webQL is different than that from slotmachine





## 1.0.22 (2021-06-01)

**Note:** Version bump only for package @availity/mock





## 1.0.21 (2020-11-17)

**Note:** Version bump only for package @availity/mock





## 1.0.20 (2020-04-30)

**Note:** Version bump only for package @availity/mock





## 1.0.19 (2020-04-30)

**Note:** Version bump only for package @availity/mock





## 1.0.18 (2020-04-28)

**Note:** Version bump only for package @availity/mock





## 1.0.17 (2020-04-17)

**Note:** Version bump only for package @availity/mock





## 1.0.16 (2020-04-09)

**Note:** Version bump only for package @availity/mock





## 1.0.15 (2020-04-08)

**Note:** Version bump only for package @availity/mock





## 1.0.14 (2020-04-08)

**Note:** Version bump only for package @availity/mock





## 1.0.13 (2020-04-07)

**Note:** Version bump only for package @availity/mock





## 1.0.12 (2020-04-07)

**Note:** Version bump only for package @availity/mock





## 1.0.11 (2020-04-06)

**Note:** Version bump only for package @availity/mock





## 1.0.10 (2020-04-06)

**Note:** Version bump only for package @availity/mock





## 1.0.9 (2020-04-06)

**Note:** Version bump only for package @availity/mock





## 1.0.8 (2020-04-06)

**Note:** Version bump only for package @availity/mock





## 1.0.7 (2020-04-03)

**Note:** Version bump only for package @availity/mock





## 1.0.6 (2020-04-03)

**Note:** Version bump only for package @availity/mock





## 1.0.5 (2020-04-02)

**Note:** Version bump only for package @availity/mock





## 1.0.4 (2020-04-02)

**Note:** Version bump only for package @availity/mock





## [1.0.3](https://github.com/Availity/availity-react/compare/@availity/mock@1.0.2...@availity/mock@1.0.3) (2020-01-10)

**Note:** Version bump only for package @availity/mock





## [1.0.2](https://github.com/Availity/availity-react/compare/@availity/mock@1.0.1...@availity/mock@1.0.2) (2019-10-18)


### Bug Fixes

* **mock:** fixed incorrect slotmachine url ([9050f3d](https://github.com/Availity/availity-react/commit/9050f3d))





## 1.0.1 (2019-09-25)

**Note:** Version bump only for package @availity/mock
