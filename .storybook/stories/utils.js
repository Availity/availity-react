import React from 'react';
import { ArgsTable } from '@storybook/addon-docs';

const OutsideArgsTable = (...props) => (
  <div className="outside-args-table">
    <ArgsTable {...props} />
  </div>
);

export default OutsideArgsTable;
