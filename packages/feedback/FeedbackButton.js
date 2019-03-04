import React from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'reactstrap';
import Icon from '@availity/icon';

const btnStyles = { fontSize: '1.4em', padding: '.2em .4em' };

const FeedbackButton = ({
  onClick,
  icon,
  active,
  children,
  iconSize,
  ...rest
}) => (
  <Button
    style={btnStyles}
    color={active === icon ? 'primary' : 'light'}
    onClick={() => onClick(icon)}
    {...rest}
  >
    <Icon data-testid="feedback-icon" name={icon} size={iconSize} />
    <span className="sr-only">{children}</span>
  </Button>
);

FeedbackButton.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.string,
  active: PropTypes.string,
  children: PropTypes.node,
  iconSize: PropTypes.string,
};

FeedbackButton.defaultProps = {
  iconSize: '',
};

export default FeedbackButton;
