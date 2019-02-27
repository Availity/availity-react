/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs } from '@storybook/addon-knobs/react';
import {
  Pagination,
  PaginationContent,
  PaginationControls,
  AvResourcePagination,
} from '@availity/pagination';
import { Card, CardBody, CardText, CardTitle, Col } from 'reactstrap';
import README from '@availity/pagination/README.md';
import { boolean, number } from '@storybook/addon-knobs';
import { text } from '@storybook/addon-knobs/dist/deprecated';
import paginationData from './data/pagination.json';

const Component = ({ name, address }) => (
  <Card>
    <CardBody>
      <CardTitle>
        {name.first} {name.last}
      </CardTitle>
      <CardText className="mt-2" tag="div">
        <div className="label">Address</div>
        {address.street} <br />
        {address.city} {address.state} {address.postalCode}
      </CardText>
    </CardBody>
  </Card>
);

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

const resource = {
  postGet: mockResponse.postGet,
  getResult: 'notifications',
};

storiesOf('Components|Pagination', module)
  .addDecorator(withReadme([README]))
  .addDecorator(withKnobs)
  .add('default', () => (
    <Pagination
      itemsPerPage={number('Items Per page', 5, { min: 1 }) || 1}
      items={paginationData}
    >
      <div className="d-flex flex-column align-items-center">
        <Col xs={12}>
          <PaginationContent
            itemKey="id"
            loader={boolean('Show Loader', false)}
            loadingMessage={text('Loading Message', 'Loading')}
            component={Component}
          />
        </Col>
        <PaginationControls
          className="pt-2"
          directionLinks={boolean('Direction Links', true)}
          autoHide={boolean('Auto Hide Controls', true)}
        />
      </div>
    </Pagination>
  ))
  .add('controls', () => (
    <Pagination items={paginationData}>
      <PaginationControls
        directionLinks={boolean('Direction Links', true)}
        autoHide={boolean('Auto Hide', true)}
      />
    </Pagination>
  ))
  .add('resource', () => (
    <AvResourcePagination
      resource={resource}
      itemsPerPage={number('Items Per page', 5, { min: 1 }) || 1}
    >
      <div className="d-flex flex-column align-items-center">
        <Col xs={12}>
          <PaginationContent
            itemKey="id"
            component={Component}
            loader={boolean('Show Loader', true)}
          />
        </Col>
        <PaginationControls
          className="pt-2"
          directionLinks={boolean('Direction Links', true)}
        />
      </div>
    </AvResourcePagination>
  ));
