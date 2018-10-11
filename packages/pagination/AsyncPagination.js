import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from './Pagination';
import { shallowIsDifferent, warnOnce } from './utils';

const propTypes = {
  itemsPerPage: PropTypes.number,
  parameters: PropTypes.object,
  requestConfig: PropTypes.object,
  resource: PropTypes.shape({
    postGet: PropTypes.func,
    getResult: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  }).isRequired,
  getResult: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

const defaultProps = {
  itemsPerPage: 10,
};

class AsyncPagination extends Component {
  state = {
    controlled: false,
    page: 1,
  };
  lastRequest = 0;

  async loadPage() {
    this.setState({ loading: true });

    try {
      const params = {
        limit: this.props.itemsPerPage,
        offset: (this.state.page - 1) * this.props.itemsPerPage,
        ...this.props.parameters,
      };
      this.lastRequest += 1;
      const resp = await this.props.resource.postGet(params, {
        ...this.props.requestConfig,
        requestId: this.lastRequest,
      });

      if (resp.config.requestId !== this.lastRequest) return;
      const getResult = this.props.resource.getResult || this.props.getResult;

      const options =
        (typeof getResult === 'function'
          ? getResult.call(this.props.resource, resp.data)
          : resp.data[getResult]) || resp.data;

      if (!Array.isArray(options)) {
        throw new Error(
          `Expected data to be an array but got \`${typeof options}\`. Use the \`getResult\` prop to specify how to get the data from the API response.`
        );
      }

      this.setState({
        options,
        loading: false,
        error: undefined,
        totalCount: resp.data.totalCount,
      });
    } catch (e) {
      this.setState({ error: e });
    }
  }

  componentDidMount() {
    this.loadPage();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      this.loadPage();
    } else if (
      this.props.resource !== prevProps.resource ||
      this.props.itemsPerPage !== prevProps.itemsPerPage ||
      shallowIsDifferent(this.props.parameters, prevProps.parameters) ||
      shallowIsDifferent(this.props.requestConfig, prevProps.requestConfig)
    ) {
      this.goToPage(1);
      if (this.state.page === 1) {
        this.loadPage();
      }
    }
  }

  getLastPage() {
    return this.state.totalCount
      ? Math.ceil(this.state.totalCount / this.props.itemsPerPage)
      : null;
  }

  goToPage = page => {
    if (this.props.onPageChange) this.props.onPageChange(page);
    if (!this.state.controlled) {
      this.setState(prevState => {
        const lastPage = this.getLastPage(prevState);
        return (!lastPage || page <= lastPage) && page > 0 ? { page } : null;
      });
    }
  };

  render() {
    const {
      parameters,
      requestConfig,
      resource,
      getResult,
      ...paginationProps
    } = this.props;

    const { controlled, ...stateProps } = this.state;

    return (
      <Pagination
        {...paginationProps}
        pageOnlyOptions
        {...stateProps}
        onPageChange={this.goToPage}
      />
    );
  }
}

AsyncPagination.getDerivedStateFromProps = (nextProps, prevState) => {
  const state = {};
  if (!prevState.controlled && typeof nextProps.page !== 'undefined') {
    if (typeof nextProps.onPageChange === 'function') {
      state.controlled = true;
      state.page = nextProps.page;
      warnOnce(
        'You have changed AsyncPagination from an uncontrolled component to a controlled component; bad things may happen'
      );
      return state;
    }
    warnOnce(
      'You provided `page` to AsyncPagination but did not provide a function to handle page changes; `page` is being ignored'
    );
  } else if (
    prevState.controlled &&
    (typeof nextProps.page === 'undefined' ||
      typeof nextProps.onPageChange !== 'function')
  ) {
    state.controlled = false;
    warnOnce(
      'You have changed AsyncPagination from an controlled component to a uncontrolled component; bad things may happen'
    );
    return state;
  } else if (prevState.controlled && nextProps.page !== prevState.page) {
    state.page = nextProps.page;
    return state;
  }
  return null;
};

AsyncPagination.propTypes = propTypes;
AsyncPagination.defaultProps = defaultProps;

export default AsyncPagination;
