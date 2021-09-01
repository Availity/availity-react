import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, object, text } from '@storybook/addon-knobs';
import { Button } from 'reactstrap';

import * as yup from 'yup';
import '@availity/phone/src/validatePhone';

import { Phone } from '@availity/phone';
import README from '@availity/phone/README.md';

import FormikResults from '../mocks/FormikResults';
import { Preview } from '../util';

storiesOf('Components/Phone', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview,
    },
  })
  .addDecorator(withKnobs)
  .add('default', () => {
    const country = text('Country', 'US');
    const required = boolean('Required', false);
    const enablePhoneColProps = boolean('Enable Phone Col Props', false);
    const enableExtColProps = boolean('Enable Ext Col Props', false);
    const phoneColProps = object('Phone Column Props', { xs: { size: 9 } });
    const extColProps = object('Ext Column Props', { xs: { size: 3 } });

    return (
      <FormikResults
        initialValues={{
          phone: '',
          ext: '',
        }}
        validationSchema={yup.object().shape({
          phone: yup
            .string()
            .validatePhone(
              undefined,
              boolean('Strict Validation', false),
              country
            )
            .isRequired(required, 'This field is required.'),
          ext: yup.string().isRequired(required),
        })}
      >
        <Phone
          name="phone"
          label="Phone"
          country={country}
          showExtension={boolean('Show Extension', true)}
          phoneColProps={enablePhoneColProps ? phoneColProps : undefined}
          extProps={{
            name: 'ext',
            label: 'Ext.',
            extColProps: enableExtColProps ? extColProps : undefined,
          }}
        />
        <Button type="submit">Submit</Button>
      </FormikResults>
    );
  });
