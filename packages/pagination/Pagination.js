import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import classNames from 'classnames';

import { warnOnce } from './utils';

import { Pager } from './Pager';

const propTypes = {
  page: PropTypes.number,
  // animate: PropTypes.bool, // maybe do something cool in the future
  scroll: PropTypes.oneOf(['window', 'list', false]),
  children: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
  placement: PropTypes.oneOf(['top', 'bottom', 'both']),
  hideOnSinglePage: PropTypes.bool,
  options: PropTypes.array,
  pageOnlyOptions: PropTypes.bool,
  pageCount: PropTypes.number,
};

const defaultProps = {
  itemsPerPage: 10,
  placement: 'both',
  scroll: 'list',
  // animate: true,
};

class Pagination extends Component {
  state = {
    controlled: false,
    page: 1,
  };

  constructor(props) {
    super(props);
    if (typeof props.page !== 'undefined') {
      if (typeof props.onPageChange === 'function') {
        this.state.controlled = true;
        this.state.page = props.page;
      } else {
        warnOnce(
          'You provided `page` to Pagination but did not provide a function to handle page changes; `page` is being ignored'
        );
      }
    }
    this.lastRequest = 0;
    this.scrollRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.scroll && this.state.page !== prevState.page) {
      if (this.props.scroll === 'window') {
        window.document.body.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      } else if (this.scrollRef.current) {
        this.scrollRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }
    }
  }

  getPageCount() {
    if (this.props.pageOnlyOptions) {
      return this.props.pageCount;
    }
    return Math.ceil(this.props.options.length / this.props.itemsPerPage);
  }

  goToPage = page => {
    if (this.props.onPageChange) this.props.onPageChange(page);
    if (!this.state.controlled) {
      this.setState(prevState => {
        const lastPage = this.getPageCount(prevState);
        if (page > 0 && (!lastPage || page <= lastPage)) {
          return {
            page,
          };
        }
      });
    }
  };

  render() {
    const {
      page,
      scroll,
      children,
      itemsPerPage,
      onPageChange,
      placement,
      hideOnSinglePage,
      options,
      pageOnlyOptions,
      ...pagerProps
    } = this.props;

    const pageCount = this.getPageCount();
    const showPagination = !hideOnSinglePage || pageCount > 0;

    const usePage = this.state.page;

    let topPager = false;
    let bottomPager = false;
    if (showPagination) {
      const pager = (
        <Pager
          {...pagerProps}
          page={usePage}
          pageCount={pageCount}
          onPageChange={this.goToPage}
          className="my-3"
        />
      );
      if (placement !== 'bottom') {
        topPager = <div ref={this.scrollRef}>{pager}</div>;
      }
      if (placement !== 'top') {
        bottomPager = pager;
      }
    }

    const items = pageOnlyOptions
      ? options
      : options.slice((usePage - 1) * itemsPerPage, usePage * itemsPerPage);

    return (
      <React.Fragment>
        {topPager}
        {children(items || [], this.state)}
        {bottomPager}
      </React.Fragment>
    );
  }
}

Pagination.getDerivedStateFromProps = (nextProps, prevState) => {
  const state = {};
  if (!prevState.controlled && typeof nextProps.page !== 'undefined') {
    if (typeof nextProps.onPageChange === 'function') {
      state.controlled = true;
      state.page = nextProps.page;
      warnOnce(
        'You have changed Pagination from an uncontrolled component to a controlled component; bad things may happen'
      );
      return state;
    }
    warnOnce(
      'You provided `page` to Pagination but did not provide a function to handle page changes; `page` is being ignored'
    );
  } else if (
    prevState.controlled &&
    (typeof nextProps.page === 'undefined' ||
      typeof nextProps.onPageChange !== 'function')
  ) {
    state.controlled = false;
    warnOnce(
      'You have changed Pagination from an controlled component to a uncontrolled component; bad things may happen'
    );
    return state;
  } else if (prevState.controlled && nextProps.page !== prevState.page) {
    state.page = nextProps.page;
    return state;
  }
  return null;
};

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;
