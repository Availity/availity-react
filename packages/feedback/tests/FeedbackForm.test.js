/* eslint-disable unicorn/prefer-query-selector */
import React from 'react';
import { render, fireEvent, wait } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import { avLogMessagesApi, avRegionsApi } from '@availity/api-axios';
import { FeedbackForm } from '..';

jest.mock('@availity/api-axios');

avLogMessagesApi.info = jest.fn(() => Promise.resolve());

avRegionsApi.getCurrentRegion = jest.fn(() =>
  Promise.resolve({
    data: {
      regions: [
        {
          id: 'some region id',
        },
      ],
    },
  })
);

describe('FeedbackForm', () => {
  test('should disable submit button until smile selected', () => {
    const { getByText } = render(<FeedbackForm name="Payer Space" />);

    const submitButton = getByText('Send Feedback');

    expect(submitButton.getAttribute('disabled')).not.toBe(null);

    fireEvent.click(getByText('Smiley face'));

    expect(submitButton.getAttribute('disabled')).toBe(null);
  });

  test('should indicate active smiley', () => {
    const { getByText } = render(<FeedbackForm name="Payer Space" />);

    // Get the Option with the smiley face
    const smileyFeedbackField = getByText('Smiley face');

    // Simulate the Click
    fireEvent.click(smileyFeedbackField);

    expect(smileyFeedbackField.parentElement.className).toContain(
      'btn-primary'
    );
  });

  test('should submit with feedback text value', () => {
    const onFeedbackSent = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <FeedbackForm onFeedbackSent={onFeedbackSent} name="Payer Space" />
    );

    // Simulate the Click
    fireEvent.click(getByText('Smiley face'));

    // Get the Input Node for the Feedback
    const feedbackNode = getByPlaceholderText('What do you like?');

    // Simulate a user typing the value below into the field
    fireEvent.change(feedbackNode, {
      target: { value: 'some good text here' },
    });

    // Check if the Input Got Updated
    expect(feedbackNode.value).toEqual('some good text here');

    fireEvent.click(getByText('Send Feedback'));

    wait(() =>
      expect(onFeedbackSent).toHaveBeenCalledWith(
        expect.objectContaining({
          feedback: 'some good text here',
        })
      )
    );
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

    const { getByTestId } = render(
      <FeedbackForm name="Payer Space" faceOptions={faceOptions} />
    );

    const faceOptionFields = getByTestId('face-options');

    expect(faceOptionFields.childElementCount).toBe(4);

    faceOptions.forEach(faceOption => {
      expect(
        faceOptionFields.getElementsByClassName(`icon-${faceOption.icon}`)
      ).not.toBe(null);
    });
  });

  test('should render about options', () => {
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
    const { getByText } = render(
      <FeedbackForm name="Payer Space" aboutOptions={aboutOptions} />
    );

    // Simulate the Click First
    fireEvent.click(getByText('Smiley face'));

    // Placeholder text on the Select Field to know we rendered it
    expect(getByText('This is about...')).toBeDefined();
  });

  test('should render additional comments input', () => {
    const { getByText, getByPlaceholderText } = render(
      <FeedbackForm name="Payer Space" additionalComments />
    );

    fireEvent.click(getByText('Smiley face'));

    expect(
      getByPlaceholderText('Additional Comments... (Optional)')
    ).toBeDefined();
  });

  test('should render static fields', () => {
    const { getByText, getByTestId } = render(
      <FeedbackForm
        name="Payer Space"
        staticFields={[{ name: 'myStaticField', value: 'myStaticFieldValue' }]}
      />
    );

    fireEvent.click(getByText('Smiley face'));

    const staticFieldInput = getByTestId('feedback-static-field-myStaticField');

    expect(staticFieldInput).toBeDefined();
    expect(staticFieldInput.getAttribute('hidden')).toBe('');
    expect(staticFieldInput.getAttribute('value')).toBe('myStaticFieldValue');
  });
});
