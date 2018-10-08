import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Pagination as RsPagination,
  PaginationLink,
  PaginationItem as RsPaginationItem,
} from 'reactstrap';
import PaginationItem from './PaginationItem';

const propTypes = {
  totalCount: PropTypes.number,
  pagePadding: PropTypes.number,
  page: PropTypes.number,
  itemsPerPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  prevBtn: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([false])]),
  nextBtn: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([false])]),
  size: PropTypes.string,
  align: PropTypes.oneOf(['start', 'center', 'end', 'between']),
  simple: PropTypes.bool,
  unstyled: PropTypes.bool,
  className: PropTypes.string,
};

const defaultProps = {
  pagePadding: 2,
  itemsPerPage: 10,
  prevBtn: '« Prev',
  nextBtn: 'Next »',
  align: 'start',
  unstyled: true,
  size: 'sm',
};

class Pagination extends Component {
  getLastPage() {
    return this.props.totalCount
      ? Math.ceil(this.props.totalCount / this.props.itemsPerPage)
      : null;
  }

  isFirstPage() {
    return this.props.page <= 1;
  }

  isLastPage() {
    const lastPage = this.getLastPage();
    return lastPage ? this.props.page >= lastPage : false;
  }

  firstPage = () => {
    this.props.onPageChange(1);
  };

  nextPage = () => {
    this.props.onPageChange(this.props.page + 1);
  };

  prevPage = () => {
    this.props.onPageChange(this.props.page - 1);
  };

  lastPage = () => {
    this.props.onPageChange(this.getLastPage());
  };

  getPages() {
    const { page, pagePadding } = this.props;
    const lastPage = this.getLastPage();
    // start min/max values are page +- padding
    let minPage = page - pagePadding;
    let maxPage = page + pagePadding;

    // if min page is lower than 1, add extra values to maxPage
    if (minPage < 1) {
      maxPage += 1 - minPage;
      minPage = 1;
    }

    // if maxPage is greater than allowed, add values back to minPage
    if (maxPage > lastPage) {
      // don't let min get moved to below 1
      minPage = Math.max(1, minPage - (maxPage - lastPage));
      maxPage = lastPage;
    }

    const output = [];
    if (maxPage > minPage) {
      for (let i = minPage; i <= maxPage; i += 1) {
        output.push(
          <PaginationItem
            key={i}
            onClick={this.props.onPageChange}
            page={i}
            active={i === page}
          />
        );
      }
    }
    return output;
  }

  render() {
    return (
      <React.Fragment>
        <RsPagination
          size={this.props.size}
          listClassName={`pagination-${
            this.props.unstyled ? 'un' : ''
          }styled justify-content-${this.props.align} ${
            this.props.className ? this.props.className : ''
          }`}
        >
          {this.props.prevBtn && (
            <RsPaginationItem disabled={this.isFirstPage()}>
              <PaginationLink
                previous
                tag="button"
                type="button"
                onClick={this.prevPage}
              >
                {this.props.prevBtn}
              </PaginationLink>
            </RsPaginationItem>
          )}
          {!this.props.simple && this.getPages()}
          {this.props.nextBtn && (
            <RsPaginationItem disabled={this.isLastPage()}>
              <PaginationLink
                next
                tag="button"
                type="button"
                onClick={this.nextPage}
              >
                {this.props.nextBtn}
              </PaginationLink>
            </RsPaginationItem>
          )}
        </RsPagination>
      </React.Fragment>
    );
  }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;
