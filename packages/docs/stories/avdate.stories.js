import React from 'react';
import { storiesOf } from '@storybook/react';
import { Label, Button } from 'reactstrap';
import { AvGroup, AvFeedback } from 'availity-reactstrap-validation';
import { text, boolean, select, number } from '@storybook/addon-knobs';
import AvDate, {
  AvDateField,
  AvDateRange,
  AvDateRangeField,
} from '@availity/reactstrap-validation-date';
import README from '@availity/reactstrap-validation-date/README.md';
import AvFormResults from './mocks/AvFormResults';
import '@availity/reactstrap-validation-date/styles.scss';

const types = {
  text: 'text',
  date: 'date',
};
storiesOf('Components|AvDate', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      // eslint-disable-next-line react/prop-types
      StoryPreview: ({ children }) => <div>{children}</div>,
    },
  })
  .add('default', () => (
    <AvFormResults>
      <AvDate
        min={text('Min Date (yyyy-mm-dd)')}
        max={text('Max Date (yyyy-mm-dd)')}
        type={select('Type', types, 'text')}
        name="standAlone"
        required={boolean('Required', false)}
        disabled={boolean('Disabled', false)}
        datepicker={boolean('Has DatePicker', true)}
      />
      <Button className="mt-3" color="primary">
        Submit
      </Button>
    </AvFormResults>
  ))
  .add('with label', () => (
    <AvFormResults>
      <AvGroup>
        <Label for="standAloneWithLabel">{text('Label', 'AvDate Label')}</Label>
        <AvDate
          min={text('Min Date (yyyy-mm-dd)')}
          max={text('Max Date (yyyy-mm-dd)')}
          type={select('Type', types, 'text')}
          name="standAlone"
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
    const min = text('Min Date (yyyy-mm-dd)');
    return (
      <AvFormResults>
        <AvDateField
          label={text('Label', 'Field Label')}
          min={min}
          max={text('Max Date (yyyy-mm-dd)')}
          type={select('Type', types, 'text')}
          name="AvDateField"
          required={boolean('Required', false)}
          disabled={boolean('Disabled', false)}
          datepicker={boolean('Has DatePicker', true)}
          errorMessage={text('Generic Error Message', 'This field is invalid')}
          distance={{
            max: {
              value: 90,
              units: 'days',
            },
          }}
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
          datepicker={boolean('Has DatePicker', true)}
        />
        <Button color="primary">Submit</Button>
      </AvFormResults>
    );
  })
  .add('AvDateRangeField', () => {
    const distanceUnits = ['days', 'month'];

    const required = boolean('Required', false);
    const minDistance = number('Min Distance');
    const maxDistance = number('Max Distance');

    let minDistanceUnits;
    let maxDistanceUnits;
    if (minDistance) {
      minDistanceUnits = select('Min Distance Units', distanceUnits, 'days');
    }
    if (maxDistance) {
      maxDistanceUnits = select('Max Distance Units', distanceUnits, 'days');
    }

    const min = minDistance &&
      minDistanceUnits && {
        value: minDistance,
        units: minDistanceUnits,
      };

    const max = maxDistance &&
      maxDistanceUnits && {
        value: maxDistance,
        units: maxDistanceUnits,
      };

    const distance = (min || max) && { min, max };

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
          distance={distance}
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
          datepicker={boolean('Has DatePicker', true)}
        />
        <Button color="primary">Submit</Button>
      </AvFormResults>
    );
  });
