import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs/react';

import * as yup from 'yup';
import '@availity/phone/src/validatePhone';

import Phone from '@availity/phone';
import README from '@availity/phone/README.md';
import { Button } from 'reactstrap';
import FormikResults from './mocks/FormikResults';

storiesOf('Formik|Phone', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      // eslint-disable-next-line react/prop-types
      StoryPreview: ({ children }) => <div>{children}</div>,
    },
  })
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <FormikResults
        initialValues={{
          phone: '',
          ext: '',
        }}
        validationSchema={yup.object().shape({
          phone: yup
            .string()
            .validatePhone()
            .isRequired(boolean('Required', false), 'This field is required.'),
          ext: yup.string(),
        })}
      >
        <Phone
          name="phone"
          label="Phone"
          country={text('Country', 'US')}
          showExtension={boolean('Show Extension', true)}
          phoneColProps={{ xs: { size: 9 } }}
          extProps={{
            name: 'ext',
            label: 'Ext.',
            extColProps: {
              xs: { size: 3 },
            },
          }}
        />
        <Button type="submit">Submit</Button>
      </FormikResults>
    );
  });
