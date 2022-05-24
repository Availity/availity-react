import React, { useMemo } from 'react';
import { Button } from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import type { Props as InfiniteScrollProps } from 'react-infinite-scroll-component';
import BlockUI from 'react-block-ui';
import type { BlockUiProps } from 'react-block-ui';
import isFunction from 'lodash/isFunction';
import 'react-block-ui/style.css';

import { usePagination } from './Pagination';

export type PaginationContentProps = {
  component: React.ElementType;
  children?: React.ReactNode;
  containerProps?: BlockUiProps;
  loadingMessage?: string;
  itemKey: string;
  loader?: boolean;
  infiniteScroll?: boolean;
  infiniteScrollProps?: InfiniteScrollProps;
  containerTag?: React.ElementType;
};

const PaginationContent = <TItem extends Record<string, unknown>>({
  component: Component,
  loadingMessage,
  itemKey,
  loader = false,
  containerTag = 'div',
  containerProps = {},
  infiniteScroll = false,
  infiniteScrollProps,
  children,
  ...rest
}: PaginationContentProps): JSX.Element => {
  const { page, currentPage, setPage, allPages, hasMore, loading, lower, ref, setDoFocusRefOnPageChange } =
    usePagination<TItem>();

  const _children = useMemo(() => {
    let items;
    if (infiniteScroll) {
      const indexOfItemToReference = lower - 1;
      items =
        allPages &&
        allPages.map((value, index) => {
          if (!value[itemKey]) {
            // eslint-disable-next-line no-console
            console.warn("Warning a Pagination Item doesn't have a key:", value);
          }

          if (indexOfItemToReference === index) {
            const ComponentWithRef = React.forwardRef<HTMLSpanElement>((props, innerRef) => (
              <>
                <span className="sr-only" ref={innerRef} />
                <Component {...props} />
              </>
            ));

            return <ComponentWithRef ref={ref} {...rest} key={(value[itemKey] as string) || index} {...value} />;
          }

          return <Component {...rest} key={value[itemKey] || index} {...value} />;
        });
    } else {
      items =
        page &&
        page.map((value, key) => {
          if (!value[itemKey]) {
            // eslint-disable-next-line no-console
            console.warn("Warning a Pagination Item doesn't have a key:", value);
          }

          return <Component {...rest} key={value[itemKey] || key} {...value} />;
        });
    }

    if (children) {
      return isFunction(children) ? children({ items }) : children;
    }

    return items;
  }, [allPages, children, Component, infiniteScroll, itemKey, lower, page, ref, rest]);

  if (infiniteScroll) {
    return (
      <InfiniteScroll
        loader={loader && <div className="h3">{loadingMessage}</div>}
        {...infiniteScrollProps}
        next={() => {
          setPage(currentPage + 1);
        }}
        hasMore={hasMore}
        dataLength={allPages.length}
      >
        {_children}
        <Button
          data-testid="sr-only-pagination-load-more-btn"
          className="sr-only"
          aria-label="Load More"
          onClick={() => {
            setDoFocusRefOnPageChange(true);
            setPage(currentPage + 1);
          }}
        >
          Load More
        </Button>
      </InfiniteScroll>
    );
  }

  return (
    <BlockUI
      data-testid="pagination-content-con"
      role={containerProps.role || 'list'}
      keepInView
      {...containerProps}
      tag={containerTag}
      blocking={loader && loading}
      message={loadingMessage}
    >
      {_children}
    </BlockUI>
  );
};

export default PaginationContent;
