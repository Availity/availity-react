import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

import isFunction from 'lodash/isFunction';
import isEqual from 'lodash/isEqual';

const propTypes = {
  // style props
  scroll: PropTypes.oneOf(['window', 'list', false]),
  // animate: PropTypes.bool, // maybe do something cool in the future
  children: PropTypes.func.isRequired,
  loader: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  // state setting props
  page: PropTypes.number,
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
  parameters: PropTypes.object,
  itemsPerPage: PropTypes.number,
  loading: PropTypes.bool,
};

const defaultProps = {
  itemsPerPage: 10,
  scroll: 'list',
  // animate: true,
};

class Pagination extends Component {
  /*
    state parts:
    loading: true if async items getting in process
    items: store the current items to render
    */

  state = {
    loading: false,
    items: false,
  };
  scrollRef = React.createRef();

  getItemProps = ({ page, items, parameters, itemsPerPage } = this.props) => ({
    page,
    items,
    parameters,
    itemsPerPage,
  });

  componentDidUpdate(prevProps) {
    if (this.props.scroll && this.props.page !== prevProps.page) {
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

    const itemProps = this.getItemProps();
    const prevItemProps = this.getItemProps(prevProps);
    if (!isEqual(itemProps, prevItemProps)) {
      this.updateItems();
    }
  }

  lastItemProps = {};

  async updateItems() {
    // destructing here instead of this.getItemProps to get linter to recognize that they are used
    const { page, items, parameters, itemsPerPage } = this.props;
    const itemProps = { page, items, parameters, itemsPerPage };
    if (isEqual(itemProps, this.lastItemProps)) {
      return;
    }

    this.lastItemProps = itemProps;
    this.setState({ loading: true });
    const newState = {
      items: false,
      loading: false,
    };
    if (isFunction(items)) {
      const itemArgs = { page, parameters, itemsPerPage };
      const response = await items(itemArgs);
      if (!isEqual(itemProps, this.lastItemProps)) {
        return;
      }
      if (Array.isArray(response)) {
        newState.items = response;
      } else {
        Object.assign(newState, response);
      }
    } else {
      newState.items = items.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
      );
    }
    this.setState(newState);
  }

  render() {
    const { children, loader, loading: propsLoading } = this.props;

    const { items, loading: stateLoading } = this.state;

    return (
      <BlockUi
        keepInView
        blocking={loader && (propsLoading || stateLoading)}
        message={typeof loader === 'string' ? loader : undefined}
      >
        {children(items || [], this.state)}
      </BlockUi>
    );
  }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;
