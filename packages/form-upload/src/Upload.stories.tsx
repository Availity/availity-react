import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Form } from '@availity/form';

import Upload from '.';

export default {
  title: 'Components/Button/Loading Button',
} as Meta;

export const Default: Story = () => (
  <Form
    initialValues={{ upload: null }}
    onSubmit={() => {
      // noop
    }}
  >
    <Upload name="upload" clientId="123" customerId="123" bucketId="789" showFileDrop />
  </Form>
);

Default.storyName = 'default';
