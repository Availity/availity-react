import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs } from '@storybook/addon-knobs/react';
import PropTypes from 'prop-types';
import {
  Pagination,
  PaginationContent,
  PaginationControls,
} from '@availity/pagination';
import README from '@availity/pagination/README.md';
import { boolean, number } from '@storybook/addon-knobs';
import { text } from '@storybook/addon-knobs/dist/deprecated';

const getItems = (number = 1) =>
  Array.from({ length: number }, (v, k) => ({
    value: `Item ${k + 1}`,
    key: k + 1,
  }));
const Component = ({ value }) => <li>{value}</li>;
Component.propTypes = {
  value: PropTypes.string,
};

storiesOf('Components|Pagination', module)
  .addDecorator(withReadme([README]))
  .addDecorator(withKnobs)
  .add('default', () => (
    <Pagination
      itemsPerPage={number('Items Per page', 10, { min: 1 }) || 1}
      items={getItems(number('Items', 20, { min: 1 })) || []}
    >
      <PaginationContent
        loading={boolean('Loading', false)}
        loadingMessage={text('Loading Message', 'Loading')}
        component={Component}
      />
      <PaginationControls
        directionLinks
        autoHide={boolean('Auto Hide Controls', true)}
      />
    </Pagination>
  ))
  .add('controls', () => (
    <Pagination
      items={
        getItems(number('Items', 20, { min: 1 })) || { value: 'Item 1', key: 1 }
      }
    >
      <PaginationControls
        directionLinks={boolean('Direction Links', true)}
        autoHide={boolean('Auto Hide', true)}
      />
    </Pagination>
  ));
