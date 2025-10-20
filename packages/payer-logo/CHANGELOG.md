# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

## [7.0.8](https://github.com/Availity/availity-react/compare/@availity/payer-logo@7.0.7...@availity/payer-logo@7.0.8) (2025-10-17)



## [7.0.7](https://github.com/Availity/availity-react/compare/@availity/payer-logo@7.0.6...@availity/payer-logo@7.0.7) (2025-04-29)



## [7.0.6](https://github.com/Availity/availity-react/compare/@availity/payer-logo@7.0.5...@availity/payer-logo@7.0.6) (2025-04-11)



## [7.0.5](https://github.com/Availity/availity-react/compare/@availity/payer-logo@7.0.4...@availity/payer-logo@7.0.5) (2025-03-10)



## [7.0.4](https://github.com/Availity/availity-react/compare/@availity/payer-logo@7.0.3...@availity/payer-logo@7.0.4) (2024-10-16)



## [7.0.3](https://github.com/Availity/availity-react/compare/@availity/payer-logo@7.0.2...@availity/payer-logo@7.0.3) (2024-08-22)



# 1.0.0 (2024-08-22)


### Bug Fixes

* eslint issues ([bc4d8e9](https://github.com/Availity/availity-react/commit/bc4d8e9252a37c067de3e5b15e583c4a3c06d6c5))
* **feature:** fixed the repository for npm ([7a13a9e](https://github.com/Availity/availity-react/commit/7a13a9ea4533c1565998ed6c28439d22016c285e))
* fixed package-locks ([ddb49bb](https://github.com/Availity/availity-react/commit/ddb49bbffef1e4fae59f84fb283f5c4a422c8657))
* **payer-logo:** correct path from payerID query ([a6edbaf](https://github.com/Availity/availity-react/commit/a6edbaf6cf7688f5c71d7a81854e7c9591c60e1a))
* **payer-logo:** fix lodash import ([81ccf0c](https://github.com/Availity/availity-react/commit/81ccf0ce04e74151b81faad749566f250e7b2aae))
* **payer-logo:** fix typescript definition for clientId ([ec06bfa](https://github.com/Availity/availity-react/commit/ec06bfa499f0f29937a48e5454b389dcc7be8eec))
* **payer-logo:** make ajax call to get appropriate logo ([37e154c](https://github.com/Availity/availity-react/commit/37e154c192e21d46d2c9166a0c9f6b1971fb3d62))
* **payer-logo:** send clientId in request to slotmachine ([08ac445](https://github.com/Availity/availity-react/commit/08ac445cd6c6237bac2874d6654ae2cbb4619e96))
* **payer-logo:** update types ([368a336](https://github.com/Availity/availity-react/commit/368a336e86c5894c491d8d5223fd5b8ecc31fff3))
* re-created package-locks ([49726de](https://github.com/Availity/availity-react/commit/49726dea08a61201a44c7c63c14715dda195cc25))
* removed npmrc and added config to lerna for now creating locks ([efe82ab](https://github.com/Availity/availity-react/commit/efe82ab5a9a38cc8113d5cc71416f1ef347eb4c4))
* removed package-locks,added npmrc ignore,fixed react as hoisted dep ([4648319](https://github.com/Availity/availity-react/commit/4648319b1298096de2e3e37bf6246e5f169ace0e))
* so many package-lock.json's ([8b5dc24](https://github.com/Availity/availity-react/commit/8b5dc24168f9eecae9f3f52da0b49e6da831a643))


### Code Refactoring

* **payer-logo:** made api resources peer dep ([6e8c7fa](https://github.com/Availity/availity-react/commit/6e8c7fa29dcb71da9837a1bbd0888f9941f087dd))


### Features

* add spaces package ([e2eff44](https://github.com/Availity/availity-react/commit/e2eff4448cfe4d28e91dfaeb87dc1e4ca17df817))
* **feature:** added packages from av-react to public ([2c32cf3](https://github.com/Availity/availity-react/commit/2c32cf353f22847a5a293eecf800315a051646f3))
* **feature:** adding typescript support ([cfe57a2](https://github.com/Availity/availity-react/commit/cfe57a265b97ba9a053fb3bee54d2b054fa86e8f))
* **form:** add currency input ([fa9eea6](https://github.com/Availity/availity-react/commit/fa9eea6a3b3dd2ef741a0658c102e36c6db5288c))
* move storybook, stories, and fix hmr ([2f65f71](https://github.com/Availity/availity-react/commit/2f65f71769d2d981e22700b87a09516833588f64))
* **pagination:** pagination components using hooks ([590e5fd](https://github.com/Availity/availity-react/commit/590e5fd05fcf0656d2309ae091938b334fd422ee)), closes [#27](https://github.com/Availity/availity-react/issues/27) [#64](https://github.com/Availity/availity-react/issues/64)
* **payer-logo:** switch to webQL from slotmachine ([7e5b932](https://github.com/Availity/availity-react/commit/7e5b93232142fcb79eedf57de2cbee68da680e62))
* **payer-logo:** upgrade version of hooks ([65d9d40](https://github.com/Availity/availity-react/commit/65d9d404f4207b68ec5ab05e6b72054682389409))
* upgrade deps ([eccefc0](https://github.com/Availity/availity-react/commit/eccefc0549ebd5057595f6ac696642789375f48a))


### BREAKING CHANGES

* **payer-logo:** @availity/hooks v4 requires react-query
whereas v5 requires @tanstack/react-query
* axios v1 is now required
* **payer-logo:** response format of webQL is different than from
slotmachine

This is unlikely to break anyone using the components in this package in
a typical fashion, but if you:

1. use the `useSpaces` hook to do anything
custom, the shape of a configuration (returned by webQL) differs
slightly from a space (return by slotmachine). you may need to account
for this

2. pass in a custom query or variables to the Spaces provider the query
   format and variables structure in webQL is different than that from slotmachine
* **payer-logo:** api-axios api-core and axios are peer deps now
* **payer-logo:** clientId prop is required. it is needed in order to
call slotmachine



## [7.0.2](https://github.com/Availity/availity-react/compare/@availity/payer-logo@7.0.1...@availity/payer-logo@7.0.2) (2024-04-23)



## [7.0.1](https://github.com/Availity/availity-react/compare/@availity/payer-logo@7.0.0...@availity/payer-logo@7.0.1) (2024-02-21)



# [7.0.0](https://github.com/Availity/availity-react/compare/@availity/payer-logo@6.0.0...@availity/payer-logo@7.0.0) (2023-11-07)


### Features

* **payer-logo:** upgrade version of hooks ([65d9d40](https://github.com/Availity/availity-react/commit/65d9d404f4207b68ec5ab05e6b72054682389409))


### BREAKING CHANGES

* **payer-logo:** @availity/hooks v4 requires react-query
whereas v5 requires @tanstack/react-query



# [6.0.0](https://github.com/Availity/availity-react/compare/@availity/payer-logo@5.2.2...@availity/payer-logo@6.0.0) (2023-10-09)


### Features

* upgrade deps ([eccefc0](https://github.com/Availity/availity-react/commit/eccefc0549ebd5057595f6ac696642789375f48a))


### BREAKING CHANGES

* axios v1 is now required



## [5.2.2](https://github.com/Availity/availity-react/compare/@availity/payer-logo@5.2.1...@availity/payer-logo@5.2.2) (2023-01-25)



## [5.2.1](https://github.com/Availity/availity-react/compare/@availity/payer-logo@5.2.0...@availity/payer-logo@5.2.1) (2022-06-14)



# [5.2.0](https://github.com/Availity/availity-react/compare/@availity/payer-logo@5.1.5...@availity/payer-logo@5.2.0) (2022-06-14)


### Features

* **form:** add currency input ([fa9eea6](https://github.com/Availity/availity-react/commit/fa9eea6a3b3dd2ef741a0658c102e36c6db5288c))



## [5.1.5](https://github.com/Availity/availity-react/compare/@availity/payer-logo@5.1.4...@availity/payer-logo@5.1.5) (2022-06-10)



## [5.1.4](https://github.com/Availity/availity-react/compare/@availity/payer-logo@5.1.3...@availity/payer-logo@5.1.4) (2022-05-24)



## 5.1.3 (2022-02-18)

**Note:** Version bump only for package @availity/payer-logo





## [5.1.2](https://github.com/Availity/availity-react/compare/@availity/payer-logo@5.1.1...@availity/payer-logo@5.1.2) (2021-12-20)

**Note:** Version bump only for package @availity/payer-logo





## 5.1.1 (2021-12-14)

**Note:** Version bump only for package @availity/payer-logo





# 5.1.0 (2021-11-15)


### Features

* move storybook, stories, and fix hmr ([2f65f71](https://github.com/Availity/availity-react/commit/2f65f71769d2d981e22700b87a09516833588f64))





## [5.0.5](https://github.com/Availity/availity-react/compare/@availity/payer-logo@5.0.4...@availity/payer-logo@5.0.5) (2021-10-28)

**Note:** Version bump only for package @availity/payer-logo





## 5.0.4 (2021-10-28)

**Note:** Version bump only for package @availity/payer-logo





## 5.0.3 (2021-10-19)


### Bug Fixes

* **payer-logo:** update types ([368a336](https://github.com/Availity/availity-react/commit/368a336e86c5894c491d8d5223fd5b8ecc31fff3))





## [5.0.2](https://github.com/Availity/availity-react/compare/@availity/payer-logo@5.0.1...@availity/payer-logo@5.0.2) (2021-10-01)

**Note:** Version bump only for package @availity/payer-logo





## 5.0.1 (2021-09-28)

**Note:** Version bump only for package @availity/payer-logo





# 5.0.0 (2021-07-27)


### Bug Fixes

* **payer-logo:** fix lodash import ([81ccf0c](https://github.com/Availity/availity-react/commit/81ccf0ce04e74151b81faad749566f250e7b2aae))


### Features

* **payer-logo:** switch to webQL from slotmachine ([7e5b932](https://github.com/Availity/availity-react/commit/7e5b93232142fcb79eedf57de2cbee68da680e62))


### BREAKING CHANGES

* **payer-logo:** response format of webQL is different than from
slotmachine

This is unlikely to break anyone using the components in this package in
a typical fashion, but if you:

1. use the `useSpaces` hook to do anything
custom, the shape of a configuration (returned by webQL) differs
slightly from a space (return by slotmachine). you may need to account
for this

2. pass in a custom query or variables to the Spaces provider the query
   format and variables structure in webQL is different than that from slotmachine





## 4.0.31 (2021-06-01)

**Note:** Version bump only for package @availity/payer-logo





## 4.0.30 (2021-01-06)

**Note:** Version bump only for package @availity/payer-logo





## 4.0.29 (2020-12-23)

**Note:** Version bump only for package @availity/payer-logo





## 4.0.28 (2020-11-17)

**Note:** Version bump only for package @availity/payer-logo





## 4.0.27 (2020-10-30)

**Note:** Version bump only for package @availity/payer-logo





## 4.0.26 (2020-07-08)

**Note:** Version bump only for package @availity/payer-logo





## 4.0.25 (2020-06-12)

**Note:** Version bump only for package @availity/payer-logo





## 4.0.24 (2020-04-30)

**Note:** Version bump only for package @availity/payer-logo





## 4.0.23 (2020-04-30)

**Note:** Version bump only for package @availity/payer-logo





## 4.0.22 (2020-04-28)

**Note:** Version bump only for package @availity/payer-logo





## 4.0.21 (2020-04-17)

**Note:** Version bump only for package @availity/payer-logo





## 4.0.20 (2020-04-09)

**Note:** Version bump only for package @availity/payer-logo





## 4.0.19 (2020-04-08)

**Note:** Version bump only for package @availity/payer-logo





## 4.0.18 (2020-04-08)

**Note:** Version bump only for package @availity/payer-logo





## 4.0.17 (2020-04-07)

**Note:** Version bump only for package @availity/payer-logo





## 4.0.16 (2020-04-07)

**Note:** Version bump only for package @availity/payer-logo





## 4.0.15 (2020-04-06)

**Note:** Version bump only for package @availity/payer-logo





## 4.0.14 (2020-04-06)

**Note:** Version bump only for package @availity/payer-logo





## 4.0.13 (2020-04-06)

**Note:** Version bump only for package @availity/payer-logo





## 4.0.12 (2020-04-06)

**Note:** Version bump only for package @availity/payer-logo





## 4.0.11 (2020-04-03)

**Note:** Version bump only for package @availity/payer-logo





## 4.0.10 (2020-04-03)

**Note:** Version bump only for package @availity/payer-logo





## 4.0.9 (2020-04-02)

**Note:** Version bump only for package @availity/payer-logo





## 4.0.8 (2020-04-02)

**Note:** Version bump only for package @availity/payer-logo





## [4.0.7](https://github.com/Availity/availity-react/compare/@availity/payer-logo@4.0.6...@availity/payer-logo@4.0.7) (2020-02-11)

**Note:** Version bump only for package @availity/payer-logo





## [4.0.6](https://github.com/Availity/availity-react/compare/@availity/payer-logo@4.0.5...@availity/payer-logo@4.0.6) (2020-02-10)

**Note:** Version bump only for package @availity/payer-logo





## [4.0.5](https://github.com/Availity/availity-react/compare/@availity/payer-logo@4.0.4...@availity/payer-logo@4.0.5) (2019-10-24)

**Note:** Version bump only for package @availity/payer-logo





## [4.0.4](https://github.com/Availity/availity-react/compare/@availity/payer-logo@4.0.3...@availity/payer-logo@4.0.4) (2019-10-11)


### Bug Fixes

* eslint issues ([bc4d8e9](https://github.com/Availity/availity-react/commit/bc4d8e9))





## [4.0.3](https://github.com/Availity/availity-react/compare/@availity/payer-logo@4.0.2...@availity/payer-logo@4.0.3) (2019-09-26)

**Note:** Version bump only for package @availity/payer-logo





## [4.0.2](https://github.com/Availity/availity-react/compare/@availity/payer-logo@4.0.1...@availity/payer-logo@4.0.2) (2019-09-25)

**Note:** Version bump only for package @availity/payer-logo





## [4.0.1](https://github.com/Availity/availity-react/compare/@availity/payer-logo@4.0.0...@availity/payer-logo@4.0.1) (2019-09-04)

**Note:** Version bump only for package @availity/payer-logo





# [4.0.0](https://github.com/Availity/availity-react/compare/@availity/payer-logo@3.1.5...@availity/payer-logo@4.0.0) (2019-08-19)


### Code Refactoring

* **payer-logo:** made api resources peer dep ([6e8c7fa](https://github.com/Availity/availity-react/commit/6e8c7fa))


### BREAKING CHANGES

* **payer-logo:** api-axios api-core and axios are peer deps now





## [3.1.5](https://github.com/Availity/availity-react/compare/@availity/payer-logo@3.1.4...@availity/payer-logo@3.1.5) (2019-08-13)

**Note:** Version bump only for package @availity/payer-logo





## [3.1.4](https://github.com/Availity/availity-react/compare/@availity/payer-logo@3.1.3...@availity/payer-logo@3.1.4) (2019-08-11)

**Note:** Version bump only for package @availity/payer-logo





## [3.1.3](https://github.com/Availity/availity-react/compare/@availity/payer-logo@3.1.2...@availity/payer-logo@3.1.3) (2019-07-23)

**Note:** Version bump only for package @availity/payer-logo





## [3.1.2](https://github.com/Availity/availity-react/compare/@availity/payer-logo@3.1.1...@availity/payer-logo@3.1.2) (2019-06-24)

**Note:** Version bump only for package @availity/payer-logo





## [3.1.1](https://github.com/Availity/availity-react/compare/@availity/payer-logo@3.1.0...@availity/payer-logo@3.1.1) (2019-06-03)

**Note:** Version bump only for package @availity/payer-logo





# [3.1.0](https://github.com/Availity/availity-react/compare/@availity/payer-logo@3.0.0...@availity/payer-logo@3.1.0) (2019-05-29)


### Features

* add spaces package ([e2eff44](https://github.com/Availity/availity-react/commit/e2eff44))





# [3.0.0](https://github.com/Availity/availity-react/compare/@availity/payer-logo@1.1.3...@availity/payer-logo@3.0.0) (2019-03-04)


### Bug Fixes

* **payer-logo:** fix typescript definition for clientId ([ec06bfa](https://github.com/Availity/availity-react/commit/ec06bfa))
* **payer-logo:** send clientId in request to slotmachine ([08ac445](https://github.com/Availity/availity-react/commit/08ac445))


### Features

* **pagination:** pagination components using hooks ([590e5fd](https://github.com/Availity/availity-react/commit/590e5fd)), closes [#27](https://github.com/Availity/availity-react/issues/27) [#64](https://github.com/Availity/availity-react/issues/64)


### BREAKING CHANGES

* **payer-logo:** clientId prop is required. it is needed in order to
call slotmachine





# [2.0.0](https://github.com/Availity/availity-react/compare/@availity/payer-logo@1.1.3...@availity/payer-logo@2.0.0) (2019-03-04)


### Bug Fixes

* **payer-logo:** fix typescript definition for clientId ([ec06bfa](https://github.com/Availity/availity-react/commit/ec06bfa))
* **payer-logo:** send clientId in request to slotmachine ([08ac445](https://github.com/Availity/availity-react/commit/08ac445))


### Features

* **pagination:** pagination components using hooks ([590e5fd](https://github.com/Availity/availity-react/commit/590e5fd)), closes [#27](https://github.com/Availity/availity-react/issues/27) [#64](https://github.com/Availity/availity-react/issues/64)


### BREAKING CHANGES

* **payer-logo:** clientId prop is required. it is needed in order to
call slotmachine





## [1.1.3](https://github.com/Availity/availity-react/compare/@availity/payer-logo@1.1.2...@availity/payer-logo@1.1.3) (2019-02-26)


### Bug Fixes

* **payer-logo:** correct path from payerID query ([a6edbaf](https://github.com/Availity/availity-react/commit/a6edbaf))





## [1.1.2](https://github.com/Availity/availity-react/compare/@availity/payer-logo@1.1.1...@availity/payer-logo@1.1.2) (2019-02-25)


### Bug Fixes

* **payer-logo:** make ajax call to get appropriate logo ([37e154c](https://github.com/Availity/availity-react/commit/37e154c))
* removed npmrc and added config to lerna for now creating locks ([efe82ab](https://github.com/Availity/availity-react/commit/efe82ab))
* removed package-locks,added npmrc ignore,fixed react as hoisted dep ([4648319](https://github.com/Availity/availity-react/commit/4648319))





## [1.1.1](https://github.com/Availity/availity-react/compare/@availity/payer-logo@1.1.0...@availity/payer-logo@1.1.1) (2019-02-13)


### Bug Fixes

* fixed package-locks ([ddb49bb](https://github.com/Availity/availity-react/commit/ddb49bb))
* so many package-lock.json's ([8b5dc24](https://github.com/Availity/availity-react/commit/8b5dc24))





# 1.1.0 (2019-02-08)


### Bug Fixes

* **feature:** fixed the repository for npm ([7a13a9e](https://github.com/Availity/availity-react/commit/7a13a9e))
* re-created package-locks ([49726de](https://github.com/Availity/availity-react/commit/49726de))


### Features

* **feature:** added packages from av-react to public ([2c32cf3](https://github.com/Availity/availity-react/commit/2c32cf3))
* **feature:** adding typescript support ([cfe57a2](https://github.com/Availity/availity-react/commit/cfe57a2))
