import React from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'reactstrap';
import Icon from '@availity/icon';
import { avTelemetryApi } from '@availity/api-axios';

const btnStyles = { fontSize: '1.4em', padding: '.2em .4em' };
const iconStyles = { margin: '0px' };

const FeedbackButton = ({ onClick, icon, active, children, iconSize, ...rest }) => (
  <Button
    style={btnStyles}
    color={active === icon ? 'primary' : 'light'}
    aria-pressed={active === icon}
    onClick={() => {
      avTelemetryApi.info({
        customerId: '0000',
        contact: 'BigBitBandits@availity.com',
        source_system: window.navigator.userAgent,
        version: '1',
        telemetryBody: {
          entries: { event: 'open feedback', action: 'click', label: JSON.stringify(children), category: 'feedback' },
        },
      });
      onClick(icon);
    }}
    onKeyDown={({ keyCode }) => keyCode === 13 && onClick(icon)}
    {...rest}
  >
    <Icon data-testid="feedback-icon" name={icon} size={iconSize} style={iconStyles} />
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
