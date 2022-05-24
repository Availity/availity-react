import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Form } from '@availity/form';

import Upload from '.';

export default {
  title: 'Form Components/Upload',
} as Meta;

export const Default: Story = ({ showFileDrop }) => (
  <Form
    initialValues={{ upload: null }}
    onSubmit={() => {
      // noop
    }}
  >
    <Upload name="upload" clientId="123" customerId="123" bucketId="789" showFileDrop={showFileDrop} />
  </Form>
);

Default.args = {
  showFileDrop: true,
};

Default.storyName = 'default';
