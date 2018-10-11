import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import {
  withKnobs,
  text,
  boolean,
  number,
  array,
  selectV2,
} from '@storybook/addon-knobs/react';
import { avNotificationApi } from '@availity/api-axios';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

import Pagination, { Pager, AsyncPagination } from '@availity/pagination';
import { defaultButtonText } from '@availity/pagination/Pager/Component';
import README from '@availity/pagination/README.md';
import paginationData from './data/pagination.json';

const mockResponse = {
  postGet(params = {}, config = {}) {
    const { offset = 0, limit = 50 } = params;
    const notifications = paginationData.slice(offset, offset + limit);
    return Promise.resolve({
      config,
      data: {
        totalCount: paginationData.length,
        count: notifications.length,
        offset,
        limit,
        notifications,
      },
    });
  },
};

function getButtonValue(title, key) {
  const buttonBool = boolean(title, true, 'Buttons');
  const customText =
    buttonBool && boolean(`${title} Custom Text`, false, 'Buttons');
  const buttonText =
    customText && text(`${title} Text`, defaultButtonText[key], 'Buttons');
  return buttonText || buttonBool;
}

function PagerProps() {
  const output = {
    firstBtn: getButtonValue('First Button', 'firstBtn'),
    prevBtn: getButtonValue('Previous Button', 'prevBtn'),
    nextBtn: getButtonValue('Next Button', 'nextBtn'),
    lastBtn: getButtonValue('Last Button', 'lastBtn'),
  };

  const usePageCount = selectV2(
    'Pages Type',
    { pageCount: 'page', itemCount: 'item' },
    'page',
    'Page Values'
  );
  let maxPages = 0;
  if (usePageCount === 'page') {
    output.pageCount = number(
      'Total number of pages',
      10,
      { min: 1 },
      'Page Values'
    );
    maxPages = output.pageCount;
  } else {
    output.itemsPerPage = number(
      'Items per page',
      Pager.defaultProps.itemsPerPage,
      { min: 1 },
      'Page Values'
    );
    output.totalCount = number(
      'Total number of items',
      100,
      { min: 1 },
      'Page Values'
    );
    maxPages = Math.ceil(output.totalCount / output.itemsPerPage);
  }
  output.page = number(
    'Page',
    1,
    { min: 1, max: maxPages, step: 1 },
    'Page Values'
  );

  output.pagePadding = number(
    'Page Padding',
    Pager.defaultProps.pagePadding,
    'Page Values'
  );

  output.unstyled = boolean('Unstyled', Pager.defaultProps.unstyled, 'Style');

  output.size = selectV2(
    'Size',
    { Small: 'sm', Normal: '', Large: 'lg' },
    Pager.defaultProps.size,
    'Style'
  );

  output.align = selectV2(
    'Align',
    {
      Start: 'start',
      Center: 'center',
      End: 'end',
      'Between (goes well with "simple")': 'between',
    },
    Pager.defaultProps.align,
    'Style'
  );

  output.simple = boolean(
    'Simple (just prev/next)',
    Pager.defaultProps.simple,
    'Style'
  );

  output.onPageChange = () => {};

  return output;
}

storiesOf('Navigation|Pagination', module)
  .addDecorator(withReadme([README]))
  .addDecorator(withKnobs)
  .add('Pager', () => {
    const props = PagerProps(true);
    return <Pager {...props} />;
  })
  .add('default', () => {
    const props = {
      onPageChange: () => {},
    };

    props.options = array('Options', [
      'red',
      'blue',
      'green',
      'yellow',
      'purple',
      'yellow',
      'lime',
      'maroon',
      'dog',
      'cat',
      'fish',
      'lizard',
      'horse',
      'dragon',
      'charmander',
    ]);

    props.hideOnSinglePage = boolean('Hide Controls for one page', false);

    props.pageOnlyOptions = boolean('Page Only Options', false);
    if (props.pageOnlyOptions) {
      props.pageCount = number('Total number of pages', 10, { min: 1 });
    } else {
      props.itemsPerPage = number(
        'Items per page',
        Pager.defaultProps.itemsPerPage,
        { min: 1 },
        'Page Values'
      );
    }

    const loaderBool = boolean('Block UI while loading', true, 'loader');
    const loaderText = loaderBool && text('Loader message', '', 'loader');

    props.loader = loaderText || loaderBool;
    props.loading = boolean('Block UI loading', false, 'loader');

    const controlled = boolean('Controlled', false);
    if (controlled) {
      const maxPages = props.pageOnlyOptions
        ? props.pageCount
        : Math.ceil(props.options.length / props.itemsPerPage);
      props.page = number(
        'Page',
        1,
        { min: 1, max: maxPages, step: 1 },
        'Page Values'
      );
    }

    return (
      <Pagination {...props}>
        {items => {
          const keys = [];
          items.forEach(val => {
            let key = val;
            let index = 0;
            while (keys.indexOf(key) >= 0) {
              index += 1;
              key = `${val}${index}`;
            }
            keys.push(key);
          });

          return (
            <ul>
              {items.map((item, index) => (
                <li key={keys[index]}>{item}</li>
              ))}
            </ul>
          );
        }}
      </Pagination>
    );
  })
  .add('async', () => {
    const props = {
      resource: mockResponse,
      getResult: 'notifications',
      onPageChange: () => {},
    };

    props.hideOnSinglePage = boolean('Hide Controls for one page', false);
    props.itemsPerPage = number(
      'Items per page',
      Pager.defaultProps.itemsPerPage,
      { min: 1 },
      'Page Values'
    );

    const controlled = boolean('Controlled', false);
    if (controlled) {
      const maxPages = props.pageOnlyOptions
        ? props.pageCount
        : Math.ceil(paginationData.length / props.itemsPerPage);
      props.page = number(
        'Page',
        1,
        { min: 1, max: maxPages, step: 1 },
        'Page Values'
      );
    }
    const loaderBool = boolean('Block UI while loading', true, 'loader');
    const loaderText = loaderBool && text('Loader message', '', 'loader');

    props.loader = loaderText || loaderBool;
    props.loading = boolean('Block UI loading', false, 'loader');

    return (
      <AsyncPagination {...props}>
        {items =>
          items.map(item => (
            <Card key={item.id}>
              <CardBody>
                <CardTitle>
                  {item.name.first} {item.name.last}
                </CardTitle>
                <CardSubtitle>
                  Registered on {item.registered.split('T')[0]}
                </CardSubtitle>
                <CardText className="mt-2" tag="div">
                  <div className="label">Address</div>
                  {item.address.street} <br />
                  {item.address.city} {item.address.state}{' '}
                  {item.address.postalCode}
                </CardText>
              </CardBody>
            </Card>
          ))
        }
      </AsyncPagination>
    );
  });
