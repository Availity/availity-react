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

import Pagination, {
  AvResourcePagination,
  PaginationControls,
} from '@availity/pagination';
import { defaultButtonText } from '@availity/pagination/PaginationControls/Pages';
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

storiesOf('Navigation|Pagination', module)
  .addDecorator(withReadme([README]))
  .addDecorator(withKnobs)
  .add('Controls', () => {
    const props = {
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
      props.pageCount = number(
        'Total number of pages',
        10,
        { min: 1 },
        'Page Values'
      );
      maxPages = props.pageCount;
    } else {
      props.itemsPerPage = number(
        'Items per page',
        10,
        { min: 1 },
        'Page Values'
      );
      props.totalCount = number(
        'Total number of items',
        100,
        { min: 1 },
        'Page Values'
      );
      maxPages = Math.ceil(props.totalCount / props.itemsPerPage);
    }
    props.page = number(
      'Page',
      1,
      { min: 1, max: maxPages, step: 1 },
      'Page Values'
    );

    props.pagePadding = number('Page Padding', 2, 'Page Values');

    props.unstyled = boolean('Unstyled', false, 'Style');

    props.size = selectV2(
      'Size',
      { Small: 'sm', Normal: '', Large: 'lg' },
      'sm',
      'Style'
    );

    props.align = selectV2(
      'Align',
      {
        Start: 'start',
        Center: 'center',
        End: 'end',
        Between: 'between',
      },
      PaginationControls.defaultProps.align,
      'Style'
    );

    props.pageButtonsAlign = selectV2(
      'Align Pagebuttons',
      {
        Start: 'start',
        Center: 'center',
        End: 'end',
        'Between (goes well with "simple")': 'between',
      },
      PaginationControls.defaultProps.align,
      'Style'
    );

    props.simple = boolean(
      'Simple (just prev/next)',
      PaginationControls.defaultProps.simple,
      'Style'
    );

    props.withSelector = boolean(
      'Use Selector',
      PaginationControls.defaultProps.withSelector,
      'Selector'
    );
    props.optionLabel = text('Item Options Label', 'results', 'Selector');
    props.itemLabel = text('Item Label', 'Items', 'Selector');

    props.onPageChange = () => {};
    props.perPageOptions = [10, 20, 30];
    props.onSelectionChange = (event, value) => {
      console.log(`selection changed: ${value}`);
    };
    return <PaginationControls {...props} />;
  })
  .add('default', () => {
    const props = {};
    const items = array('Items', [
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

    props.page = number('Page', 1, { min: 1, step: 1 }, 'Page Values');

    props.itemsPerPage = number(
      'Items per page',
      10,
      { min: 1 },
      'Page Values'
    );

    const loaderBool = boolean('Block UI while loading', true, 'loader');
    const loaderText = loaderBool && text('Loader message', '', 'loader');

    props.loader = loaderText || loaderBool;
    props.loading = boolean('Block UI loading', false, 'loader');

    const useAsync = boolean('use Async items', false);
    if (!useAsync) {
      props.items = items;
    } else {
      props.items = (page, itemsPerPage) =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve({
              items: items.slice(
                (page - 1) * itemsPerPage,
                page * itemsPerPage
              ),
              pageCount: Math.ceil(items / itemsPerPage),
              totalCount: items.length,
            });
          }, 1000);
        });
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
  .add('AvResourcePagination', () => {
    const props = {
      resource: mockResponse,
      getResult: 'notifications',
    };

    props.page = number('Page', 1, { min: 1, step: 1 }, 'Page Values');

    props.itemsPerPage = number(
      'Items per page',
      10,
      { min: 1 },
      'Page Values'
    );

    const loaderBool = boolean('Block UI while loading', true, 'loader');
    const loaderText = loaderBool && text('Loader message', '', 'loader');

    props.loader = loaderText || loaderBool;
    props.loading = boolean('Block UI loading', false, 'loader');

    return (
      <AvResourcePagination {...props}>
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
      </AvResourcePagination>
    );
  });
