import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { Label, Button } from 'reactstrap';
import { AvGroup, AvFeedback } from 'availity-reactstrap-validation';
import { text, boolean, select } from '@storybook/addon-knobs';
import AvFormResults from './mocks/AvFormResults';

import AvDate, {
  AvDateField,
  AvDateRange,
  AvDateRangeField,
} from '@availity/reactstrap-validation-date';
import README from '@availity/reactstrap-validation-date/README.md';

const types = {
  text: 'text',
  date: 'date',
};
storiesOf('AvDate', module)
  .addDecorator(withReadme([README]))
  .add('default', () => (
    <AvFormResults>
      <AvDate
        min={text('Min Date (yyyy-mm-dd)')}
        max={text('Max Date (yyyy-mm-dd)')}
        type={select('Type', types, 'text')}
        name="standAlone"
        aria-label="stand-alone"
        required={boolean('Required', false)}
        disabled={boolean('Disabled', false)}
        datepicker={boolean('Has DatePicker', true)}
      />
      <Button className="mt-3" color="primary">
        Submit
      </Button>
    </AvFormResults>
  ))
  .add('default (with own label)', () => (
    <AvFormResults>
      <AvGroup>
        <Label for="standAloneWithLabel">{text('Label', 'AvDate Label')}</Label>
        <AvDate
          min={text('Min Date (yyyy-mm-dd)')}
          max={text('Max Date (yyyy-mm-dd)')}
          type={select('Type', types, 'text')}
          name="standAlone"
          aria-label="stand-alone"
          required={boolean('Required', false)}
          disabled={boolean('Disabled', false)}
          datepicker={boolean('Has DatePicker', true)}
        />
        <AvFeedback>
          {text('Error Message', 'This field is invalid')}
        </AvFeedback>
      </AvGroup>
      <Button color="primary">Submit</Button>
    </AvFormResults>
  ))
  .add('AvDateField', () => {
    const required = boolean('Required', false);
    return (
      <AvFormResults>
        <AvDateField
          label={text('Label', 'Field Label')}
          min={text('Min Date (yyyy-mm-dd)')}
          max={text('Max Date (yyyy-mm-dd)')}
          type={select('Type', types, 'text')}
          name="AvDateField"
          required={boolean('Required', false)}
          disabled={boolean('Disabled', false)}
          datepicker={boolean('Has DatePicker', true)}
          errorMessage={text('Generic Error Message', 'This field is invalid')}
          validate={{
            required: {
              value: required,
              errorMessage:
                required &&
                text('Required Error Message', 'This field is required'),
            },
          }}
        />
        <Button color="primary">Submit</Button>
      </AvFormResults>
    );
  })
  .add('AvDateRange', () => {
    const required = boolean('Required', false);
    return (
      <AvFormResults>
        <AvDateRange
          name="AvDateRange"
          type={select('Type', types, 'text')}
          start={{ name: 'date.start' }}
          end={{ name: 'date.end' }}
          min={text('Min Date (yyyy-mm-dd)')}
          max={text('Max Date (yyyy-mm-dd)')}
          required={boolean('Required', false)}
          disabled={boolean('Disabled', false)}
          errorMessage={text('Generic Error Message', 'This field is invalid')}
          validate={{
            required: {
              value: required,
              errorMessage:
                required &&
                text('Required Error Message', 'This field is required'),
            },
          }}
        />
        <Button color="primary">Submit</Button>
      </AvFormResults>
    );
  })
  .add('AvDateRangeField', () => {
    const required = boolean('Required', false);
    return (
      <AvFormResults>
        <AvDateRangeField
          label={text('Label', 'Date Range')}
          name="AvDateRange"
          type={select('Type', types, 'text')}
          start={{ name: 'date.start', required }}
          end={{ name: 'date.end', required }}
          min={text('Min Date (yyyy-mm-dd)')}
          max={text('Max Date (yyyy-mm-dd)')}
          required={boolean('Required', false)}
          disabled={boolean('Disabled', false)}
          errorMessage={text('Generic Error Message', 'This field is invalid')}
          validate={{
            required: {
              value: required,
              errorMessage:
                required &&
                text('Required Error Message', 'This field is required'),
            },
          }}
        />
        <Button color="primary">Submit</Button>
      </AvFormResults>
    );
  });
