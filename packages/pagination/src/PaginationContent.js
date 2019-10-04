import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Util, Button } from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import BlockUI from 'react-block-ui';
import 'react-block-ui/style.css';
import { usePagination } from './Pagination';

const PaginationContent = ({
  component: Component,
  loadingMessage,
  itemKey,
  loader,
  containerTag,
  containerProps,
  infiniteScroll,
  infiniteScrollProps,
  ...rest
}) => {
  const {
    page,
    currentPage,
    setPage,
    allPages,
    hasMore,
    loading,
    lower,
    ref,
    setDoFocusRefOnPageChange,
  } = usePagination();

  if (infiniteScroll) {
    const indexOfItemToReference = lower - 1;
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
        {allPages &&
          allPages.map((value, key) => {
            if (!value[itemKey]) {
              // eslint-disable-next-line no-console
              console.warn(
                "Warning a Pagination Item doesn't have a key:",
                value
              );
            }

            if (indexOfItemToReference === key) {
              const ComponentWithRef = React.forwardRef((props, innerRef) => {
                return (
                  <Fragment>
                    <span className="sr-only" ref={innerRef} />
                    <Component {...props} />
                  </Fragment>
                );
              });

              return (
                <ComponentWithRef
                  ref={ref}
                  {...rest}
                  key={value[itemKey] || key}
                  {...value}
                />
              );
            }

            return (
              <Component {...rest} key={value[itemKey] || key} {...value} />
            );
          })}

        <Button
          data-testid="sr-only-pagination-load-more-btn"
          className="sr-only"
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
      {page &&
        page.map((value, key) => {
          if (!value[itemKey]) {
            // eslint-disable-next-line no-console
            console.warn(
              "Warning a Pagination Item doesn't have a key:",
              value
            );
          }

          return <Component {...rest} key={value[itemKey] || key} {...value} />;
        })}
    </BlockUI>
  );
};

PaginationContent.propTypes = {
  component: Util.tagPropType,
  loadingMessage: PropTypes.node,
  itemKey: PropTypes.string,
  loader: PropTypes.bool,
  containerProps: PropTypes.object,
  containerTag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  infiniteScroll: PropTypes.bool,
  infiniteScrollProps: PropTypes.shape({ ...InfiniteScroll.propTypes }),
};

PaginationContent.defaultProps = {
  infiniteScroll: false,
  loader: false,
  containerTag: 'div',
  containerProps: {},
};

export default PaginationContent;
