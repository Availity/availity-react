import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Button, ModalHeader, FormGroup } from 'reactstrap';
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

// const ConditionalModalHeader = ({ condition, wrapper, children }) =>
//   condition ? wrapper(children) : children;

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
          Object.keys(sent).forEach((key) => sent[key] === undefined && delete sent[key]);

          onFeedbackSent({
            active: active.icon,
            ...sent,
          });
        }
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sent]);

  return (
    <Form
      aria-label="Feedback Form"
      aria-describedby="feedback-form-header"
      className="container p-2"
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
      {sent ? (
        modalHeaderProps ? (
          // TODO Sorry for all the ternaries here. This component badly needs to be
          // refactored. PF-2208 was to make FeedbackForm usable outside, but to maintain
          // the use case of it being inside a modal I needed to keep modalHeaderProps
          // in the PropTypes. Since modalHeaderProps is being used to pass an onClose
          // handler to the modal header, I need to still conditionally render the
          // ModalHeader and spread the props onto it. This whole set of components
          // need to be completely reworked to enable better composition of these
          // components
          <ModalHeader
            role="status"
            id="feedback-form-header"
            tabIndex="0"
            className="d-flex justify-content-center"
            {...modalHeaderProps}
          >
            Thank you for your feedback.
          </ModalHeader>
        ) : modalHeaderProps ? (
          <ModalHeader
            id="feedback-form-header"
            role="heading"
            aria-level="2"
            className="h5 mt-n2 mx-n2"
            tag="div"
            {...modalHeaderProps}
          >
            {prompt || `Tell us what you think about ${name}`}
          </ModalHeader>
        ) : (
          <Row>
            <Col className="m-2 p-3">Your feedback has been sent. Thank you!</Col>
          </Row>
        )
      ) : (
        <>
          {modalHeaderProps ? (
            <ModalHeader
              id="feedback-form-header"
              role="heading"
              aria-level="2"
              className="h5 mt-n2 mx-n2"
              tag="div"
              {...modalHeaderProps}
            >
              {prompt || `Tell us what you think about ${name}`}
            </ModalHeader>
          ) : (
            <Row>
              <div className="col h5" role="heading" aria-level="2" id="feedback-form-header">
                {prompt || `Tell us what you think about ${name}`}
              </div>
            </Row>
          )}

          <FormGroup
            row
            data-testid="face-options"
            size="lg"
            id="face-options"
            role="group"
            aria-labelledby="feedback-form-header"
          >
            <SmileField
              options={faceOptions}
              name="smileField"
              onChange={(option) => setActive(option)}
              autoFocusFeedbackButton={autoFocusFeedbackButton}
            />
          </FormGroup>

          {active ? (
            <>
              {aboutOptions.length > 0 && (
                <Row>
                  <Col>
                    <SelectField
                      name="feedbackApp"
                      id="about-options"
                      data-testid="about-options"
                      label={aboutLabel}
                      options={aboutOptions}
                    />
                  </Col>
                </Row>
              )}

              <Row>
                <Col>
                  <Field
                    type="textarea"
                    name="feedback"
                    label={(active && active.label) || 'Feedback? Requests? Defects?'}
                    style={fieldStyles}
                    rows="2"
                  />
                </Col>
              </Row>
              {additionalComments && (
                <Row>
                  <Col>
                    <Field
                      type="textarea"
                      name="additionalFeedback"
                      label="Additional Comments... (Optional)"
                      style={fieldStyles}
                      rows="2"
                    />
                  </Col>
                </Row>
              )}
            </>
          ) : null}

          <Row className="justify-content-end">
            {showSupport ? (
              <Col xs="auto" className="mt-2">
                <small className="d-none d-md-inline" style={inlineStyles}>
                  Need Help?
                </small>
                <Button
                  size="sm"
                  className="pl-0 ml-1 d-inline"
                  onClick={() => setSupportIsActive(true)}
                  onKeyDown={({ keyCode }) => keyCode === 13 && setSupportIsActive(true)}
                  color="link"
                  type="button"
                >
                  Open a support ticket
                </Button>
              </Col>
            ) : null}
            {onClose ? (
              <Col xs="auto" className="mt-2">
                <Button
                  size="sm"
                  onClick={onClose}
                  onKeyDown={({ keyCode }) => keyCode === 13 && onClose()}
                  color="secondary"
                  className=""
                >
                  Close
                </Button>
              </Col>
            ) : null}

            <Col xs="auto" className="mt-2">
              <Button size="sm" type="submit" color="primary" disabled={!active}>
                Send Feedback
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Form>
  );
};

FeedbackForm.propTypes = {
  name: PropTypes.string.isRequired,
  onFeedbackSent: PropTypes.func,
  faceOptions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      description: PropTypes.string,
      label: PropTypes.string,
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
  autoFocusFeedbackButton: PropTypes.bool,
};

FeedbackForm.defaultProps = {
  aboutOptions: [],
  aboutLabel: 'This is about',
  additionalComments: false,
  analytics: avLogMessagesApi,
  showSupport: false,
};

export default FeedbackForm;
