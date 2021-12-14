import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Card, CardBody, CardText, CardTitle, Col } from 'reactstrap';
import paginationData from '@availity/mock/data/pagination.json';

import { Pagination, PaginationContent, PaginationControls, AvResourcePagination } from '..';
// import README from '../README.md';

interface Name {
  first: string;
  last: string;
}

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

type ComponentProps = {
  name?: Name;
  address?: Address;
};

const Component = ({ name, address }: ComponentProps): JSX.Element => (
  <Card>
    <CardBody>
      <CardTitle>
        {name?.first} {name?.last}
      </CardTitle>
      <CardText className="mt-2" tag="div">
        <div className="label">Address</div>
        {address?.street} <br />
        {address?.city} {address?.state} {address?.postalCode}
      </CardText>
    </CardBody>
  </Card>
);

const mockResponse = {
  postGet: async (params = {}, config = {}) =>
    new Promise((resolve) =>
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

export default {
  title: 'Components/Pagination',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const Default: Story = ({
  autoHide,
  breakLabel,
  directionLinks,
  infiniteScroll,
  itemsPerPage,
  loadingMessage,
  marginPages,
  pageRange,
  showLoader,
  unstyled,
}): JSX.Element => (
  <Pagination itemsPerPage={itemsPerPage} items={paginationData}>
    <div className="d-flex flex-column align-items-center">
      <Col xs={12}>
        <PaginationContent
          infiniteScroll={infiniteScroll}
          itemKey="id"
          loader={showLoader}
          loadingMessage={loadingMessage}
          component={Component}
        />
      </Col>
      {!infiniteScroll && (
        <PaginationControls
          className="pt-2"
          pageRange={pageRange}
          breakLabel={breakLabel}
          marginPages={marginPages}
          directionLinks={directionLinks}
          autoHide={autoHide}
          aria-label="custom pagination label"
          listClassName={unstyled ? 'pagination-unstyled' : ''}
        />
      )}
    </div>
  </Pagination>
);
Default.args = {
  autoHide: true,
  breakLabel: true,
  directionLinks: true,
  infiniteScroll: false,
  itemsPerPage: 5,
  loadingMessage: 'Loading',
  marginPages: 2,
  pageRange: 5,
  showLoader: false,
  unstyled: false,
  showPaginationText: false
};
Default.storyName = 'default';

export const Controls: Story = ({ autoHide, directionLinks, showPaginationText,  }) => (
  <Pagination items={paginationData}>
    <PaginationControls directionLinks={directionLinks} autoHide={autoHide} showPaginationText={showPaginationText} />
  </Pagination>
);
Controls.args = {
  autoHide: true,
  directionLinks: true,
  showPaginationText: true
};
Controls.storyName = 'controls';

export const Resource: Story = ({
  breakLabel,
  directionLinks,
  infiniteScroll,
  itemsPerPage,
  marginPages,
  pageRange,
  showLoader,
}): JSX.Element => (
  <AvResourcePagination resource={resource} itemsPerPage={itemsPerPage}>
    <div className="d-flex flex-column align-items-center">
      <Col xs={12}>
        <PaginationContent infiniteScroll={infiniteScroll} itemKey="id" component={Component} loader={showLoader} />
      </Col>
      {!infiniteScroll && (
        <PaginationControls
          className="pt-2"
          pageRange={pageRange}
          breakLabel={breakLabel}
          marginPages={marginPages}
          directionLinks={directionLinks}
        />
      )}
    </div>
  </AvResourcePagination>
);
Resource.args = {
  breakLabel: true,
  directionLinks: true,
  infiniteScroll: false,
  itemsPerPage: 5,
  marginPages: 2,
  pageRange: 5,
  showLoader: false,
};
Resource.storyName = 'resource';
