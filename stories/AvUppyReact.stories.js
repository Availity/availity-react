import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { checkA11y } from '@storybook/addon-a11y';

import DragDrop from 'uppy/lib/react/DragDrop';
import Dashboard from 'uppy/lib/react/Dashboard';
import 'uppy/dist/uppy.min.css';
import AvUppy from '../packages/uppy-react';
import README from '../packages/uppy-react/README.md';

storiesOf('AvUppyReact')
  .addDecorator(withReadme([README]))
  .addDecorator(checkA11y)
  .add('with drag drop', () => (
    <AvUppy
      bucket="AVAILITY_BUCKET"
      clientId="AVAILITY_API_CLIENT_ID"
      customerId="AVAILITY_CUSTOMER_ID"
      component={DragDrop}
      showProgressDetails
    />
  ))
  .add('with validations and dashboard', () => (
    <AvUppy
      bucket="AVAILITY_BUCKET"
      clientId="AVAILITY_API_CLIENT_ID"
      customerId="AVAILITY_CUSTOMER_ID"
      component={Dashboard}
      restrictions={{
        maxFileSize: 5 * 1024 * 1024,
        maxNumberOfFiles: 10,
        minNumberOfFiles: false,
        allowedFileTypes: ['image/jpeg', 'image/jpg'],
      }}
      showProgressDetails
    />
  ));
