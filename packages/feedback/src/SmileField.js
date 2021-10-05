import React from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import { Col } from 'reactstrap';
import FeedbackButton from './FeedbackButton';

const SmileField = ({ name, options, onChange, autoFocusFeedbackButton }) => {
  const [{ value }] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <>
      {options.map((option, i) => (
        <Col>
          <FeedbackButton
            autoFocus={i === 0 && autoFocusFeedbackButton}
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
        </Col>
      ))}
    </>
  );
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
