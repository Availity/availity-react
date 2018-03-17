import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { checkA11y } from '@storybook/addon-a11y';

import AvUppy from '../packages/uppy-react';
import AvUppyGrill from '../packages/uppy-grill/react';
import README from '../packages/uppy-grill/README.md';

storiesOf('AvUppyGrill')
  .addDecorator(withReadme([README]))
  .addDecorator(checkA11y)
  .add('default', () => (
    <AvUppy
      bucket="AVAILITY_BUCKET"
      clientId="AVAILITY_API_CLIENT_ID"
      customerId="AVAILITY_CUSTOMER_ID"
      component={AvUppyGrill}
      showProgressDetails
    />
  ))
  .add('with meta fields', () => (
    <AvUppy
      bucket="AVAILITY_BUCKET"
      clientId="AVAILITY_API_CLIENT_ID"
      customerId="AVAILITY_CUSTOMER_ID"
      metaFields={[
        {
          name: 'Type',
          id: 'type',
          errorMessage: 'Enter a valid Type.',
          validation: { required: true },
          col: 4,
          tag: 'select',
          options: ['Type 1', 'Type 2', 'Type 3', 'Type 4'],
        },
        {
          name: 'Image Date',
          defaultValue: 'lastModified',
          id: 'imageDate',
          errorMessage: 'Enter a valid Image Date.',
          validation: { required: true, date: true },
          col: 4,
          placeholder: 'mm/dd/yyyy',
          tag: 'date',
        },
        {
          name: 'Image Orientation',
          id: 'imageOrientation',
          errorMessage: 'Enter a valid Image Orientation.',
          validation: { required: true },
          col: 4,
          tag: 'select',
          options: [
            { value: '1', label: 'Left' },
            { value: '2', label: 'Right' },
            { value: '0', label: 'Unknown' },
          ],
        },
        {
          name: 'Report Type',
          id: 'reportTypeCode',
          errorMessage: 'Enter a valid Report Type.',
          validation: { required: true },
          valueKey: 'code',
          labelKey: 'value',
          tag: 'select',
          options: [
            { code: 'SAR1', value: 'Super Awesome Report Type 1' },
            { code: 'SAR2', value: 'Super Awesome Report Type 2' },
            { code: 'SAR3', value: 'Super Awesome Report Type 3' },
            { code: 'SAR4', value: 'Super Awesome Report Type 4' },
          ],
        },
        {
          name: 'Comment',
          id: 'comment',
        },
      ]}
      component={AvUppyGrill}
      showProgressDetails
    />
  ))
  .add('with validation', () => (
    <AvUppy
      bucket="AVAILITY_BUCKET"
      clientId="AVAILITY_API_CLIENT_ID"
      customerId="AVAILITY_CUSTOMER_ID"
      component={AvUppyGrill}
      restrictions={{
        maxFileSize: 5 * 1024 * 1024,
        maxNumberOfFiles: 10,
        minNumberOfFiles: false,
        allowedFileTypes: ['image/jpeg', 'image/jpg'],
      }}
      showProgressDetails
    />
  ));
