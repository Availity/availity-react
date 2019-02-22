import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { Container } from 'reactstrap';
import { withKnobs } from '@storybook/addon-knobs/react';
import PropTypes from 'prop-types';
import {
  Pagination,
  PaginationContent,
  PaginationControls,
} from '@availity/pagination';
import README from '@availity/payer-logo/README.md';

const items = [
  {
    value: 1,
  },
  {
    value: 2,
  },
  {
    value: 3,
  },
  {
    value: 4,
  },
  {
    value: 5,
  },
  {
    value: 6,
  },
  {
    value: 7,
  },
  {
    value: 8,
  },
  {
    value: 9,
  },
  {
    value: 10,
  },
  {
    value: 11,
  },
];

const Component = ({ value }) => <li>{value}</li>;
Component.propTypes = {
  value: PropTypes.number,
};

storiesOf('Components|Pagination', module)
  .addDecorator(withReadme([README]))
  .addDecorator(withKnobs)
  .add('default', () => (
    <Container>
      <Pagination items={items}>
        <PaginationContent component={Component} />
        <PaginationControls directionLinks />
      </Pagination>
    </Container>
  ));
