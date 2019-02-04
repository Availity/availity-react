import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Input, FormFeedback } from 'reactstrap';
import { avLogMessagesApi, avRegionsApi } from '@availity/api-axios';
import FeedbackButton from './FeedbackButton';

class FeedbackForm extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onFeedbackSent: PropTypes.func,
    faceOptions: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string,
        description: PropTypes.string,
      })
    ),
    aboutOptions: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      })
    ),
    prompt: PropTypes.string,
  };

  static defaultProps = {
    faceOptions: [
      {
        icon: 'smile',
        description: 'Smiley face',
      },
      {
        icon: 'meh',
        description: 'Meh face',
      },
      {
        icon: 'frown',
        description: 'Frowny face',
      },
    ],
    aboutOptions: [],
  };

  state = {};

  setActive = icon => {
    this.setState({ active: icon, invalid: null });
  };

  setTextFeedback = e => {
    this.setState({ textFeedback: e.target.value });
  };

  componentWillReceiveProps() {
    const { sent } = this.state;

    if (sent) {
      this.state = {};
    }
  }

  sendFeedback = async () => {
    const { active, textFeedback } = this.state;
    const { name, onFeedbackSent } = this.props;
    if (!active) {
      this.setState({ invalid: true });
      return;
    }
    const response = await avRegionsApi.getCurrentRegion();
    await avLogMessagesApi.info({
      surveyId: `${name.replace(/\s/g, '_')}_Smile_Survey`,
      smileLocation: `${name}`,
      smile: `icon-${active}`,
      feedback: textFeedback,
      url: window.location.href,
      region: response.data.regions[0] && response.data.regions[0].id,
      userAgent: window.navigator.userAgent,
      submitTime: new Date(),
    });

    if (onFeedbackSent) {
      onFeedbackSent(this.state);
    }
    this.setState({ sent: true, invalid: false });
  };

  render() {
    const { sent, active, invalid } = this.state;
    const { name, prompt, faceOptions, aboutOptions } = this.props;

    return sent ? (
      <div className="text-center">Thank you for your feedback.</div>
    ) : (
      <div className="text-center">
        <p>{prompt || `Tell us what you think about ${name}.`}</p>
        <ButtonGroup>
          {faceOptions.map(option => (
            <FeedbackButton
              key={option.icon}
              icon={option.icon}
              active={active}
              onClick={this.setActive}
            >
              {option.description}
            </FeedbackButton>
          ))}
        </ButtonGroup>
        <FormFeedback className={invalid ? 'd-block' : undefined}>
          Please select one of the faces above
        </FormFeedback>
        {aboutOptions.length > 0 && (
          <select className="custom-select" type="select">
            {aboutOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
        <Input
          className="mt-3"
          type="textarea"
          placeholder="Feedback? Requests? Defects? (optional)"
          onChange={this.setTextFeedback}
          aria-label="Please provide any feedback, requests, and/or defects."
        />
        <div className="mt-3 text-right">
          <Button onClick={this.sendFeedback} color="primary">
            Send
          </Button>
        </div>
      </div>
    );
  }
}

export default FeedbackForm;
