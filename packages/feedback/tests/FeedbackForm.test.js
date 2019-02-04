import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { FeedbackForm } from '..';

describe('Feedback', () => {
  test('should render', () => {
    const { container } = render(<FeedbackForm name="Payer Space" />);

    expect(container).toMatchSnapshot();
  });

  test('should indicate active smiley', () => {
    const { container, getByText } = render(
      <FeedbackForm name="Payer Space" />
    );

    // Get the Option with the smiley face
    const smileyFeedbackField = getByText('Smiley face');

    // Simulate the Click
    fireEvent.click(smileyFeedbackField);

    expect(container).toMatchSnapshot();
  });

  test('should set the feedback text value', () => {
    const { container, getByPlaceholderText } = render(
      <FeedbackForm name="Payer Space" />
    );

    // Get the Input Node for the Feedback
    const feedbackNode = getByPlaceholderText(
      'Feedback? Requests? Defects? (optional)'
    );

    // Simulate a user typing the value below into the field
    fireEvent.change(feedbackNode, {
      target: { value: 'some good text here' },
    });

    // Check if the Input Got Updated
    expect(feedbackNode.value).toEqual('some good text here');

    expect(container).toMatchSnapshot();
  });

  test('should render custom face icons', () => {
    const faceOptions = [
      {
        icon: 'happy',
        description: 'Happy face',
      },
      {
        icon: 'okay',
        description: 'Okay face',
      },
      {
        icon: 'sad',
        description: 'Sad face',
      },
      {
        icon: 'confused',
        description: 'Confused face',
      },
    ];

    const { container } = render(
      <FeedbackForm name="Payer Space" faceOptions={faceOptions} />
    );

    expect(container).toMatchSnapshot();
  });

  test('should render custom button color', () => {
    const aboutOptions = [
      {
        value: 'this space',
        label: 'This Payer Space',
      },
      {
        value: 'that space',
        label: 'That Payer Space',
      },
      {
        value: 'portal',
        label: 'Portal as a whole',
      },
      {
        value: 'availity',
        label: 'Availity as a whole',
      },
    ];
    const { container } = render(
      <FeedbackForm name="Payer Space" aboutOptions={aboutOptions} />
    );

    expect(container).toMatchSnapshot();
  });
});
