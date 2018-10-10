import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PaginationItem as RsPaginationItem, PaginationLink } from 'reactstrap';

class PaginationItem extends Component {
  clickHandler = () => {
    this.props.onClick(this.props.page);
  };

  render() {
    const { onClick, page, ...props } = this.props;
    return (
      <RsPaginationItem {...props}>
        <PaginationLink tag="button" type="button" onClick={this.clickHandler}>
          {page}
        </PaginationLink>
      </RsPaginationItem>
    );
  }
}

PaginationItem.propTypes = {
  onClick: PropTypes.func,
  page: PropTypes.number,
};

export default PaginationItem;
