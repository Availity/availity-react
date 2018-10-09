import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Pagination as RsPagination,
  PaginationLink,
  PaginationItem as RsPaginationItem,
} from 'reactstrap';
import PaginationItem from './PaginationItem';

const buttonTypeProps = PropTypes.oneOfType([PropTypes.string, PropTypes.bool]);
const defaultButtonText = {
  firstBtn: '«« First',
  prevBtn: '« Prev',
  nextBtn: 'Next »',
  lastBtn: 'Last »»',
};

const propTypes = {
  totalCount: PropTypes.number,
  pagePadding: PropTypes.number,
  page: PropTypes.number,
  itemsPerPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  prevBtn: buttonTypeProps,
  nextBtn: buttonTypeProps,
  firstBtn: buttonTypeProps,
  lastBtn: buttonTypeProps,
  size: PropTypes.string,
  align: PropTypes.oneOf(['start', 'center', 'end', 'between']),
  simple: PropTypes.bool,
  unstyled: PropTypes.bool,
  className: PropTypes.string,
};

const defaultProps = {
  pagePadding: 2,
  itemsPerPage: 10,
  firstBtn: true,
  prevBtn: true,
  nextBtn: true,
  lastBtn: true,
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

  getStartButtons() {
    const { firstBtn, prevBtn } = this.props;
    const output = [];
    const firstBtnText =
      !firstBtn || typeof firstBtn === 'string'
        ? firstBtn
        : defaultButtonText.firstBtn;

    if (firstBtnText) {
      output.push(
        <RsPaginationItem disabled={this.isFirstPage()} key="firstBtn">
          <PaginationLink
            tag="button"
            type="button"
            onClick={this.firstPage}
            aria-label="First"
          >
            {firstBtnText}
          </PaginationLink>
        </RsPaginationItem>
      );
    }

    const prevBtnText =
      !prevBtn || typeof prevBtn === 'string'
        ? prevBtn
        : defaultButtonText.prevBtn;
    if (prevBtnText) {
      output.push(
        <RsPaginationItem disabled={this.isFirstPage()} key="prevBtn">
          <PaginationLink
            previous
            tag="button"
            type="button"
            onClick={this.prevPage}
          >
            {prevBtnText}
          </PaginationLink>
        </RsPaginationItem>
      );
    }

    return output;
  }

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

  getEndButtons() {
    const { nextBtn, lastBtn } = this.props;
    const output = [];
    const nextBtnText =
      !nextBtn || typeof nextBtn === 'string'
        ? nextBtn
        : defaultButtonText.nextBtn;
    if (nextBtnText) {
      output.push(
        <RsPaginationItem disabled={this.isLastPage()} key="nextBtn">
          <PaginationLink
            previous
            tag="button"
            type="button"
            onClick={this.nextPage}
          >
            {nextBtnText}
          </PaginationLink>
        </RsPaginationItem>
      );
    }
    const lastBtnText =
      !lastBtn || typeof lastBtn === 'string'
        ? lastBtn
        : defaultButtonText.lastBtn;
    if (lastBtnText) {
      output.push(
        <RsPaginationItem disabled={this.isLastPage()} key="lastBtn">
          <PaginationLink
            tag="button"
            type="button"
            onClick={this.prevPage}
            aria-label="Last"
          >
            {lastBtnText}
          </PaginationLink>
        </RsPaginationItem>
      );
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
          {this.getStartButtons()}
          {!this.props.simple && this.getPages()}
          {this.getEndButtons()}
        </RsPagination>
      </React.Fragment>
    );
  }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;
