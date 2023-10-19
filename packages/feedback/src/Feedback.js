import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle } from 'reactstrap';
import { avLogMessagesApi, avTelemetryApi } from '@availity/api-axios';
import { useToggle } from '@availity/hooks';
import FeedbackDropdown from './FeedbackDropdown';
import FeedbackModal from './FeedbackModal';

const Feedback = ({
  appName,
  modal,
  zIndex,
  supportZIndex,
  children,
  analytics,
  className,
  outline,
  color,
  formProps,
  prompt,
  onFeedbackSent,
  showSupport,
  onModalOpenChange,
  ...props
}) => {
  const [feedbackIsOpen, feedbackToggle] = useToggle(false);

  const handleFeedbackToggle = () => {
    feedbackToggle();
    onModalOpenChange(!feedbackIsOpen);
  };

  return (
    <Dropdown
      isOpen={feedbackIsOpen && !modal}
      toggle={handleFeedbackToggle}
      className={`${className} hidden-print`}
      {...props}
    >
      <DropdownToggle
        color={color}
        outline={outline}
        onClick={() =>
          avTelemetryApi.info({
            customerId: '0000',
            contact: 'BigBitBandits@availity.com',
            source_system: window.navigator.userAgent,
            version: '1',
            telemetryBody: {
              entries: {
                event: 'open feedback',
                action: 'click',
                label: JSON.stringify(children),
                category: 'feedback',
              },
            },
          })
        }
      >
        {children || (showSupport ? 'Feedback & Support' : 'Give Feedback')}
      </DropdownToggle>
      {modal ? (
        <FeedbackModal
          onFeedbackSent={onFeedbackSent}
          prompt={prompt}
          isOpen={feedbackIsOpen}
          zIndex={zIndex}
          toggle={handleFeedbackToggle}
          name={appName}
          analytics={analytics}
          showSupport={showSupport}
          supportZIndex={supportZIndex}
          feedbackToggle={feedbackToggle}
          {...formProps}
        />
      ) : (
        <FeedbackDropdown
          onFeedbackSent={onFeedbackSent}
          feedbackToggle={feedbackToggle}
          prompt={prompt}
          analytics={analytics}
          toggle={handleFeedbackToggle}
          name={appName}
          showSupport={showSupport}
          supportZIndex={supportZIndex}
          modal={modal}
          {...formProps}
        />
      )}
    </Dropdown>
  );
};

Feedback.propTypes = {
  analytics: PropTypes.shape({
    info: PropTypes.func.isRequired,
  }),
  /** The name of the application this feedback is for. It is used in the API request to indicate where the feedback came from. */
  appName: PropTypes.string,
  /** Whether to open the FeedbackForm in a modal */
  modal: PropTypes.bool,
  /** Allows for overriding the z-indexvalue from react-strap Modalcomponent. */
  zIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Allows for overriding the z-index value from reactstrap Support Modal component. */
  supportZIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** The text to display on the submit button. */
  children: PropTypes.node,
  className: PropTypes.string,
  /** Indicates if the button should use the "outline" styles or not. */
  outline: PropTypes.bool,
  /** The color of the button. Default: "light". */
  color: PropTypes.string,
  /** Props to be spread to the underlying FeedbackForm. See the FeedbackForm Props. */
  formProps: PropTypes.object,
  /** Text that prompts the user to provider feedback. Default: "Tell us what you think about ${appName}.". */
  prompt: PropTypes.string,
  /** Callback for when the feedback is submitted. It is called with the feedback object. */
  onFeedbackSent: PropTypes.func,
  onModalOpenChange: PropTypes.func,
  /** Toggle whether or not to show the "Open a Support ticket" link in the FeedbackForm */
  showSupport: PropTypes.bool,
};

Feedback.defaultProps = {
  modal: false,
  color: 'secondary',
  analytics: avLogMessagesApi,
  showSupport: false,
  onModalOpenChange: Object,
};

export default Feedback;
