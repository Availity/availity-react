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
import '@availity/reactstrap-validation-date/styles.scss';
import AvFormResults from '../mocks/AvFormResults';
import { Preview } from '../util';

const types = {
  text: 'text',
  date: 'date',
};

storiesOf('Legacy Form Components/AvDate', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview,
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

    const distanceUnits = ['day', 'month'];

    const minDistance = number('Min Distance');
    const maxDistance = number('Max Distance');

    let minDistanceUnits;
    let maxDistanceUnits;
    if (minDistance) {
      minDistanceUnits = select('Min Distance Units', distanceUnits, 'day');
    }
    if (maxDistance) {
      maxDistanceUnits = select('Max Distance Units', distanceUnits, 'day');
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

    const baseStart = {
      name: 'date.start',
    };
    const baseEnd = {
      name: 'date.end',
    };

    const hasDefaultStart = boolean('Has Default Start Date', false);
    const defaultStartDate =
      hasDefaultStart && text('Default Start Date (yyyy-mm-dd)', '2019-01-01');
    const hasDefaultEnd = boolean('Has Default End Date', false);
    const defaultEndDate =
      hasDefaultEnd && text('Default End Date (yyyy-mm-dd)', '2019-12-31');

    if (defaultStartDate) {
      baseStart.value = defaultStartDate;
    }
    if (defaultEndDate) {
      baseEnd.value = defaultEndDate;
    }

    return (
      <AvFormResults>
        <AvDateRange
          name="AvDateRange"
          type={select('Type', types, 'text')}
          start={baseStart}
          end={baseEnd}
          min={text('Min Date (yyyy-mm-dd)')}
          max={text('Max Date (yyyy-mm-dd)')}
          required={boolean('Required', false)}
          disabled={boolean('Disabled', false)}
          autoSync={boolean('Auto Sync', false)}
          distance={distance}
          ranges={boolean('ranges', false)}
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
    const distanceUnits = ['day', 'month'];

    const required = boolean('Required', false);
    const minDistance = number('Min Distance');
    const maxDistance = number('Max Distance');

    let minDistanceUnits;
    let maxDistanceUnits;
    if (minDistance) {
      minDistanceUnits = select('Min Distance Units', distanceUnits, 'day');
    }
    if (maxDistance) {
      maxDistanceUnits = select('Max Distance Units', distanceUnits, 'day');
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

    const baseStart = {
      name: 'date.start',
    };
    const baseEnd = {
      name: 'date.end',
    };

    const hasDefaultStart = boolean('Has Default Start Date', false);
    const defaultStartDate =
      hasDefaultStart && text('Default Start Date (yyyy-mm-dd)', '2019-01-01');
    const hasDefaultEnd = boolean('Has Default End Date', false);
    const defaultEndDate =
      hasDefaultEnd && text('Default End Date (yyyy-mm-dd)', '2019-12-31');

    if (defaultStartDate) {
      baseStart.value = defaultStartDate;
    }
    if (defaultEndDate) {
      baseEnd.value = defaultEndDate;
    }

    return (
      <AvFormResults>
        <AvDateRangeField
          label={text('Label', 'Date Range')}
          name="AvDateRange"
          type={select('Type', types, 'text')}
          start={baseStart}
          end={baseEnd}
          min={text('Min Date (yyyy-mm-dd)')}
          max={text('Max Date (yyyy-mm-dd)')}
          distance={distance}
          ranges={boolean('ranges', false)}
          required={boolean('Required', false)}
          disabled={boolean('Disabled', false)}
          autoSync={boolean('Auto Sync', false)}
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
