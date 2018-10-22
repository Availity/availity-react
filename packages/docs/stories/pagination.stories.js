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

function ControlProps() {
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
      10,
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

  output.pagePadding = number('Page Padding', 2, 'Page Values');

  output.unstyled = boolean('Unstyled', false, 'Style');

  output.size = selectV2(
    'Size',
    { Small: 'sm', Normal: '', Large: 'lg' },
    'sm',
    'Style'
  );

  output.align = selectV2(
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

  output.pageButtonsAlign = selectV2(
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

  output.simple = boolean(
    'Simple (just prev/next)',
    PaginationControls.defaultProps.simple,
    'Style'
  );

  output.withSelector = boolean(
    'Use Selector',
    PaginationControls.defaultProps.withSelector,
    'Selector'
  );
  output.optionLabel = text('Item Options Label', 'results', 'Selector');
  output.itemLabel = text('Item Label', 'Items', 'Selector');

  output.onPageChange = () => {};

  return output;
}

storiesOf('Navigation|Pagination', module)
  .addDecorator(withReadme([README]))
  .addDecorator(withKnobs)
  .add('Controls', () => {
    const props = ControlProps();
    props.perPageOptions = [10, 20, 30];
    props.onSelectionChange = (event, value) => {
      console.log(`selection changed: ${value}`);
    };
    return <PaginationControls {...props} />;
  })
  .add('default', () => {
    const props = {
      onPageChange: () => {},
    };

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

    props.hideOnSinglePage = boolean('Hide Controls for one page', false);

    const overrideItemValues = boolean('Define custom page values', false);
    if (overrideItemValues) {
      props.pageCount = number('Total number of pages', 10, { min: 1 });
      props.totalCount = number('Total number of items', 15, { min: 1 });
    }

    props.itemsPerPage = number(
      'Items per page',
      10,
      { min: 1 },
      'Page Values'
    );

    const useItemCountOptions = boolean('Use ItemPerPage Options', false);
    if (useItemCountOptions) {
      props.perPageOptions = [1, 2, 3].map(val => props.itemsPerPage * val);
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
      onPageChange: () => {},
    };

    props.hideOnSinglePage = boolean('Hide Controls for one page', false);
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
