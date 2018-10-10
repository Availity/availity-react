import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import Pagination from './Pagination';

const warned = {};

function warnOnce(message) {
  if (!warned[message]) {
    // eslint-disable-next-line no-console
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error(message); // eslint-disable-line no-console
    }
    warned[message] = true;
  }
}

function shallowIsDifferent(a, b) {
  for (const i in a) if (!(i in b)) return true; // eslint-disable-line no-restricted-syntax
  for (const i in b) if (a[i] !== b[i]) return true; // eslint-disable-line no-restricted-syntax
  return false;
}

const propTypes = {
  page: PropTypes.number,
  pagePadding: PropTypes.number,
  // animate: PropTypes.bool, // maybe do something cool in the future
  scroll: PropTypes.oneOf(['window', 'list', false]),
  loader: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  children: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
  parameters: PropTypes.object,
  placement: PropTypes.oneOf(['top', 'bottom', 'both']),
  prevBtn: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([false])]),
  nextBtn: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([false])]),
  size: PropTypes.string,
  unstyled: PropTypes.bool,
  align: PropTypes.oneOf(['start', 'center', 'end', 'between']),
  simple: PropTypes.bool,
  requestConfig: PropTypes.object,
  resource: PropTypes.shape({
    postGet: PropTypes.func,
    getResult: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  }).isRequired,
  getResult: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

const defaultProps = {
  itemsPerPage: 10,
  placement: 'both',
  scroll: 'list',
  loader: true,
  // animate: true,
};

class AsyncPagination extends Component {
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
          'You provided `page` to AsyncPagination but did not provide a function to handle page changes; `page` is being ignored'
        );
      }
    }
    this.lastRequest = 0;
    this.scrollRef = React.createRef();
  }

  async loadPage() {
    this.setState({ loading: true }, () => {
      if (this.props.scroll) {
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
    });

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

      const items =
        (typeof getResult === 'function'
          ? getResult.call(this.props.resource, resp.data)
          : resp.data[getResult]) || resp.data;

      if (!Array.isArray(items)) {
        throw new Error(
          `Expected data to be an array but got \`${typeof items}\`. Use the \`getResult\` prop to specify how to get the data from the API response.`
        );
      }

      this.setState({
        items,
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
      prevBtn,
      nextBtn,
      size,
      align,
      simple,
      loader,
      unstyled,
      itemsPerPage,
      pagePadding,
    } = this.props;
    const { page, totalCount, loading, items } = this.state;

    const pagination = totalCount > 0 && (
      <Pagination
        prevBtn={prevBtn}
        nextBtn={nextBtn}
        size={size}
        unstyled={unstyled}
        align={align}
        simple={simple}
        page={page}
        itemsPerPage={itemsPerPage}
        totalCount={totalCount}
        onPageChange={this.goToPage}
        pagePadding={pagePadding}
        className="my-3"
      />
    );

    return (
      <React.Fragment>
        {this.props.placement !== 'bottom' && (
          <div ref={this.scrollRef}>{pagination}</div>
        )}
        <BlockUi
          keepInView
          blocking={loader && loading}
          message={typeof loader === 'string' ? loader : undefined}
        >
          {this.props.children(items || [], this.state)}
        </BlockUi>
        {this.props.placement !== 'top' && pagination}
      </React.Fragment>
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
