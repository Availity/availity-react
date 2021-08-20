import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ModalBody,
  ModalHeader,
  ModalFooter,
  FormGroup,
} from 'reactstrap';
import { avLogMessagesApi, avRegionsApi } from '@availity/api-axios';
import { Form, Field } from '@availity/form';
import { SelectField } from '@availity/select';
import * as yup from 'yup';
import SmileField from './SmileField';

yup.addMethod(yup.string, 'isRequired', function format(isRequired, msg) {
  return this.test({
    name: 'dateRange',
    exclusive: true,
    message: msg || 'This field is required.',
    test(value) {
      if (isRequired) {
        return value !== undefined;
      }
      return true;
    },
  });
});

const FeedbackForm = ({
  name,
  onClose,
  faceOptions,
  aboutOptions,
  aboutLabel,
  onFeedbackSent,
  prompt,
  additionalComments,
  staticFields,
  analytics,
  modalHeaderProps,
  showSupport,
  setSupportIsActive,
  ...formProps
}) => {
  const [active, setActive] = useState(null);
  const [sent, setSent] = useState(null);

  const sendFeedback = async ({ smileField, ...values }) => {
    const response = await avRegionsApi.getCurrentRegion();

    await analytics.info({
      surveyId: `${name.replace(/\s/g, '_')}_Smile_Survey`,
      smileLocation: `${name}`,
      smile: `icon-${smileField.icon}`,
      url: window.location.href,
      region: response.data.regions[0] && response.data.regions[0].id,
      userAgent: window.navigator.userAgent,
      submitTime: new Date(),
      ...values, // Spread the form values onto the logger
      ...staticFields, // Spread the static key value pairs onto the logger
    });

    setSent(values);
  };

  // Close the Modal once sent after 2 seconds
  useEffect(() => {
    if (sent) {
      setTimeout(() => {
        if (onClose) {
          onClose(); // Mostly for Screen Reader use but a nice to have for all
        }
        if (onFeedbackSent) {
          Object.keys(sent).forEach(
            (key) => sent[key] === undefined && delete sent[key]
          );

          onFeedbackSent({
            active: active.icon,
            ...sent,
          });
        }
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sent]);

  return sent ? (
    <ModalHeader
      role="status"
      id="feedback-form-header"
      tabIndex="0"
      className="d-flex justify-content-center"
      {...modalHeaderProps}
    >
      Thank you for your feedback.
    </ModalHeader>
  ) : (
    <>
      <ModalHeader
        id="feedback-form-header"
        role="heading"
        aria-level="2"
        className="h5"
        tag="div"
        {...modalHeaderProps}
      >
        {prompt || `Tell us what you think about ${name}`}
      </ModalHeader>
      <Form
        aria-label="Feedback Form"
        aria-describedby="feedback-form-header"
        role="form"
        onKeyDown={({ keyCode }) => keyCode === 27 && onClose()}
        data-testid="feedback-form"
        initialValues={{
          'face-options': undefined,
          additionalFeedback: undefined,
          feedback: undefined,
          feedbackApp: undefined,
          smileField: undefined,
        }}
        validationSchema={yup.object().shape({
          feedback: yup
            .string()
            .max(200, 'Feedback cannot exceed 200 characters.')
            .required('This field is required.'),
          additionalFeedback: yup
            .string()
            .max(200, 'Additional Feedback cannot exceed 200 characters.'),
          smileField: yup
            .object()
            .shape({
              icon: yup.string().required(),
              description: yup.string(),
              label: yup.string(),
            })
            .required('This field is required.'),
          feedbackApp: yup
            .string()
            .isRequired(aboutOptions.length > 0, 'This field is required.'),
        })}
        {...formProps}
        onSubmit={(values) => sendFeedback(values)}
      >
        <ModalBody>
          <FormGroup
            size="lg"
            id="face-options"
            role="group"
            aria-labelledby="feedback-form-header"
            data-testid="face-options"
            className="d-flex flex-row justify-content-between"
          >
            <SmileField
              options={faceOptions}
              name="smileField"
              onChange={(option) => setActive(option)}
            />
          </FormGroup>
          {active ? (
            <>
              {aboutOptions.length > 0 && (
                <SelectField
                  name="feedbackApp"
                  id="about-options"
                  data-testid="about-options"
                  label={aboutLabel}
                  options={aboutOptions}
                />
              )}
              <Field
                type="textarea"
                name="feedback"
                label={
                  (active && active.label) || 'Feedback? Requests? Defects?'
                }
                style={{ resize: 'none' }}
                rows="2"
              />
              {additionalComments && (
                <Field
                  type="textarea"
                  name="additionalFeedback"
                  label="Additional Comments... (Optional)"
                  style={{ resize: 'none' }}
                  rows="2"
                />
              )}
            </>
          ) : null}
        </ModalBody>

        <ModalFooter>
          {showSupport ? (
            <>
              <span
                className="d-none d-md-block"
                style={{ display: 'inline-block', margin: 0 }}
              >
                Need Help?
              </span>
              <Button
                className="pl-0"
                onClick={() => setSupportIsActive(true)}
                color="link"
                type="button"
                onKeyDown={({ keyCode }) =>
                  keyCode === 13 && setSupportIsActive(true)
                }
              >
                Open a support ticket
              </Button>
            </>
          ) : null}

          {onClose ? (
            <Button
              onClick={onClose}
              color="secondary"
              onKeyDown={({ keyCode }) => keyCode === 13 && onClose()}
            >
              Close
            </Button>
          ) : null}

          <Button type="submit" color="primary" disabled={!active}>
            Send Feedback
          </Button>
        </ModalFooter>
      </Form>
    </>
  );
};

FeedbackForm.propTypes = {
  name: PropTypes.string.isRequired,
  onFeedbackSent: PropTypes.func,
  faceOptions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      description: PropTypes.string,
      placeholder: PropTypes.string,
    })
  ),
  aboutOptions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  aboutLabel: PropTypes.node,
  onClose: PropTypes.func,
  prompt: PropTypes.string,
  additionalComments: PropTypes.bool,
  staticFields: PropTypes.object,
  modalHeaderProps: PropTypes.shape({ ...ModalHeader.propTypes }),
  analytics: PropTypes.shape({
    info: PropTypes.func.isRequired,
  }),
  showSupport: PropTypes.bool,
  setSupportIsActive: PropTypes.func,
};

FeedbackForm.defaultProps = {
  aboutOptions: [],
  aboutLabel: 'This is about',
  additionalComments: false,
  modalHeaderProps: {},
  analytics: avLogMessagesApi,
  showSupport: false,
};

export default FeedbackForm;
