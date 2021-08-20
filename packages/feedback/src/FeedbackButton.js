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
    aria-pressed={active === icon}
    onClick={() => {
      onClick(icon);
    }}
    onKeyDown={({ keyCode }) => keyCode === 13 && onClick(icon)}
    {...rest}
  >
    <Icon
      data-testid="feedback-icon"
      name={icon}
      size={iconSize}
      style={{ margin: '0px' }}
    />
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
