import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { avLogMessagesApi, avRegionsApi } from '@availity/api-axios';
import { FeedbackForm } from '..';

jest.mock('@availity/api-axios');

jest.useFakeTimers();

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

afterEach(cleanup);

describe('FeedbackForm', () => {
  beforeEach(() => {
    // reset log messages api mock
    avLogMessagesApi.info.mockClear();
    avLogMessagesApi.info = jest.fn(() => Promise.resolve());
  });
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

    expect(smileyFeedbackField.parentElement.className).toContain('btn-primary');

    expect(smileyFeedbackField.parentElement).toHaveAttribute('aria-pressed', 'true');
  });

  test('should submit with feedback text value', async () => {
    const onFeedbackSent = jest.fn();

    const { getByLabelText, getByText } = render(<FeedbackForm onFeedbackSent={onFeedbackSent} name="Payer Space" />);

    // Simulate the Click
    fireEvent.click(getByText('Smiley face'));

    // Get the Input Node for the Feedback
    const feedbackNode = getByLabelText('What do you like?');

    // Simulate a user typing the value below into the field
    fireEvent.change(feedbackNode, {
      target: { value: 'some good text here' },
    });

    // Check if the Input Got Updated
    expect(feedbackNode.value).toEqual('some good text here');

    fireEvent.click(getByText('Send Feedback'));

    await waitFor(
      () => {
        expect(onFeedbackSent).toHaveBeenCalledWith(
          expect.objectContaining({
            active: 'smile',
            feedback: 'some good text here',
          })
        );
      },
      { timeout: 2500 }
    );
  });

  test('should submit and disable button when clicked', async () => {
    // mock log messages api to return a promise that resolves after 3 seconds
    avLogMessagesApi.info = jest.fn(() => new Promise((resolve) => setTimeout(resolve, 3000)));
    const { getByLabelText, getByText } = render(<FeedbackForm name="Payer Space" />);

    // Simulate the Click
    fireEvent.click(getByText('Smiley face'));

    // Get the Input Node for the Feedback
    const feedbackNode = getByLabelText('What do you like?');

    // Simulate a user typing the value below into the field
    fireEvent.change(feedbackNode, {
      target: { value: 'some good text here' },
    });

    // find the submit button
    const submitButton = getByText('Send Feedback');
    // click the submit button twice
    fireEvent.click(submitButton);
    // wait for the button to be disabled
    await waitFor(() => expect(submitButton).toBeDisabled());
    fireEvent.click(submitButton);
    // wait for log messages to have been called once
    await waitFor(() => expect(avLogMessagesApi.info).toHaveBeenCalledTimes(1));

    // wait for success message to show
    await waitFor(() => expect(getByText('Thank you for your feedback.')).toBeInTheDocument(), { timeout: 5000 });
  });

  test('should submit with feedback text value when enter is pressed', async () => {
    const onFeedbackSent = jest.fn();

    const { getByLabelText, getByText } = render(<FeedbackForm onFeedbackSent={onFeedbackSent} name="Payer Space" />);

    // Simulate the Click
    fireEvent.click(getByText('Smiley face'));

    // Get the Input Node for the Feedback
    const feedbackNode = getByLabelText('What do you like?');

    // Simulate a user typing the value below into the field
    fireEvent.change(feedbackNode, {
      target: { value: 'some good text here' },
    });

    // Check if the Input Got Updated
    expect(feedbackNode.value).toEqual('some good text here');

    fireEvent.keyDown(getByText('Send Feedback'), {
      key: 'Enter',
      keyCode: 13,
    });

    await waitFor(
      () => {
        expect(onFeedbackSent).toHaveBeenCalledWith(
          expect.objectContaining({
            active: 'smile',
            feedback: 'some good text here',
          })
        );
      },
      { timeout: 2500 }
    );
  });

  test('should submit with custom analytics', async () => {
    const infoFn = jest.fn();
    const onFeedbackSent = jest.fn();

    const { getByLabelText, getByText } = render(
      <FeedbackForm
        onFeedbackSent={onFeedbackSent}
        name="Payer Space"
        analytics={{
          info: infoFn,
        }}
      />
    );

    // Simulate the Click
    fireEvent.click(getByText('Smiley face'));

    // Get the Input Node for the Feedback
    const feedbackNode = getByLabelText('What do you like?');

    // Simulate a user typing the value below into the field
    fireEvent.change(feedbackNode, {
      target: { value: 'some good text here' },
    });

    // Check if the Input Got Updated
    expect(feedbackNode.value).toEqual('some good text here');

    fireEvent.click(getByText('Send Feedback'));

    await waitFor(() => expect(infoFn).toHaveBeenCalledTimes(1));
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

    const { getByTestId } = render(<FeedbackForm name="Payer Space" faceOptions={faceOptions} />);

    const faceOptionFields = getByTestId('face-options');

    expect(faceOptionFields.childElementCount).toBe(4);

    for (const faceOption of faceOptions) {
      expect(faceOptionFields.getElementsByClassName(`icon-${faceOption.icon}`)).not.toBe(null);
    }
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
    const { getByText } = render(<FeedbackForm name="Payer Space" aboutOptions={aboutOptions} />);

    // Simulate the Click First
    fireEvent.click(getByText('Smiley face'));

    // Label text on the Select Field to know we rendered it
    expect(getByText('This is about')).toBeDefined();
  });

  test('should render custom label when provided', async () => {
    const { getByText } = render(
      <FeedbackForm
        name="Test Space"
        aboutOptions={[
          { label: 'Payer 1', value: 'payer1' },
          { label: 'Payer 2', value: 'payer2' },
          { label: 'Payer 3', value: 'payer3' },
          { label: 'Payer 4', value: 'payer4' },
        ]}
        aboutLabel="Select payer..."
      />
    );

    fireEvent.click(getByText('Meh face'));
    expect(getByText('Select payer...')).toBeDefined();
  });

  test('should render additional comments input', () => {
    const { getByText } = render(<FeedbackForm name="Payer Space" additionalComments />);

    fireEvent.click(getByText('Smiley face'));

    expect(getByText('Additional Comments... (Optional)')).toBeDefined();
  });

  test('should show support', () => {
    const { getByText } = render(<FeedbackForm name="Payer Space" showSupport additionalComments />);

    expect(getByText('Open a support ticket')).toBeDefined();
  });

  test('should render default heading as div with stylings of h5', () => {
    const { getByText } = render(<FeedbackForm name="Payer Space" />);

    const header = getByText('Tell us what you think about Payer Space');

    expect(header.parentElement).toHaveClass('h5');
    expect(header.parentElement).toHaveAttribute('role', 'heading');
    expect(header.parentElement).toHaveAttribute('aria-level', '2');
    expect(header.tagName).toEqual('DIV');
  });

  test('should have smileys in a group element', () => {
    const { getByTestId } = render(<FeedbackForm name="Payer Space" />);

    const smileyGroup = getByTestId('face-options');

    expect(smileyGroup).toHaveAttribute('role', 'group');
    expect(smileyGroup).toHaveAttribute('aria-labelledby', 'feedback-form-header');
  });

  test('should focus first SmileField button by default', async () => {
    const { getByText } = render(<FeedbackForm name="Payer Space" />);

    const firstFeedbackButton = getByText('Smiley face').closest('button');
    await waitFor(() => {
      expect(firstFeedbackButton).toHaveFocus();
    });
  });

  test('should not focus first SmileField button if autofocus is set to false', async () => {
    const { getByText } = render(<FeedbackForm name="Payer Space" autoFocusFeedbackButton={false} />);

    const firstFeedbackButton = getByText('Smiley face').closest('button');
    await waitFor(() => {
      expect(firstFeedbackButton).not.toHaveFocus();
    });
  });
});
