---
title: validatePhone
summary: Availity Phone component using Formik and Yup
---

[![Version](https://img.shields.io/npm/v/@availity/phone.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/phone)

## Installation

```bash
yarn add @availity/phone
```

## Usage

`validatePhone` is a method that can be applied to yup string schemas and is intended to be used with a `<Phone />` component.

```jsx
import * as yup from 'yup';
import '@availity/phone/src/validatePhone';

const laxSchema = yup
  .string()
  .validatePhone('This phone number is not possible.');
const strictSchema = yup
  .string()
  .validatePhone('This phone number is invalid.', true, 'US');

laxSchema.isValid('222-222-2222'); // true
strictSchema.isValid('222-222-2222'); // false
```

## Props

### `msg?: string`

Optional message to display when validation fails.

### `strict?: boolean`

Controls whether or not strict phone number validation is used on the component. Defaults to `false`. [Benefits of not defaulting to strict validation](https://github.com/catamphetamine/libphonenumber-js/blob/master/README.md#using-phone-number-validation-feature).

### `country?: string`

Default country for parsing national numbers. This is the [two letter ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). If no code is provided, the default is `'US'`.
