import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

import isFunction from 'lodash/isFunction';
import isEqual from 'lodash/isEqual';

// import classNames from 'classnames';

import { warnOnce } from './utils';

import { PaginationControls } from './PaginationControls';

const propTypes = {
  // style props
  scroll: PropTypes.oneOf(['window', 'list', false]),
  placement: PropTypes.oneOf(['top', 'bottom', 'both']),
  hideOnSinglePage: PropTypes.bool,
  withSelector: PropTypes.bool,
  // animate: PropTypes.bool, // maybe do something cool in the future
  children: PropTypes.func.isRequired,
  loader: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  // state setting props
  page: PropTypes.number,
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
  pageCount: PropTypes.number,
  itemsPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
  onCountChange: PropTypes.func,
  loading: PropTypes.bool,
};

const defaultProps = {
  itemsPerPage: 10,
  placement: 'both',
  scroll: 'list',
  // animate: true,
};

class Pagination extends Component {
  /*
    state parts:
    loading: true if async items getting in process
    items: store the current items to render

    pageControlled: True if props used to control value - following values can have
    page: current page, kept in sync with props if controlled

    itemsPerPage: how many items are on the page, controlled only relevant if there are perPageOptions provided as well
    */

  state = {
    loading: false,
    items: false,
    page: 1,
  };
  scrollRef = React.createRef();

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
    if (!this.state.pageControlled && !this.state.page) {
      this.goToPage(1);
    } else if (!this.state.items) {
      this.getItems();
    }
  }

  itemsLastGotWith = {};
  async getItems() {
    const { page, itemsPerPage } = this.state;
    const itemsLastGotWith = { page, itemsPerPage };
    if (
      !page ||
      !itemsPerPage ||
      (this.state.loading && isEqual(this.itemsLastGotWith, itemsLastGotWith))
    ) {
      return;
    }
    this.setState({ loading: true });
    this.itemsLastGotWith = itemsLastGotWith;
    const newState = {
      items: false,
      loading: false,
    };
    if (isFunction(this.props.items)) {
      const response = await this.props.items(page, itemsPerPage);
      if (Array.isArray(response)) {
        newState.items = response;
      } else {
        Object.assign(newState, response);
      }
    } else {
      newState.items = this.props.items.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
      );
      newState.pageCount = Math.ceil(this.props.items / itemsPerPage);
      newState.totalCount = this.props.items.length;
    }

    this.setState(newState);
  }

  goToPage = page => {
    if (this.props.onPageChange) this.props.onPageChange(page);
    if (!this.state.pageControlled) {
      this.setState(prevState => {
        if (page > 0 && (!prevState.pageCount || page <= prevState.pageCount)) {
          return {
            page,
            items: false,
          };
        }
      });
    }
  };

  onCountChange = itemsPerPage => {
    if (this.props.onCountChange) this.props.onCountChange(itemsPerPage);
    if (!this.state.pageControlled && this.state.page !== 1) {
      this.goToPage(1);
    }
    this.setState({
      itemsPerPage,
      items: false,
    });
  };

  render() {
    const {
      placement,
      hideOnSinglePage,
      children,
      loader,
      page: propPage,
      pageCount: propsPageCount,
      totalCount: propsTotalCount,
      itemsPerPage: propsItemsPerPage,
      loading: propsLoading,
      onPageChange: propsOnPageChange,
      onCountChange: propsOnCountChange,
      ...controlProps
    } = this.props;

    const {
      page: statePage,
      items,
      itemsPerPage,
      pageCount: statePageCount,
      totalCount: stateTotalCount,
      loading: stateLoading,
    } = this.state;

    const page = statePage || 1;

    const pageCount = propsPageCount || statePageCount;

    const controls = (!hideOnSinglePage || pageCount > 1) && (
      <PaginationControls
        page={page}
        pageCount={pageCount}
        itemsPerPage={itemsPerPage}
        totalCount={propsTotalCount || stateTotalCount}
        className="my-3"
        onPageChange={this.goToPage}
        onCountChange={this.onCountChange}
        {...controlProps}
      />
    );

    const topControls = placement !== 'bottom' && controls;
    const bottomControls = placement !== 'top' && controls;

    return (
      <React.Fragment>
        {topControls}
        <BlockUi
          keepInView
          blocking={loader && (propsLoading || stateLoading)}
          message={typeof loader === 'string' ? loader : undefined}
        >
          {children(items || [], this.state)}
        </BlockUi>
        {bottomControls}
      </React.Fragment>
    );
  }
}

Pagination.getDerivedStateFromProps = (nextProps, prevState) => {
  let changed = false;
  const state = {};

  // page controlled values
  state.pageControlled = typeof nextProps.page !== 'undefined';
  if (state.pageControlled) {
    // if controlled, check if onPageChange provided
    if (isFunction(nextProps.onPageChange)) {
      state.page = nextProps.page;
    } else {
      state.pageControlled = false;
      warnOnce(
        'You provided `page` to Pagination but did not provide a function to handle page changes; `page` is being ignored'
      );
    }
  }
  // check if page controlled changed
  if (typeof prevState.pageControlled === 'undefined') {
    changed = true;
  } else if (prevState.pageControlled !== state.pageControlled) {
    changed = true;
    warnOnce(
      `You have changed Pagination from a${
        state.pageControlled ? 'n un' : ' '
      }controlled component to a${
        !state.pageControlled ? 'n un' : ' '
      }controlled component; bad things may happen`
    );
  }

  // if itemsPerPage changes from props update value
  if (prevState.propsItemsPerPage !== nextProps.itemsPerPage) {
    state.propsItemsPerPage = nextProps.itemsPerPage;
    state.itemsPerPage = nextProps.itemsPerPage;
    changed = true;
    // set page back to 1 if uncontrolled
    if (!state.pageControlled && prevState.page !== 1) {
      state.page = false;
    }
  }

  if (!isEqual(prevState.allItems, nextProps.items)) {
    state.allItems = nextProps.items;
    state.items = false;
    changed = true;
    if (!state.pageControlled && prevState.page !== 1) {
      state.page = false;
    }
  }

  if (typeof state.page !== 'undefined' && state.page !== prevState.page) {
    changed = true;
    state.items = false;
  }

  if (changed) {
    return state;
  }
  return null;
};

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;
