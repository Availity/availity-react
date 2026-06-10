import React from 'react';
import { StoryObj } from '@storybook/react-vite';
import { Card, CardBody, CardText, CardTitle, Col } from 'reactstrap';
import AvApi from '@availity/api-axios';
import paginationData from '@availity/mock/src/data/pagination.json';
import { Pagination, PaginationContent, PaginationContentProps, PaginationControls, AvResourcePagination } from '.';
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

const resource = new AvApi({ name: 'pagination' });

/**
 * Pagination, the Availity way.
 */
export default {
  title: 'Deprecated/Pagination',
  component: Pagination,
};

type PaginationStoryProps = {
  autoHide: boolean;
  breakLabel: boolean;
  directionLinks: boolean;
  infiniteScroll: boolean;
  itemsPerPage: number;
  loadingMessage: string;
  marginPages: number;
  pageRange: number;
  showLoader: boolean;
  unstyled: boolean;
  showPaginationText: boolean;
};

export const _Pagination: StoryObj<PaginationStoryProps> = {
  render: ({
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
  ),
  args: {
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
    showPaginationText: false,
  },
};
type PaginationControlsStoryProps = {
  autoHide: boolean;
  directionLinks: boolean;
  showPaginationText: boolean;
};

export const _Controls: StoryObj<PaginationControlsStoryProps> = {
  render: ({ autoHide, directionLinks, showPaginationText }) => (
    <Pagination items={paginationData}>
      <PaginationControls directionLinks={directionLinks} autoHide={autoHide} showPaginationText={showPaginationText} />
    </Pagination>
  ),
  args: {
    autoHide: true,
    directionLinks: true,
    showPaginationText: true,
  },
};

export const _AvResource: StoryObj<PaginationContentProps> = {
  render: ({
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
  ),
  args: {
    breakLabel: true,
    directionLinks: true,
    infiniteScroll: false,
    itemsPerPage: 5,
    marginPages: 2,
    pageRange: 5,
    showLoader: true,
  },
};
