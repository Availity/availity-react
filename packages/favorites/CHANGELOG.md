# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

## [5.1.5](https://github.com/Availity/availity-react/compare/@availity/favorites@5.1.4...@availity/favorites@5.1.5) (2025-07-23)


### Bug Fixes

* moved bootstrap components to separate folder as well as added waring about replacement, UXDS-919 ([5c23ad2](https://github.com/Availity/availity-react/commit/5c23ad29ba12adcd7b7e579d21a92d99d69ce33e))



## [5.1.4](https://github.com/Availity/availity-react/compare/@availity/favorites@5.1.3...@availity/favorites@5.1.4) (2025-04-29)

### Dependency Updates

* `@availity/hooks` updated to version `5.1.3`


## [5.1.3](https://github.com/Availity/availity-react/compare/@availity/favorites@5.1.2...@availity/favorites@5.1.3) (2025-04-11)

### Dependency Updates

* `@availity/hooks` updated to version `5.1.2`


## [5.1.2](https://github.com/Availity/availity-react/compare/@availity/favorites@5.1.1...@availity/favorites@5.1.2) (2025-03-10)



## [5.1.1](https://github.com/Availity/availity-react/compare/@availity/favorites@5.1.0...@availity/favorites@5.1.1) (2025-03-10)

### Dependency Updates

* `@availity/hooks` updated to version `5.1.0`


# [5.1.0](https://github.com/Availity/availity-react/compare/@availity/favorites@5.0.10...@availity/favorites@5.1.0) (2025-02-25)


### Features

* **favorites:** add applicationId, maxFavorites prop ([d97fcad](https://github.com/Availity/availity-react/commit/d97fcadc22a02a802f65781abdd171f7d8b84276))



## [5.0.10](https://github.com/Availity/availity-react/compare/@availity/favorites@5.0.9...@availity/favorites@5.0.10) (2024-10-16)

### Dependency Updates

* `@availity/hooks` updated to version `5.0.9`


## [5.0.9](https://github.com/Availity/availity-react/compare/@availity/favorites@5.0.8...@availity/favorites@5.0.9) (2024-10-02)

### Dependency Updates

* `@availity/hooks` updated to version `5.0.8`


## [5.0.8](https://github.com/Availity/availity-react/compare/@availity/favorites@5.0.7...@availity/favorites@5.0.8) (2024-10-01)

### Dependency Updates

* `@availity/hooks` updated to version `5.0.7`


## [5.0.7](https://github.com/Availity/availity-react/compare/@availity/favorites@5.0.6...@availity/favorites@5.0.7) (2024-08-22)

### Dependency Updates

* `@availity/hooks` updated to version `5.0.6`


# 1.0.0 (2024-08-22)

### Dependency Updates

* `@availity/hooks` updated to version `1.0.0`

### Bug Fixes

* eslint issues ([bc4d8e9](https://github.com/Availity/availity-react/commit/bc4d8e9252a37c067de3e5b15e583c4a3c06d6c5))
* **favorites:** add message-core subscription for `av:favorites:update` ([55db901](https://github.com/Availity/availity-react/commit/55db90132a2713bea0815d739b645ba52d8d9ed9))
* **favorites:** disable lint rule ([e328b64](https://github.com/Availity/availity-react/commit/e328b648283edfd495eadb55661b6f3988e1fe3a))
* **favorites:** fix favorites sent in avMessage when favorites deleted ([4feacef](https://github.com/Availity/availity-react/commit/4feacef50ac72fe57acb822a947c8a4f7bed12f0))
* **favorites:** fix favorites structure in sendUpdate postMessage ([3094d47](https://github.com/Availity/availity-react/commit/3094d4735394c623a75adddf51c03eec9847fbb6))
* **favorites:** fix flaky test ([63a3756](https://github.com/Availity/availity-react/commit/63a3756e559f17943ecefce3e127fb9dd0451160))
* **favorites:** fix logic determining max favorite ([4ce16cd](https://github.com/Availity/availity-react/commit/4ce16cd8d114e78a5a0a18b1ee7a71af6c8c9505))
* **favorites:** fix tests for recieving postMessages from elsewhere ([bf58f1a](https://github.com/Availity/availity-react/commit/bf58f1aeec3c5e70a2e8a25eec036edb52f36a98))
* **favorites:** fixed focus event ([7c67fe5](https://github.com/Availity/availity-react/commit/7c67fe59ddb1a107c8714cc7c71a742cdb7f7c09))
* **favorites:** remove console.log from test ([32d6904](https://github.com/Availity/availity-react/commit/32d6904d6bb957fdc2a9c3d7518c40a46dfab830))
* **favorites:** restore default export ([4b334ae](https://github.com/Availity/availity-react/commit/4b334ae9b987bbce6c9a6c73b7a5281fdb4e11af))
* **favorites:** send post message to window.parent when favorite added ([b7448e4](https://github.com/Availity/availity-react/commit/b7448e4456856b264fab3f6b3e4c95a8d8f69d7d))
* **favorites:** set favorites to an empty array rather than undefined ([2ee2249](https://github.com/Availity/availity-react/commit/2ee2249b3d91f4df3eb245358bd46d692c298d76))
* **favorites:** subscribe to favorites update ([2cf65b9](https://github.com/Availity/availity-react/commit/2cf65b9d7c5775607363736a5bbb6dedfdbbc584))
* update message-core ([9a53067](https://github.com/Availity/availity-react/commit/9a530678e73c22616598ab07fedd360f991773eb))
* update test ([4200f28](https://github.com/Availity/availity-react/commit/4200f28e11bfbfcc37121b4f1776669ec907110e))


### Code Refactoring

* **favorites:** made api resources peer dep ([0ddf6ec](https://github.com/Availity/availity-react/commit/0ddf6ec819318b15d82378c7beed62db7db617a7))


* refactor(favorites)!: remove bootstrap, add react-query, rewrite to TypeScript ([eebe86b](https://github.com/Availity/availity-react/commit/eebe86b450024b57f73bac8f45219b9803fe8651))


### Features

* **docs:** updated to use yarn and added readmes ([3b94748](https://github.com/Availity/availity-react/commit/3b947487ef18c6e11486ad39203882a11bc8a1e7))
* **favorites:** accessibility label tests ([9d66b7e](https://github.com/Availity/availity-react/commit/9d66b7eb73cae08550d4ae0787e3b10dbe112a1a))
* **favorites:** accessibility updates ([37135f4](https://github.com/Availity/availity-react/commit/37135f48e7d9d57f06a339bb921525b67fa53937))
* **favorites:** add `disabled` prop to heart ([fb42164](https://github.com/Availity/availity-react/commit/fb42164ac413676e8c3e35484566fca0cb46a70d))
* **favorites:** add `onFavoritesChange` prop to provider ([b7984e0](https://github.com/Availity/availity-react/commit/b7984e05cac41da672410707c6ef4050aecb2e59))
* **favorites:** add `size` prop to heart ([5057bcf](https://github.com/Availity/availity-react/commit/5057bcfcc9af7df0e0e79370bc6e8a8e8a04da93))
* **favorites:** add test for `disabled` prop ([93031cb](https://github.com/Availity/availity-react/commit/93031cb07c0634023af1eb984dd3ccc917aa866d))
* **favorites:** added export for context ([1e7df28](https://github.com/Availity/availity-react/commit/1e7df28bf3d805462070dfcef91ec8112288ed0d))
* **favorites:** added remove content for tooltip and refactored tests to fix order bug and improve tests ([e58b5a0](https://github.com/Availity/availity-react/commit/e58b5a0026b406656f1e036534ae9a155a5665f8))
* **favorites:** improved accessibility for loading state ([9038803](https://github.com/Availity/availity-react/commit/90388033f095f312d0ea8e2ca124bb875cb54c6c))
* **favorites:** initial refactor removing bootstrap PF-2802 ([f05a093](https://github.com/Availity/availity-react/commit/f05a0939c596ceb82d2c6849b87e9aea92306d21))
* **favorites:** remove logging ([3c8de83](https://github.com/Availity/availity-react/commit/3c8de8315eb0906ba7076397e89a92a35dd1fbda))
* **favorites:** upgrade react query to v4 ([69a9230](https://github.com/Availity/availity-react/commit/69a9230de6deb8ce3fb59dd6d38bfcd83bfd5e82))
* **form:** add currency input ([fa9eea6](https://github.com/Availity/availity-react/commit/fa9eea6a3b3dd2ef741a0658c102e36c6db5288c))
* move storybook, stories, and fix hmr ([2f65f71](https://github.com/Availity/availity-react/commit/2f65f71769d2d981e22700b87a09516833588f64))
* upgrade deps ([eccefc0](https://github.com/Availity/availity-react/commit/eccefc0549ebd5057595f6ac696642789375f48a))


### BREAKING CHANGES

* **favorites:** react query has been upgraded to v4. you must upgrade
to @tanstack/react-query@^4.36.1 in order to use this package now
* axios v1 is now required
* Adds react-query v3 as a peer dependency
* Requires all components to be used inside react-query's QueryClientProvider
* No longer requires availity-uikit or any other Bootstrap dependent
* **favorites:** api-axios api-core and axios are peer deps now



## [5.0.6](https://github.com/Availity/availity-react/compare/@availity/favorites@5.0.5...@availity/favorites@5.0.6) (2024-08-14)


### Bug Fixes

* update message-core ([9a53067](https://github.com/Availity/availity-react/commit/9a530678e73c22616598ab07fedd360f991773eb))



## [5.0.5](https://github.com/Availity/availity-react/compare/@availity/favorites@5.0.4...@availity/favorites@5.0.5) (2024-05-31)



## [5.0.4](https://github.com/Availity/availity-react/compare/@availity/favorites@5.0.3...@availity/favorites@5.0.4) (2024-04-23)



## [5.0.3](https://github.com/Availity/availity-react/compare/@availity/favorites@5.0.2...@availity/favorites@5.0.3) (2024-03-18)



## [5.0.2](https://github.com/Availity/availity-react/compare/@availity/favorites@5.0.1...@availity/favorites@5.0.2) (2024-02-21)



## [5.0.1](https://github.com/Availity/availity-react/compare/@availity/favorites@5.0.0...@availity/favorites@5.0.1) (2023-10-17)



# [5.0.0](https://github.com/Availity/availity-react/compare/@availity/favorites@4.0.0...@availity/favorites@5.0.0) (2023-10-16)


### Bug Fixes

* **favorites:** fix flaky test ([63a3756](https://github.com/Availity/availity-react/commit/63a3756e559f17943ecefce3e127fb9dd0451160))


### Features

* **favorites:** upgrade react query to v4 ([69a9230](https://github.com/Availity/availity-react/commit/69a9230de6deb8ce3fb59dd6d38bfcd83bfd5e82))


### BREAKING CHANGES

* **favorites:** react query has been upgraded to v4. you must upgrade
to @tanstack/react-query@^4.36.1 in order to use this package now



# [4.0.0](https://github.com/Availity/availity-react/compare/@availity/favorites@3.4.3...@availity/favorites@4.0.0) (2023-10-09)


### Bug Fixes

* update test ([4200f28](https://github.com/Availity/availity-react/commit/4200f28e11bfbfcc37121b4f1776669ec907110e))


### Features

* upgrade deps ([eccefc0](https://github.com/Availity/availity-react/commit/eccefc0549ebd5057595f6ac696642789375f48a))


### BREAKING CHANGES

* axios v1 is now required



## [3.4.3](https://github.com/Availity/availity-react/compare/@availity/favorites@3.4.2...@availity/favorites@3.4.3) (2022-11-28)



## [3.4.2](https://github.com/Availity/availity-react/compare/@availity/favorites@3.4.1...@availity/favorites@3.4.2) (2022-06-27)


### Bug Fixes

* **favorites:** add message-core subscription for `av:favorites:update` ([55db901](https://github.com/Availity/availity-react/commit/55db90132a2713bea0815d739b645ba52d8d9ed9))
* **favorites:** fix tests for recieving postMessages from elsewhere ([bf58f1a](https://github.com/Availity/availity-react/commit/bf58f1aeec3c5e70a2e8a25eec036edb52f36a98))
* **favorites:** remove console.log from test ([32d6904](https://github.com/Availity/availity-react/commit/32d6904d6bb957fdc2a9c3d7518c40a46dfab830))



## [3.4.1](https://github.com/Availity/availity-react/compare/@availity/favorites@3.4.0...@availity/favorites@3.4.1) (2022-06-14)



# [3.4.0](https://github.com/Availity/availity-react/compare/@availity/favorites@3.3.2...@availity/favorites@3.4.0) (2022-06-14)


### Features

* **form:** add currency input ([fa9eea6](https://github.com/Availity/availity-react/commit/fa9eea6a3b3dd2ef741a0658c102e36c6db5288c))



## [3.3.2](https://github.com/Availity/availity-react/compare/@availity/favorites@3.3.1...@availity/favorites@3.3.2) (2022-06-10)



## [3.3.1](https://github.com/Availity/availity-react/compare/@availity/favorites@3.3.0...@availity/favorites@3.3.1) (2022-05-24)



# 3.3.0 (2022-05-09)


### Features

* **favorites:** added remove content for tooltip and refactored tests to fix order bug and improve tests ([e58b5a0](https://github.com/Availity/availity-react/commit/e58b5a0026b406656f1e036534ae9a155a5665f8))





# 3.2.0 (2022-05-03)


### Features

* **favorites:** add `disabled` prop to heart ([fb42164](https://github.com/Availity/availity-react/commit/fb42164ac413676e8c3e35484566fca0cb46a70d))
* **favorites:** add test for `disabled` prop ([93031cb](https://github.com/Availity/availity-react/commit/93031cb07c0634023af1eb984dd3ccc917aa866d))





# 3.1.0 (2022-03-08)


### Features

* **favorites:** add `onFavoritesChange` prop to provider ([b7984e0](https://github.com/Availity/availity-react/commit/b7984e05cac41da672410707c6ef4050aecb2e59))
* **favorites:** add `size` prop to heart ([5057bcf](https://github.com/Availity/availity-react/commit/5057bcfcc9af7df0e0e79370bc6e8a8e8a04da93))





# 3.0.0 (2022-03-03)


### Bug Fixes

* **favorites:** restore default export ([4b334ae](https://github.com/Availity/availity-react/commit/4b334ae9b987bbce6c9a6c73b7a5281fdb4e11af))


### Features

* **favorites:** improved accessibility for loading state ([9038803](https://github.com/Availity/availity-react/commit/90388033f095f312d0ea8e2ca124bb875cb54c6c))
* **favorites:** initial refactor removing bootstrap PF-2802 ([f05a093](https://github.com/Availity/availity-react/commit/f05a0939c596ceb82d2c6849b87e9aea92306d21))
* **favorites:** remove logging ([3c8de83](https://github.com/Availity/availity-react/commit/3c8de8315eb0906ba7076397e89a92a35dd1fbda))


* refactor(favorites)!: remove bootstrap, add react-query, rewrite to TypeScript ([eebe86b](https://github.com/Availity/availity-react/commit/eebe86b450024b57f73bac8f45219b9803fe8651))


### BREAKING CHANGES

* Adds react-query v3 as a peer dependency
* Requires all components to be used inside react-query's QueryClientProvider
* No longer requires availity-uikit or any other Bootstrap dependent





## 2.3.4 (2022-02-18)

**Note:** Version bump only for package @availity/favorites





## [2.3.3](https://github.com/Availity/availity-react/compare/@availity/favorites@2.3.2...@availity/favorites@2.3.3) (2021-12-20)

**Note:** Version bump only for package @availity/favorites





## 2.3.2 (2021-12-14)

**Note:** Version bump only for package @availity/favorites





## 2.3.1 (2021-12-02)

**Note:** Version bump only for package @availity/favorites





# 2.3.0 (2021-11-15)


### Features

* move storybook, stories, and fix hmr ([2f65f71](https://github.com/Availity/availity-react/commit/2f65f71769d2d981e22700b87a09516833588f64))





## [2.2.4](https://github.com/Availity/availity-react/compare/@availity/favorites@2.2.3...@availity/favorites@2.2.4) (2021-10-28)

**Note:** Version bump only for package @availity/favorites





## 2.2.3 (2021-10-28)


### Bug Fixes

* **favorites:** disable lint rule ([e328b64](https://github.com/Availity/availity-react/commit/e328b648283edfd495eadb55661b6f3988e1fe3a))





## [2.2.2](https://github.com/Availity/availity-react/compare/@availity/favorites@2.2.1...@availity/favorites@2.2.2) (2021-10-01)

**Note:** Version bump only for package @availity/favorites





## 2.2.1 (2021-09-28)

**Note:** Version bump only for package @availity/favorites





# 2.2.0 (2021-07-19)


### Features

* **favorites:** accessibility label tests ([9d66b7e](https://github.com/Availity/availity-react/commit/9d66b7eb73cae08550d4ae0787e3b10dbe112a1a))
* **favorites:** accessibility updates ([37135f4](https://github.com/Availity/availity-react/commit/37135f48e7d9d57f06a339bb921525b67fa53937))





## 2.1.35 (2021-06-01)

**Note:** Version bump only for package @availity/favorites





## 2.1.34 (2021-01-06)

**Note:** Version bump only for package @availity/favorites





## 2.1.33 (2020-12-23)

**Note:** Version bump only for package @availity/favorites





## 2.1.32 (2020-11-17)

**Note:** Version bump only for package @availity/favorites





## 2.1.31 (2020-10-30)

**Note:** Version bump only for package @availity/favorites





## 2.1.30 (2020-07-08)

**Note:** Version bump only for package @availity/favorites





## 2.1.29 (2020-06-12)

**Note:** Version bump only for package @availity/favorites





## 2.1.28 (2020-04-30)

**Note:** Version bump only for package @availity/favorites





## 2.1.27 (2020-04-30)

**Note:** Version bump only for package @availity/favorites





## 2.1.26 (2020-04-28)

**Note:** Version bump only for package @availity/favorites





## 2.1.25 (2020-04-17)

**Note:** Version bump only for package @availity/favorites





## 2.1.24 (2020-04-09)

**Note:** Version bump only for package @availity/favorites





## 2.1.23 (2020-04-08)

**Note:** Version bump only for package @availity/favorites





## 2.1.22 (2020-04-08)

**Note:** Version bump only for package @availity/favorites





## 2.1.21 (2020-04-07)

**Note:** Version bump only for package @availity/favorites





## 2.1.20 (2020-04-07)

**Note:** Version bump only for package @availity/favorites





## 2.1.19 (2020-04-06)

**Note:** Version bump only for package @availity/favorites





## 2.1.18 (2020-04-06)

**Note:** Version bump only for package @availity/favorites





## 2.1.17 (2020-04-06)

**Note:** Version bump only for package @availity/favorites





## 2.1.16 (2020-04-06)

**Note:** Version bump only for package @availity/favorites





## 2.1.15 (2020-04-03)

**Note:** Version bump only for package @availity/favorites





## 2.1.14 (2020-04-03)

**Note:** Version bump only for package @availity/favorites





## 2.1.13 (2020-04-02)

**Note:** Version bump only for package @availity/favorites





## 2.1.12 (2020-04-02)

**Note:** Version bump only for package @availity/favorites





## [2.1.11](https://github.com/Availity/availity-react/compare/@availity/favorites@2.1.10...@availity/favorites@2.1.11) (2020-02-14)

**Note:** Version bump only for package @availity/favorites





## [2.1.10](https://github.com/Availity/availity-react/compare/@availity/favorites@2.1.9...@availity/favorites@2.1.10) (2020-02-11)

**Note:** Version bump only for package @availity/favorites





## [2.1.9](https://github.com/Availity/availity-react/compare/@availity/favorites@2.1.8...@availity/favorites@2.1.9) (2020-02-10)

**Note:** Version bump only for package @availity/favorites





## [2.1.8](https://github.com/Availity/availity-react/compare/@availity/favorites@2.1.7...@availity/favorites@2.1.8) (2019-10-24)

**Note:** Version bump only for package @availity/favorites





## [2.1.7](https://github.com/Availity/availity-react/compare/@availity/favorites@2.1.6...@availity/favorites@2.1.7) (2019-10-24)

**Note:** Version bump only for package @availity/favorites





## [2.1.6](https://github.com/Availity/availity-react/compare/@availity/favorites@2.1.5...@availity/favorites@2.1.6) (2019-10-24)

**Note:** Version bump only for package @availity/favorites





## [2.1.5](https://github.com/Availity/availity-react/compare/@availity/favorites@2.1.4...@availity/favorites@2.1.5) (2019-10-15)

**Note:** Version bump only for package @availity/favorites





## [2.1.4](https://github.com/Availity/availity-react/compare/@availity/favorites@2.1.3...@availity/favorites@2.1.4) (2019-10-11)


### Bug Fixes

* eslint issues ([bc4d8e9](https://github.com/Availity/availity-react/commit/bc4d8e9))





## [2.1.3](https://github.com/Availity/availity-react/compare/@availity/favorites@2.1.2...@availity/favorites@2.1.3) (2019-10-04)

**Note:** Version bump only for package @availity/favorites





## [2.1.2](https://github.com/Availity/availity-react/compare/@availity/favorites@2.1.1...@availity/favorites@2.1.2) (2019-09-26)

**Note:** Version bump only for package @availity/favorites





## [2.1.1](https://github.com/Availity/availity-react/compare/@availity/favorites@2.1.0...@availity/favorites@2.1.1) (2019-09-25)

**Note:** Version bump only for package @availity/favorites





# [2.1.0](https://github.com/Availity/availity-react/compare/@availity/favorites@2.0.1...@availity/favorites@2.1.0) (2019-09-04)


### Features

* **docs:** updated to use yarn and added readmes ([3b94748](https://github.com/Availity/availity-react/commit/3b94748))





## [2.0.1](https://github.com/Availity/availity-react/compare/@availity/favorites@2.0.0...@availity/favorites@2.0.1) (2019-08-28)

**Note:** Version bump only for package @availity/favorites





# [2.0.0](https://github.com/Availity/availity-react/compare/@availity/favorites@1.1.11...@availity/favorites@2.0.0) (2019-08-19)


### Code Refactoring

* **favorites:** made api resources peer dep ([0ddf6ec](https://github.com/Availity/availity-react/commit/0ddf6ec))


### BREAKING CHANGES

* **favorites:** api-axios api-core and axios are peer deps now





## [1.1.11](https://github.com/Availity/availity-react/compare/@availity/favorites@1.1.10...@availity/favorites@1.1.11) (2019-08-13)

**Note:** Version bump only for package @availity/favorites





## [1.1.10](https://github.com/Availity/availity-react/compare/@availity/favorites@1.1.9...@availity/favorites@1.1.10) (2019-08-11)

**Note:** Version bump only for package @availity/favorites





## [1.1.9](https://github.com/Availity/availity-react/compare/@availity/favorites@1.1.8...@availity/favorites@1.1.9) (2019-07-23)

**Note:** Version bump only for package @availity/favorites





## [1.1.8](https://github.com/Availity/availity-react/compare/@availity/favorites@1.1.7...@availity/favorites@1.1.8) (2019-06-24)

**Note:** Version bump only for package @availity/favorites





## [1.1.7](https://github.com/Availity/availity-react/compare/@availity/favorites@1.1.6...@availity/favorites@1.1.7) (2019-06-03)

**Note:** Version bump only for package @availity/favorites





## [1.1.6](https://github.com/Availity/availity-react/compare/@availity/favorites@1.1.5...@availity/favorites@1.1.6) (2019-05-29)

**Note:** Version bump only for package @availity/favorites





## [1.1.5](https://github.com/Availity/availity-react/compare/@availity/favorites@1.1.4...@availity/favorites@1.1.5) (2019-05-16)


### Bug Fixes

* **favorites:** subscribe to favorites update ([2cf65b9](https://github.com/Availity/availity-react/commit/2cf65b9))





## [1.1.4](https://github.com/Availity/availity-react/compare/@availity/favorites@1.1.3...@availity/favorites@1.1.4) (2019-05-08)


### Bug Fixes

* **favorites:** fix favorites structure in sendUpdate postMessage ([3094d47](https://github.com/Availity/availity-react/commit/3094d47))
* **favorites:** fix logic determining max favorite ([4ce16cd](https://github.com/Availity/availity-react/commit/4ce16cd))
* **favorites:** set favorites to an empty array rather than undefined ([2ee2249](https://github.com/Availity/availity-react/commit/2ee2249))





## [1.1.3](https://github.com/Availity/availity-react/compare/@availity/favorites@1.1.2...@availity/favorites@1.1.3) (2019-05-06)


### Bug Fixes

* **favorites:** fix favorites sent in avMessage when favorites deleted ([4feacef](https://github.com/Availity/availity-react/commit/4feacef))
* **favorites:** send post message to window.parent when favorite added ([b7448e4](https://github.com/Availity/availity-react/commit/b7448e4))





## [1.1.2](https://github.com/Availity/availity-react/compare/@availity/favorites@1.1.1...@availity/favorites@1.1.2) (2019-05-02)

**Note:** Version bump only for package @availity/favorites





## [1.1.1](https://github.com/Availity/availity-react/compare/@availity/favorites@1.1.0...@availity/favorites@1.1.1) (2019-04-23)


### Bug Fixes

* **favorites:** fixed focus event ([7c67fe5](https://github.com/Availity/availity-react/commit/7c67fe5))





# [1.1.0](https://github.com/Availity/availity-react/compare/@availity/favorites@1.0.1...@availity/favorites@1.1.0) (2019-04-09)


### Features

* **favorites:** added export for context ([1e7df28](https://github.com/Availity/availity-react/commit/1e7df28))





## 1.0.1 (2019-03-26)

**Note:** Version bump only for package @availity/favorites
