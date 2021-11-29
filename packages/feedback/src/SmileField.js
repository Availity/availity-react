import React from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import FeedbackButton from './FeedbackButton';

const btnStyles = { flex: 1, margin: '0 2% 0 2%' };

const SmileField = ({ name, options, onChange, autoFocusFeedbackButton, onClose }) => {
  const [{ value }] = useField(name);
  const { setFieldValue } = useFormikContext();

  return options.map((option, i) => (
    <FeedbackButton
      autoFocus={i === 0 && autoFocusFeedbackButton}
      onKeyDown={(e) => {
        if (e.shiftKey && e.keyCode === 9 && i === 0) {
          onClose();
        }
        if (e.keyCode === 13) {
          setFieldValue(name, option);
          if (onChange) {
            onChange(option);
          }
        }
      }}
      style={btnStyles}
      key={option.icon}
      icon={option.icon}
      iconSize="2x"
      value={option}
      active={value && value.icon}
      onClick={() => {
        setFieldValue(name, option);
        if (onChange) {
          onChange(option);
        }
      }}
    >
      {option.description}
    </FeedbackButton>
  ));
};

SmileField.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      description: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  onChange: PropTypes.func,
  autoFocusFeedbackButton: PropTypes.bool,
};

SmileField.defaultProps = {
  options: [
    {
      icon: 'smile',
      description: 'Smiley face',
      label: 'What do you like?',
    },
    {
      icon: 'meh',
      description: 'Meh face',
      label: 'What would you improve?',
    },
    {
      icon: 'frown',
      description: 'Frowny face',
      label: "What don't you like?",
    },
  ],
  autoFocusFeedbackButton: true,
};

export default SmileField;
