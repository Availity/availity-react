import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'reactstrap';

const btnStyles = { fontSize: '1.4em', padding: '.2em .4em' };

class FeedbackButton extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    icon: PropTypes.string,
    active: PropTypes.string,
    children: PropTypes.node,
  };

  onClickHandler = () => {
    const { onClick, icon } = this.props;

    onClick(icon);
  };

  render() {
    const { icon, active, children } = this.props;
    return (
      <Button
        style={btnStyles}
        color={active === icon ? 'primary' : 'light'}
        onClick={this.onClickHandler}
      >
        <span className={`icon icon-${icon}`} />
        <span className="sr-only">{children}</span>
      </Button>
    );
  }
}

export default FeedbackButton;
