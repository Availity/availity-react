import React from 'react';
import { ArgTypes } from '@storybook/addon-docs/blocks';

const OutsideArgsTable = (...props) => (
  <div className="outside-args-table">
    <ArgTypes {...props} />
  </div>
);

export default OutsideArgsTable;
