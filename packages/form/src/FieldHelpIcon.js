import React from 'react';
import PropTypes from 'prop-types';
import avMessages from '@availity/message-core';
import Icon from '@availity/icon';

export const OPEN_FIELD_HELP = 'nav:help:field';

const triggerFieldHelp = (id) => {
  avMessages.send({
    event: OPEN_FIELD_HELP,
    id,
  });
};

const handleKeyPress = (event, id) => {
  if (event.key === 'Enter') {
    triggerFieldHelp(id);
  }
};

const FieldHelpIcon = ({ id, color = 'primary', size = '1x', labelId, isHelpVideoType }) => (
  <Icon
    role="link"
    data-testid="field-help-icon"
    name={isHelpVideoType ? 'video-help' : 'help-circle'}
    size={size}
    color={color}
    onClick={() => triggerFieldHelp(id)}
    tabIndex={0}
    onKeyDown={(event) => handleKeyPress(event, id)}
    aria-hidden="false"
    aria-label="help"
    aria-describedby={labelId}
  />
);

FieldHelpIcon.propTypes = {
  id: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  labelId: PropTypes.string,
  isHelpVideoType: PropTypes.bool,
};

export default FieldHelpIcon;
