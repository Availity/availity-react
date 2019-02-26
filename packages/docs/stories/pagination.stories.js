/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs } from '@storybook/addon-knobs/react';
import PropTypes from 'prop-types';
import {
  Pagination,
  PaginationContent,
  PaginationControls,
  AvResourcePagination,
} from '@availity/pagination';
import README from '@availity/pagination/README.md';
import { boolean, number } from '@storybook/addon-knobs';
import { text } from '@storybook/addon-knobs/dist/deprecated';
import paginationData from './data/pagination.json';

const getItems = (number = 1) =>
  Array.from({ length: number }, (v, k) => ({
    value: `Item ${k + 1}`,
    key: k + 1,
  }));
const Component = ({ value }) => <li>{value}</li>;
Component.propTypes = {
  value: PropTypes.string,
};

const UserComponent = ({ name }) => <li>{`${name.first} ${name.last}`}</li>;

const mockResponse = {
  postGet: async (params = {}, config = {}) =>
    new Promise(resolve =>
      setTimeout(() => {
        const { offset = 0, limit = 50 } = params;
        const notifications = paginationData.slice(offset, offset + limit);
        resolve({
          config,
          data: {
            totalCount: paginationData.length,
            count: notifications.length,
            offset,
            limit,
            notifications,
          },
        });
      }, 1000)
    ),
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
        itemKey="key"
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
  ))
  .add('resource', () => (
    <AvResourcePagination
      resource={{
        postGet: mockResponse.postGet,
        getResult: 'notifications',
      }}
    >
      <PaginationContent itemKey="id" component={UserComponent} loader />
      <PaginationControls boundaryLinks />
    </AvResourcePagination>
  ));
