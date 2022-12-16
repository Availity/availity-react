import React from 'react';
import { ArgsTable } from '@storybook/addon-docs';
import { Meta, Story } from '@storybook/react';
import {
  Pagination as RsPagination,
  PaginationProps as RsPaginationProps,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
} from 'reactstrap';
import AvApi from '@availity/api-axios';
import paginationData from '@availity/mock/src/data/pagination.json';
import {
  Pagination,
  PaginationProps,
  PaginationContent,
  PaginationContentProps,
  PaginationControls,
  PaginationControlsProps,
  AvResourcePagination,
  AvResourcePaginationProps,
} from '..';
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

export default {
  title: 'Components/Pagination',
  parameters: {
    docs: {
      // page: README,
      description: {
        component: 'Pagination, the Availity way.',
      },
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
  showPaginationText: false,
};
Default.storyName = 'default';

export const Controls: Story = ({ autoHide, directionLinks, showPaginationText }) => (
  <Pagination items={paginationData}>
    <PaginationControls directionLinks={directionLinks} autoHide={autoHide} showPaginationText={showPaginationText} />
  </Pagination>
);
Controls.args = {
  autoHide: true,
  directionLinks: true,
  showPaginationText: true,
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
  showLoader: true,
};
Resource.storyName = 'AvResource';

export const hidden_Pagination = ({
  items,
  itemsPerPage = 10,
  defaultPage = 1,
  debounceTimeout = 0,
  shouldReturnPrevious = false,
}: PaginationProps<object>) => {
  const props = {
    items,
    itemsPerPage,
    defaultPage,
    debounceTimeout,
    shouldReturnPrevious,
  };
  return <Pagination {...props} />;
};

export const hidden_PaginationContent = ({
  itemKey,
  loader = false,
  infiniteScroll = false,
  containerTag = 'div',
}: PaginationContentProps) => {
  const props = {
    itemKey,
    loader,
    infiniteScroll,
    containerTag,
  };
  return (
    <Pagination items={paginationData}>
      <PaginationContent {...props} component={Component} />
    </Pagination>
  );
};

export const hidden_PaginationControls = ({
  autoHide = true,
  breakLabel = true,
  directionLinks = false,
  marginPages = 2,
  pageRange = 5,
  showPaginationText = false,
}: PaginationControlsProps) => {
  const props = {
    autoHide,
    breakLabel,
    directionLinks,
    marginPages,
    pageRange,
    showPaginationText,
  };
  return (
    <Pagination items={paginationData}>
      <PaginationControls {...props} />
    </Pagination>
  );
};

export const hidden_AvResourcePagination = (props: AvResourcePaginationProps<any[]>) => (
  <AvResourcePagination {...props} />
);

export const hidden_RsPagination = (props: RsPaginationProps) => <RsPagination {...props} />;

export const Props: Story = () => (
  <>
    <h4>Availity Props</h4>
    <h5>Pagination</h5>
    <ArgsTable of={hidden_Pagination} />

    <h5>PaginationContent</h5>
    <ArgsTable of={hidden_PaginationContent} />

    <h5>PaginationControls</h5>
    <ArgsTable of={hidden_PaginationControls} />

    <h5>AvResourcePagination</h5>
    <ArgsTable of={hidden_AvResourcePagination} />

    <h4>Reactstrap Pagination</h4>
    <h5>Pagination</h5>
    <div className="argstable-remove-default">
      <ArgsTable of={hidden_RsPagination} />
    </div>
  </>
);
