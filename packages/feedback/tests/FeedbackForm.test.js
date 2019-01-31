import React from 'react';
import renderer from 'react-test-renderer';
import { FeedbackForm } from '..';

describe('Feedback', () => {
  test('should render', () => {
    const component = renderer.create(<FeedbackForm name="Payer Space" />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should indicate active smiley', () => {
    const component = renderer.create(<FeedbackForm name="Payer Space" />);
    component.getInstance().setActive('smiley');
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  test('should set the feedback text value', () => {
    const component = renderer.create(<FeedbackForm name="Payer Space" />);
    component
      .getInstance()
      .setTextFeedback({ target: { value: 'some good text here' } });
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
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
    const component = renderer.create(
      <FeedbackForm name="Payer Space" faceOptions={faceOptions} />
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
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
    const component = renderer.create(
      <FeedbackForm name="Payer Space" aboutOptions={aboutOptions} />
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
