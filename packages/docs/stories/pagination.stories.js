import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import {
  withKnobs,
  text,
  boolean,
  number,
  selectV2,
} from '@storybook/addon-knobs/react';
import { avNotificationApi } from '@availity/api-axios';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

import Pagination, { AsyncPagination } from '@availity/pagination';
import README from '@availity/pagination/README.md';
// import './mock-requests';

storiesOf('Navigation|Pagination', module)
  .addDecorator(withReadme([README]))
  .addDecorator(withKnobs)
  .add('default', () => {
    const prevBtn =
      boolean('Previous Button', true, 'prevBtn') &&
      text('Previous Button Text', Pagination.defaultProps.prevBtn, 'prevBtn');
    const nextBtn =
      boolean('Next Button', true, 'nextBtn') &&
      text('Next Button Text', Pagination.defaultProps.nextBtn, 'nextBtn');
    const itemsPerPage = number(
      'Items per page',
      Pagination.defaultProps.itemsPerPage
    );
    const totalCount = number('Total number of items', 100);
    const pageRange = {
      min: 1,
      max: Math.ceil(totalCount / itemsPerPage),
      step: 1,
    };
    return (
      <Pagination
        unstyled={boolean('Unstyled', Pagination.defaultProps.unstyled)}
        itemsPerPage={itemsPerPage}
        totalCount={totalCount}
        prevBtn={prevBtn}
        nextBtn={nextBtn}
        size={selectV2(
          'Size',
          { Small: 'sm', Normal: '', Large: 'lg' },
          Pagination.defaultProps.size
        )}
        align={selectV2(
          'Align',
          {
            Start: 'start',
            Center: 'center',
            End: 'end',
            'Between (goes well with "simple")': 'between',
          },
          Pagination.defaultProps.align
        )}
        simple={boolean(
          'Simple (just prev/next)',
          Pagination.defaultProps.simple
        )}
        pagePadding={number(
          'Page Padding',
          Pagination.defaultProps.pagePadding
        )}
        page={number('Page', 1, pageRange)}
        onPageChange={() => {}}
      />
    );
  })
  .add('with uncontrolled async', () => {
    const loader =
      boolean('Block UI while loading', true, 'loader') &&
      text('Loader message', '', 'loader');
    const prevBtn =
      boolean('Previous Button', true, 'prevBtn') &&
      text('Previous Button Text', Pagination.defaultProps.prevBtn, 'prevBtn');
    const nextBtn =
      boolean('Next Button', true, 'nextBtn') &&
      text('Next Button Text', Pagination.defaultProps.nextBtn, 'nextBtn');
    return (
      <AsyncPagination
        resource={avNotificationApi}
        getResult="notifications"
        unstyled={boolean('Unstyled', Pagination.defaultProps.unstyled)}
        itemsPerPage={number(
          'Items per page',
          AsyncPagination.defaultProps.itemsPerPage
        )}
        scroll={selectV2(
          'Scroll to top on page change',
          { None: false, List: 'list', Window: 'window' },
          AsyncPagination.defaultProps.scroll
        )}
        loader={loader === '' ? true : loader}
        placement={selectV2(
          'Placement',
          { Top: 'top', Bottom: 'bottom', Both: 'both' },
          AsyncPagination.defaultProps.placement
        )}
        prevBtn={prevBtn}
        nextBtn={nextBtn}
        size={selectV2(
          'Size',
          { Small: 'sm', Normal: '', Large: 'lg' },
          Pagination.defaultProps.size
        )}
        align={selectV2(
          'Align',
          {
            Start: 'start',
            Center: 'center',
            End: 'end',
            'Between (goes well with "simple")': 'between',
          },
          Pagination.defaultProps.align
        )}
        simple={boolean(
          'Simple (just prev/next)',
          Pagination.defaultProps.simple
        )}
        pagePadding={number(
          'Page Padding',
          Pagination.defaultProps.pagePadding
        )}
      >
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
                <CardText className="mt-2">
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
  })
  .add('with controlled async', () => {
    const loader =
      boolean('Block UI while loading', true, 'loader') &&
      text('Loader message', '', 'loader');
    const prevBtn =
      boolean('Previous Button', true, 'prevBtn') &&
      text(
        'Previous Button Text',
        AsyncPagination.defaultProps.prevBtn,
        'prevBtn'
      );
    const nextBtn =
      boolean('Next Button', true, 'nextBtn') &&
      text('Next Button Text', AsyncPagination.defaultProps.nextBtn, 'nextBtn');
    const itemsPerPage = number(
      'Items per page',
      AsyncPagination.defaultProps.itemsPerPage
    );
    const pageRange = {
      min: 1,
      max: Math.ceil(100 / itemsPerPage),
      step: 1,
    };
    return (
      <div>
        <p>
          Use the Knobs to the right to control the page display. Only that knob
          controls the page (the pagination buttons do not in this example since
          it is &quot;controlled&quot;)
        </p>
        <AsyncPagination
          resource={avNotificationApi}
          getResult="notifications"
          unstyled={boolean('Unstyled', AsyncPagination.defaultProps.unstyled)}
          itemsPerPage={itemsPerPage}
          scroll={selectV2(
            'Scroll to top on page change',
            { None: false, List: 'list', Window: 'window' },
            AsyncPagination.defaultProps.scroll
          )}
          loader={loader === '' ? true : loader}
          placement={selectV2(
            'Placement',
            { Top: 'top', Bottom: 'bottom', Both: 'both' },
            AsyncPagination.defaultProps.placement
          )}
          prevBtn={prevBtn}
          nextBtn={nextBtn}
          size={selectV2(
            'Size',
            { Small: 'sm', Normal: '', Large: 'lg' },
            AsyncPagination.defaultProps.size
          )}
          align={selectV2(
            'Align',
            {
              Start: 'start',
              Center: 'center',
              End: 'end',
              'Between (goes well with "simple")': 'between',
            },
            AsyncPagination.defaultProps.align
          )}
          simple={boolean(
            'Simple (just prev/next)',
            AsyncPagination.defaultProps.simple
          )}
          pagePadding={number(
            'Page Padding',
            Pagination.defaultProps.pagePadding
          )}
          page={number('Page', 1, pageRange)}
          onPageChange={() => {}}
        >
          {items =>
            items.map(item => (
              <div key={item.id}>
                {item.name.first} {item.name.last}
              </div>
            ))
          }
        </AsyncPagination>
      </div>
    );
  });
