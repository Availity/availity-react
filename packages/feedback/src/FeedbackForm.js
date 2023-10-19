import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, ModalBody, ModalHeader, ModalFooter, FormGroup } from 'reactstrap';
import { avLogMessagesApi, avRegionsApi, avTelemetryApi } from '@availity/api-axios';
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

const fieldStyles = { resize: 'none' };
const inlineStyles = { display: 'inline-block', margin: 0 };

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
  autoFocusFeedbackButton,
  modal,
  ...formProps
}) => {
  const [active, setActive] = useState(null);
  const [sent, setSent] = useState(null);
  const [loading, setLoading] = useState(null);
  const ref = useRef();
  const sendFeedback = async ({ smileField, ...values }) => {
    setLoading(true);
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

    await avTelemetryApi.info({
      customerId: '0000',
      contact: 'BigBitBandits@availity.com',
      source_system: window.navigator.userAgent,
      version: '1',
      telemetryBody: { entries: { event: 'submit', action: 'click', label: 'Submit', category: 'feedback' } },
    });

    setSent(values);
    setLoading(false);
  };

  // Close the Modal once sent after 2 seconds
  useEffect(() => {
    if (sent) {
      setTimeout(() => {
        if (onClose) {
          onClose(); // Mostly for Screen Reader use but a nice to have for all
        }
        if (onFeedbackSent) {
          for (const key of Object.keys(sent)) {
            if (sent[key] === undefined) {
              delete sent[key];
            }
          }

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
        innerRef={ref}
        aria-label="Feedback Form"
        aria-describedby="feedback-form-header"
        role="form"
        onKeyDown={({ key }) => key === 'Escape' && onClose()}
        data-testid="feedback-form"
        initialValues={{
          'face-options': undefined,
          additionalFeedback: undefined,
          feedback: undefined,
          feedbackApp: undefined,
          smileField: undefined,
        }}
        validationSchema={yup.object().shape({
          feedback: yup.string().max(200, 'Feedback cannot exceed 200 characters.').required('This field is required.'),
          additionalFeedback: yup.string().max(200, 'Additional Feedback cannot exceed 200 characters.'),
          smileField: yup
            .object()
            .shape({
              icon: yup.string().required(),
              description: yup.string(),
              label: yup.string(),
            })
            .required('This field is required.'),
          feedbackApp: yup.string().isRequired(aboutOptions.length > 0, 'This field is required.'),
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
              onClose={onClose}
              autoFocusFeedbackButton={autoFocusFeedbackButton}
              modal={modal}
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
                label={(active && active.label) || 'Feedback? Requests? Defects?'}
                style={fieldStyles}
                rows="2"
              />
              {additionalComments && (
                <Field
                  type="textarea"
                  name="additionalFeedback"
                  label="Additional Comments... (Optional)"
                  style={fieldStyles}
                  rows="2"
                />
              )}
            </>
          ) : null}
        </ModalBody>

        <ModalFooter>
          {showSupport ? (
            <>
              <span className="d-none d-md-block" style={inlineStyles}>
                Need Help?
              </span>
              <Button
                className="pl-0"
                onClick={() => setSupportIsActive(true)}
                color="link"
                type="button"
                onKeyDown={({ key }) => key === 'Enter' && setSupportIsActive(true)}
              >
                Open a support ticket
              </Button>
            </>
          ) : null}

          {onClose ? (
            <Button
              type="button"
              onClick={onClose}
              color="secondary"
              onKeyDown={({ key, shiftKey }) => {
                if (key === 'Enter') {
                  onClose();
                }
                if (key === 'Tab' && !active && !shiftKey && !modal) {
                  onClose();
                }
              }}
            >
              Close
            </Button>
          ) : null}

          <Button
            onKeyDown={({ key, shiftKey }) => {
              if (key === 'Enter') {
                ref.current.submitForm();
              }
              if (key === 'Tab' && !shiftKey && !modal) {
                onClose();
              }
            }}
            type="submit"
            color="primary"
            disabled={Boolean(!active || loading)}
          >
            Send Feedback
          </Button>
        </ModalFooter>
      </Form>
    </>
  );
};

FeedbackForm.propTypes = {
  /** The name of the application this feedback is for. It is used in the API request to indicate where the feedback came from. */
  name: PropTypes.string.isRequired,
  /** Callback for when the feedback is submitted. It is called with the feedback object. */
  onFeedbackSent: PropTypes.func,
  /** Array of Objects containing icon (String), description (String), and label (String) properties.
   * Allows you to override the smiley face options which appear.
   * Default: Smiley Face, Meh Face, and Frowny Face.
   * Previous placeholder property removed as of v6.0.0. Use label instead. */
  faceOptions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      description: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  /** Array of Objects containing value (String,Number) and label (String) properties.
   * Allows a dropdown displaying the options provided to let the user indicate what the feedback is about. */
  aboutOptions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  /** Label text for the dropdown created via the aboutOptions prop. Default: "This is about".
   *Previously aboutPlaceholder. All placeholders replaced with labels starting v6.0.0. */
  aboutLabel: PropTypes.node,
  /** When provided, a "Close" button is rendered and onClose is excuted when it's clicked. */
  onClose: PropTypes.func,
  /** Text that prompts the user to provider feedback. Default: "Tell us what you think about ${appName}.". */
  prompt: PropTypes.string,
  /** If true, shows an optional comments field below. */
  additionalComments: PropTypes.bool,
  /** Static (non-user-entered) key/value pairs to be sent in feedback submission. */
  staticFields: PropTypes.object,
  /** Props to be spread onto the <ModalHeader /> rendered inside of the <FeedbackForm />. See ModalHeader
   *For accessibility use className instead of tag to adjust size and style of header. */
  modalHeaderProps: PropTypes.shape({ ...ModalHeader.propTypes }),
  /** Override the analytics instance that is passed in. Default avLogMessagesApi */
  analytics: PropTypes.shape({
    info: PropTypes.func.isRequired,
  }),
  /** Toggle whether or not to show the "Open a Support ticket" link in the FeedbackForm */
  showSupport: PropTypes.bool,
  setSupportIsActive: PropTypes.func,
  /** Default: true. When set to false, the first feedback button is not focused.
   * This is to avoid issues with focus causing other elements to close (e.g. dropdowns) */
  autoFocusFeedbackButton: PropTypes.bool,
  modal: PropTypes.bool,
};

FeedbackForm.defaultProps = {
  aboutOptions: [],
  aboutLabel: 'This is about',
  additionalComments: false,
  analytics: avLogMessagesApi,
  showSupport: false,
  modal: true,
};

export default FeedbackForm;
