# @availity/reactstrap-validation-date

> Wrapper for react-date-range to work with availity-reactstrap-validation.

## Installation

```bash
npm install @availity/reactstrap-validation-date availity-reactstrap-validation reactstrap react --save
```

### Usage

```javascript
import React from 'react';
import { Label } from 'reactstrap';
import { AvForm, AvGroup, AvFeedback } from 'availity-reactstrap-validation';
import AvDate, { AvDateField, AvDateRange, AvDateRangeField } from '@availity/reactstrap-validation-date';
import '@availity/reactstrap-validation-date/styles.scss';
// ...
<AvForm>
    <AvGroup>
        <Label for="justTheDate">My Input Label</Label>
        <AvDate name="justTheDate" required />
        <AvFeedback>Some error message</AvFeedback>
    </AvGroup>

    <AvDateField
        name="fieldWithLabel"
        label="Label Made For Me"
        required
    />

    <AvGroup>
        <Label for="justTheDateRange">My Input Label</Label>
        <AvDateRange name="justTheDateRange" required />
        <AvFeedback>Some error message</AvFeedback>
    </AvGroup>

    <AvDateField
        name="DateRangeWithLabel"
        label="Label Made For Me"
        required
    />
</AvForm>;
```

Note: the input callbacks (e.g. onChange) do not get called with an event like other reactstrap-validation component; just the value of the field. This is because the underlying date picker does not return the event in it's callbacks.

### AvDate (Default export)

This is the underlying date without the `AvGroup`, `Label` or `AvFeedback`

#### AvDate Props

See availity-reactstrap-validation for additional props, such as `name`, `validate`, `min`, `max`, and more.

*   **`datepicker`**: Boolean. Optional. Default: `true`. If `true`, the date picker button will be shown, clicking it activates the datepicker calendar. If `false`, only the date input field will be displayed (useful for date of birth fields).
*   **`calendarIcon`**: Node. Optional. Default: `<Icon name="calendar" />`. You can optional change the icon the calendar renders in the case you don't use the `availity-uikit` icons.

#### AvDate Example usage

```javascript
import React from 'react';
import { Label } from 'reactstrap';
import { AvForm, AvGroup, AvFeedback } from 'availity-reactstrap-validation';
import AvDate from '@availity/reactstrap-validation-date';
// ...
<AvForm>
    <AvGroup>
        <Label for="justFieldAndPicker">My Input Label</Label>
        <AvDate
            name="justFieldAndPicker"
            required
        />
        <AvFeedback>Some error message</AvFeedback>
    </AvGroup>
</AvForm>;
```

### AvDateField

Like `AvField`, but for dates with a date picker

#### AvDateField Props

See availity-reactstrap-validation for additional props, such as `name`, `validate`, `min`, `max`, and more.

*   **`datepicker`**: Boolean. Optional. Default: `true`. If `true`, the date picker button will be shown, clicking it activates the datepicker calendar. If `false`, only the date input field will be displayed (useful for date of birth fields).

#### AvDateField Example usage

```javascript
import React from 'react';
import { AvDateField } from '@availity/reactstrap-validation-date';
// ...
<AvForm>
    <AvDateField
        name="fieldWithLabel"
        label="Label Made For Me"
        required
    />
</AvForm>;
```

### AvDateRange

A date range, consists of 2 fields, a start date and an end date.
This is the underlying date-range without the `AvGroup`, `Label` or `AvFeedback`. 

#### AvDateRange Props

See availity-reactstrap-validation for additional props, such as `name`, `validate`, `min`, `max`, and more.

*   **`ranges`**: Object or Array. Optional. Default: `['Last 7 Days','Last 30 Days','Last Calendar Month','Last 120 Days','Last 6 Months','Last 12 Months']`. Controls the preset range options which allows the user to easily select predefined ranges. If an array, the array *must* be a subset of the default array, any string not in the array will be omitted. If an object, the keys will be the display text and the value will be an object containing `startDate` and `endDate` *function* which will be called with the current date moment object and are expected to return the start and end dates respectfully.
*   **`start`**: Object. Required. and object which will be spread on the start date input. It must contain the `name` prop as required by availity-reactstrap-validation. It can contain additional validations as well.
*   **`end`**: Object. Required. and object which will be spread on the end date input. It must contain the `name` prop as required by availity-reactstrap-validation. It can contain additional validations as well.
*   **`distance`**: Object. Optional. Object containing the `min` and `max` distance the start and end dates are allowed to be apart from each other. See example below.
*   **`calendarIcon`**: Node. Optional. Default: `<Icon name="calendar" />`. You can optional change the icon the calendar renders in the case you don't use the `availity-uikit` icons.

#### AvDateRange Example usage

```javascript
import React from 'react';
import AvApi from '@availity/api-axios';
import { AvResourceDate } from '@availity/reactstrap-validation-date';
import '@availity/reactstrap-validation-date/styles.scss';
// ...
const avCustomResource = new AvApi({ name: 'my-custom-resource' });
// ...
<AvForm>
    <AvDateRange
        start={{name: 'date.start'}}
        end={{name: 'date.end'}}
        resource={avCustomResource}
        distance={{
            min: {
                value: 3,
                units: 'days'
            },
            max: {
                value: 1,
                units: 'month'
            }
        }}
        ranges={{
            'Last 10 Days': {
                startDate: now => now.add(-9, 'd'),
                endDate: now => now,
            },
            'Last 20 Days': {
                startDate: now => now.add(-19, 'd'),
                endDate: now => now,
            },
            'Tomorrow': {
                startDate: now => now.add(1, 'd'),
                endDate: now => now.add(1, 'd'),
            },
        }}
        required
    />
</AvForm>;
```

### AvDateRangeField

Like `AvField`, but for a date range with a date range picker

#### AvDateRangeField Props

See availity-reactstrap-validation for additional props, such as `name`, `label`, `validate`, `min`, `max`, and more.

*   **`ranges`**: Object or Array. Optional. Default: `['Last 7 Days','Last 30 Days','Last Calendar Month','Last 120 Days','Last 6 Months','Last 12 Months']`. Controls the preset range options which allows the user to easily select predefined ranges. If an array, the array *must* be a subset of the default array, any string not in the array will be omitted. If an object, the keys will be the display text and the value will be an object containing `startDate` and `endDate` *function* which will be called with the current date moment object and are expected to return the start and end dates respectfully.
*   **`start`**: Object. Required. and object which will be spread on the start date input. It must contain the `name` prop as required by availity-reactstrap-validation. It can contain additional validations as well.
*   **`end`**: Object. Required. and object which will be spread on the end date input. It must contain the `name` prop as required by availity-reactstrap-validation. It can contain additional validations as well.
*   **`distance`**: Object. Optional. Object containing the `min` and `max` distance the start and end dates are allowed to be apart from each other. See example below.

#### AvDateRangeField Example usage

```javascript
import React from 'react';
import AvApi from '@availity/api-axios';
import { AvResourceDate } from '@availity/reactstrap-validation-date';
import '@availity/reactstrap-validation-date/styles.scss';
// ...
const avCustomResource = new AvApi({ name: 'my-custom-resource' });
// ...
<AvForm>
    <AvDateRange
        label="Dates of Service"
        start={{name: 'date.start'}}
        end={{name: 'date.end'}}
        resource={avCustomResource}
        distance={{
            min: {
                value: 3,
                units: 'days'
            },
            max: {
                value: 1,
                units: 'month'
            }
        }}
        ranges={{
            'Last 10 Days': {
                startDate: now => now.add(-9, 'd'),
                endDate: now => now,
            },
            'Last 20 Days': {
                startDate: now => now.add(-19, 'd'),
                endDate: now => now,
            }
        }}
        required
    />
</AvForm>;
```