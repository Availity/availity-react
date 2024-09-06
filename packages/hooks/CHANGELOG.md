# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

## [5.0.3](https://github.com/Availity/availity-react/compare/@availity/hooks@5.0.2...@availity/hooks@5.0.3) (2024-08-22)



# 1.0.0 (2024-08-22)


### Bug Fixes

* eslint issues ([bc4d8e9](https://github.com/Availity/availity-react/commit/bc4d8e9252a37c067de3e5b15e583c4a3c06d6c5))
* **hooks:** moved region fetching into useEffect, and adding trycatch to better handle errors ([e3d8454](https://github.com/Availity/availity-react/commit/e3d845457bb7d5ed7facde0081258d990c1eae6e))
* **hooks:** remove effect from dependency array in useMount ([a096fa4](https://github.com/Availity/availity-react/commit/a096fa45af7aaa40a09c87254aef0de864fa8ab6))
* **hooks:** use optional chaining ([ec54426](https://github.com/Availity/availity-react/commit/ec54426b81cb63f4e3ce14ba1fd1fb9c0f208d23))
* removed npmrc and added config to lerna for now creating locks ([efe82ab](https://github.com/Availity/availity-react/commit/efe82ab5a9a38cc8113d5cc71416f1ef347eb4c4))
* removed package-locks,added npmrc ignore,fixed react as hoisted dep ([4648319](https://github.com/Availity/availity-react/commit/4648319b1298096de2e3e37bf6246e5f169ace0e))
* upgrade yup and update sb stories ([68aeafe](https://github.com/Availity/availity-react/commit/68aeafe4fd7d90d7c88dbb24636ba7770fe87aa3))


### Features

* allow for options to be passed in ([1d99a8b](https://github.com/Availity/availity-react/commit/1d99a8b942267c5be69711576ef4f64b8e36bacb))
* **docs:** updated to use yarn and added readmes ([3b94748](https://github.com/Availity/availity-react/commit/3b947487ef18c6e11486ad39203882a11bc8a1e7))
* **form:** add currency input ([fa9eea6](https://github.com/Availity/availity-react/commit/fa9eea6a3b3dd2ef741a0658c102e36c6db5288c))
* **hooks:** add documentation to sidebar, some formatting ([fbd9964](https://github.com/Availity/availity-react/commit/fbd99648c18993394f773d8540c1be023acf6e5b))
* **hooks:** add usePermissions, useOrganizations, useProviders hook ([458f5e5](https://github.com/Availity/availity-react/commit/458f5e50038c4fdc5a23919daec918a87cdb08e9))
* **hooks:** add useWindowDimensionsHook ([203d9c0](https://github.com/Availity/availity-react/commit/203d9c0a31362ec084c94c4ae50ab4b6efbc876b))
* **hooks:** added some common hooks to a new package ([98663fd](https://github.com/Availity/availity-react/commit/98663fd4742b988b0f11ad15236addf3237c9c0d))
* **hooks:** added storybook story for useCurrentUser ([00277b7](https://github.com/Availity/availity-react/commit/00277b73e15e4f26210d81fdc27a56fb94380838))
* **hooks:** added useCurrentUser hook ([8cab508](https://github.com/Availity/availity-react/commit/8cab5089074747bd1a970b48427c5ba8918d0db0))
* **hooks:** added useTimout and useMount hooks, tests, and docs ([e82c81e](https://github.com/Availity/availity-react/commit/e82c81ef840531b4327dcb823d6f3cfdda19fa22))
* **hooks:** fixed the copy pasta ([d82d5f9](https://github.com/Availity/availity-react/commit/d82d5f93e9c3609fe2142043043d1c01ef7f48e1))
* **hooks:** upgrade react query to v4 ([9b7b266](https://github.com/Availity/availity-react/commit/9b7b266fbbd880114d162d5a4f89f7a9f34a6a6f))
* **hooks:** upgrade to react-query v2 ([2da4115](https://github.com/Availity/availity-react/commit/2da411548721cee86be33dd92cf62a99f80e86cf))
* **hooks:** upgrade to react-query v3 ([351aeff](https://github.com/Availity/availity-react/commit/351aeff7bc6b2c14379b2113bc17624a956dfdd6))
* move storybook, stories, and fix hmr ([2f65f71](https://github.com/Availity/availity-react/commit/2f65f71769d2d981e22700b87a09516833588f64))
* **pagination:** pagination components using hooks ([590e5fd](https://github.com/Availity/availity-react/commit/590e5fd05fcf0656d2309ae091938b334fd422ee)), closes [#27](https://github.com/Availity/availity-react/issues/27) [#64](https://github.com/Availity/availity-react/issues/64)
* update to use react-query ([d762643](https://github.com/Availity/availity-react/commit/d762643e49da3de41922021833ab5bd209d2cbf9))
* upgrade deps ([eccefc0](https://github.com/Availity/availity-react/commit/eccefc0549ebd5057595f6ac696642789375f48a))


### BREAKING CHANGES

* **hooks:** react query has been upgraded to v4. you must upgrade
to @tanstack/react-query@^4.36.1 in order to use this package now
* axios v1 is now required
* **hooks:** react-query ^3.0.0 is now required
* **hooks:** the return shapes have changed for most async hooks



## [5.0.2](https://github.com/Availity/availity-react/compare/@availity/hooks@5.0.1...@availity/hooks@5.0.2) (2024-04-23)



## [5.0.1](https://github.com/Availity/availity-react/compare/@availity/hooks@5.0.0...@availity/hooks@5.0.1) (2024-02-21)



# [5.0.0](https://github.com/Availity/availity-react/compare/@availity/hooks@4.0.0...@availity/hooks@5.0.0) (2023-10-16)


### Features

* **hooks:** upgrade react query to v4 ([9b7b266](https://github.com/Availity/availity-react/commit/9b7b266fbbd880114d162d5a4f89f7a9f34a6a6f))


### BREAKING CHANGES

* **hooks:** react query has been upgraded to v4. you must upgrade
to @tanstack/react-query@^4.36.1 in order to use this package now



# [4.0.0](https://github.com/Availity/availity-react/compare/@availity/hooks@3.3.3...@availity/hooks@4.0.0) (2023-10-09)


### Features

* upgrade deps ([eccefc0](https://github.com/Availity/availity-react/commit/eccefc0549ebd5057595f6ac696642789375f48a))


### BREAKING CHANGES

* axios v1 is now required



## [3.3.3](https://github.com/Availity/availity-react/compare/@availity/hooks@3.3.2...@availity/hooks@3.3.3) (2023-01-27)



## [3.3.2](https://github.com/Availity/availity-react/compare/@availity/hooks@3.3.1...@availity/hooks@3.3.2) (2023-01-11)



## [3.3.1](https://github.com/Availity/availity-react/compare/@availity/hooks@3.3.0...@availity/hooks@3.3.1) (2022-06-14)



# [3.3.0](https://github.com/Availity/availity-react/compare/@availity/hooks@3.2.2...@availity/hooks@3.3.0) (2022-06-14)


### Features

* **form:** add currency input ([fa9eea6](https://github.com/Availity/availity-react/commit/fa9eea6a3b3dd2ef741a0658c102e36c6db5288c))



## [3.2.2](https://github.com/Availity/availity-react/compare/@availity/hooks@3.2.1...@availity/hooks@3.2.2) (2022-06-10)



## [3.2.1](https://github.com/Availity/availity-react/compare/@availity/hooks@3.2.0...@availity/hooks@3.2.1) (2022-05-24)


### Bug Fixes

* upgrade yup and update sb stories ([68aeafe](https://github.com/Availity/availity-react/commit/68aeafe4fd7d90d7c88dbb24636ba7770fe87aa3))



# 3.2.0 (2022-02-18)


### Features

* **hooks:** add documentation to sidebar, some formatting ([fbd9964](https://github.com/Availity/availity-react/commit/fbd99648c18993394f773d8540c1be023acf6e5b))
* **hooks:** add useWindowDimensionsHook ([203d9c0](https://github.com/Availity/availity-react/commit/203d9c0a31362ec084c94c4ae50ab4b6efbc876b))





## [3.1.2](https://github.com/Availity/availity-react/compare/@availity/hooks@3.1.1...@availity/hooks@3.1.2) (2021-12-20)

**Note:** Version bump only for package @availity/hooks





## 3.1.1 (2021-12-14)

**Note:** Version bump only for package @availity/hooks





# 3.1.0 (2021-11-15)


### Features

* move storybook, stories, and fix hmr ([2f65f71](https://github.com/Availity/availity-react/commit/2f65f71769d2d981e22700b87a09516833588f64))





## [3.0.6](https://github.com/Availity/availity-react/compare/@availity/hooks@3.0.5...@availity/hooks@3.0.6) (2021-10-28)

**Note:** Version bump only for package @availity/hooks





## 3.0.5 (2021-10-28)

**Note:** Version bump only for package @availity/hooks





## [3.0.4](https://github.com/Availity/availity-react/compare/@availity/hooks@3.0.3...@availity/hooks@3.0.4) (2021-10-01)

**Note:** Version bump only for package @availity/hooks





## 3.0.3 (2021-09-28)

**Note:** Version bump only for package @availity/hooks





## 3.0.2 (2021-06-01)

**Note:** Version bump only for package @availity/hooks





## 3.0.1 (2021-01-06)


### Bug Fixes

* **hooks:** remove effect from dependency array in useMount ([a096fa4](https://github.com/Availity/availity-react/commit/a096fa45af7aaa40a09c87254aef0de864fa8ab6))





# 3.0.0 (2020-12-23)


### Features

* **hooks:** upgrade to react-query v3 ([351aeff](https://github.com/Availity/availity-react/commit/351aeff7bc6b2c14379b2113bc17624a956dfdd6))


### BREAKING CHANGES

* **hooks:** react-query ^3.0.0 is now required





## 2.0.1 (2020-11-17)

**Note:** Version bump only for package @availity/hooks





# 2.0.0 (2020-10-30)


### Bug Fixes

* **hooks:** use optional chaining ([ec54426](https://github.com/Availity/availity-react/commit/ec54426b81cb63f4e3ce14ba1fd1fb9c0f208d23))


### Features

* **hooks:** upgrade to react-query v2 ([2da4115](https://github.com/Availity/availity-react/commit/2da411548721cee86be33dd92cf62a99f80e86cf))


### BREAKING CHANGES

* **hooks:** the return shapes have changed for most async hooks





# 1.8.0 (2020-07-08)


### Features

* allow for options to be passed in ([1d99a8b](https://github.com/Availity/availity-react/commit/1d99a8b942267c5be69711576ef4f64b8e36bacb))
* update to use react-query ([d762643](https://github.com/Availity/availity-react/commit/d762643e49da3de41922021833ab5bd209d2cbf9))





# 1.7.0 (2020-06-12)


### Features

* **hooks:** add usePermissions, useOrganizations, useProviders hook ([458f5e5](https://github.com/Availity/availity-react/commit/458f5e50038c4fdc5a23919daec918a87cdb08e9))





## 1.6.23 (2020-04-30)

**Note:** Version bump only for package @availity/hooks





## 1.6.22 (2020-04-30)

**Note:** Version bump only for package @availity/hooks





## 1.6.21 (2020-04-28)

**Note:** Version bump only for package @availity/hooks





## 1.6.20 (2020-04-17)

**Note:** Version bump only for package @availity/hooks





## 1.6.19 (2020-04-09)

**Note:** Version bump only for package @availity/hooks





## 1.6.18 (2020-04-08)

**Note:** Version bump only for package @availity/hooks





## 1.6.17 (2020-04-08)

**Note:** Version bump only for package @availity/hooks





## 1.6.16 (2020-04-07)

**Note:** Version bump only for package @availity/hooks





## 1.6.15 (2020-04-07)

**Note:** Version bump only for package @availity/hooks





## 1.6.14 (2020-04-06)

**Note:** Version bump only for package @availity/hooks





## 1.6.13 (2020-04-06)

**Note:** Version bump only for package @availity/hooks





## 1.6.12 (2020-04-06)

**Note:** Version bump only for package @availity/hooks





## 1.6.11 (2020-04-06)

**Note:** Version bump only for package @availity/hooks





## 1.6.10 (2020-04-03)

**Note:** Version bump only for package @availity/hooks





## 1.6.9 (2020-04-03)

**Note:** Version bump only for package @availity/hooks





## 1.6.8 (2020-04-02)

**Note:** Version bump only for package @availity/hooks





## 1.6.7 (2020-04-02)

**Note:** Version bump only for package @availity/hooks





## [1.6.6](https://github.com/Availity/availity-react/compare/@availity/hooks@1.6.5...@availity/hooks@1.6.6) (2020-02-11)

**Note:** Version bump only for package @availity/hooks





## [1.6.5](https://github.com/Availity/availity-react/compare/@availity/hooks@1.6.4...@availity/hooks@1.6.5) (2020-02-10)

**Note:** Version bump only for package @availity/hooks





## [1.6.4](https://github.com/Availity/availity-react/compare/@availity/hooks@1.6.3...@availity/hooks@1.6.4) (2019-10-24)

**Note:** Version bump only for package @availity/hooks





## [1.6.3](https://github.com/Availity/availity-react/compare/@availity/hooks@1.6.2...@availity/hooks@1.6.3) (2019-10-11)


### Bug Fixes

* eslint issues ([bc4d8e9](https://github.com/Availity/availity-react/commit/bc4d8e9))





## [1.6.2](https://github.com/Availity/availity-react/compare/@availity/hooks@1.6.1...@availity/hooks@1.6.2) (2019-09-26)


### Bug Fixes

* **hooks:** moved region fetching into useEffect, and adding trycatch to better handle errors ([e3d8454](https://github.com/Availity/availity-react/commit/e3d8454))





## [1.6.1](https://github.com/Availity/availity-react/compare/@availity/hooks@1.6.0...@availity/hooks@1.6.1) (2019-09-25)

**Note:** Version bump only for package @availity/hooks





# [1.6.0](https://github.com/Availity/availity-react/compare/@availity/hooks@1.5.2...@availity/hooks@1.6.0) (2019-09-04)


### Features

* **docs:** updated to use yarn and added readmes ([3b94748](https://github.com/Availity/availity-react/commit/3b94748))





## [1.5.2](https://github.com/Availity/availity-react/compare/@availity/hooks@1.5.1...@availity/hooks@1.5.2) (2019-08-19)

**Note:** Version bump only for package @availity/hooks





## [1.5.1](https://github.com/Availity/availity-react/compare/@availity/hooks@1.5.0...@availity/hooks@1.5.1) (2019-08-13)

**Note:** Version bump only for package @availity/hooks





# [1.5.0](https://github.com/Availity/availity-react/compare/@availity/hooks@1.4.0...@availity/hooks@1.5.0) (2019-08-11)


### Features

* **hooks:** added storybook story for useCurrentUser ([00277b7](https://github.com/Availity/availity-react/commit/00277b7))
* **hooks:** added useCurrentUser hook ([8cab508](https://github.com/Availity/availity-react/commit/8cab508))
* **hooks:** fixed the copy pasta ([d82d5f9](https://github.com/Availity/availity-react/commit/d82d5f9))





# [1.4.0](https://github.com/Availity/availity-react/compare/@availity/hooks@1.3.3...@availity/hooks@1.4.0) (2019-07-23)


### Features

* **hooks:** added useTimout and useMount hooks, tests, and docs ([e82c81e](https://github.com/Availity/availity-react/commit/e82c81e))





## [1.3.3](https://github.com/Availity/availity-react/compare/@availity/hooks@1.3.2...@availity/hooks@1.3.3) (2019-06-24)

**Note:** Version bump only for package @availity/hooks





## [1.3.2](https://github.com/Availity/availity-react/compare/@availity/hooks@1.3.1...@availity/hooks@1.3.2) (2019-06-03)

**Note:** Version bump only for package @availity/hooks





## [1.3.1](https://github.com/Availity/availity-react/compare/@availity/hooks@1.3.0...@availity/hooks@1.3.1) (2019-05-29)

**Note:** Version bump only for package @availity/hooks





# [1.3.0](https://github.com/Availity/availity-react/compare/@availity/hooks@1.1.1...@availity/hooks@1.3.0) (2019-03-04)


### Features

* **pagination:** pagination components using hooks ([590e5fd](https://github.com/Availity/availity-react/commit/590e5fd)), closes [#27](https://github.com/Availity/availity-react/issues/27) [#64](https://github.com/Availity/availity-react/issues/64)





# [1.2.0](https://github.com/Availity/availity-react/compare/@availity/hooks@1.1.1...@availity/hooks@1.2.0) (2019-03-04)


### Features

* **pagination:** pagination components using hooks ([590e5fd](https://github.com/Availity/availity-react/commit/590e5fd)), closes [#27](https://github.com/Availity/availity-react/issues/27) [#64](https://github.com/Availity/availity-react/issues/64)





## [1.1.1](https://github.com/Availity/availity-react/compare/@availity/hooks@1.1.0...@availity/hooks@1.1.1) (2019-02-25)


### Bug Fixes

* removed npmrc and added config to lerna for now creating locks ([efe82ab](https://github.com/Availity/availity-react/commit/efe82ab))
* removed package-locks,added npmrc ignore,fixed react as hoisted dep ([4648319](https://github.com/Availity/availity-react/commit/4648319))





# 1.1.0 (2019-02-21)


### Features

* **hooks:** added some common hooks to a new package ([98663fd](https://github.com/Availity/availity-react/commit/98663fd))
