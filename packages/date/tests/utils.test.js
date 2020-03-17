import moment from 'moment';
import * as UTILS from '../src/utils';

const ONE_DAY = 60 * 60 * 24 * 1000;

describe('utils', () => {
  describe('isOutsideRange', () => {
    it('returns false when inside range and limits are of type moment', () => {
      const min = moment().subtract(1, 'days');
      const max = moment().add(1, 'days');
      const day = moment();

      const isOutside = UTILS.isOutsideRange(min, max)(day);
      expect(isOutside).toBe(false);
    });

    it('returns true when outside range and limits are of type moment', () => {
      const min = moment().subtract(1, 'days');
      const max = moment().add(1, 'days');
      const day = moment().add(2, 'days');

      const isOutside = UTILS.isOutsideRange(min, max)(day);
      expect(isOutside).toBe(true);
    });

    it('returns false when inside range and limits are of type string', () => {
      const min = new Date(Date.now() - ONE_DAY).toISOString();
      const max = new Date(Date.now() + ONE_DAY).toISOString();
      const day = moment();

      const isOutside = UTILS.isOutsideRange(min, max)(day);
      expect(isOutside).toBe(false);
    });

    it('returns true when outside range and limits are of type string', () => {
      const min = new Date(Date.now() - ONE_DAY).toISOString();
      const max = new Date(Date.now() + ONE_DAY).toISOString();
      const day = moment().add(2, 'days');

      const isOutside = UTILS.isOutsideRange(min, max)(day);
      expect(isOutside).toBe(true);
    });

    it('returns false when date is same as max and max is string with no time parameter', () => {
      const min = '2019-12-12';
      const max = '2019-12-13';
      const day = moment('2019-12-13T12:00:00.000');
      const isOutside = UTILS.isOutsideRange(min, max)(day);
      expect(isOutside).toBe(false);
    });

    it('returns false when inside range and limits are of type object', () => {
      const min = { value: 1, units: 'days' };
      const max = { value: 1, units: 'days' };
      const day = moment();

      const isOutside = UTILS.isOutsideRange(min, max)(day);
      expect(isOutside).toBe(false);
    });

    it('returns true when outside range and limits are of type object', () => {
      const min = { value: 1, units: 'days' };
      const max = { value: 1, units: 'days' };
      const day = moment().add(2, 'days');

      const isOutside = UTILS.isOutsideRange(min, max)(day);
      expect(isOutside).toBe(true);
    });

    it('returns false for unknown arguments', () => {
      const min = null;
      const max = null;
      const day = moment();

      const isOutside = UTILS.isOutsideRange(min, max)(day);
      expect(isOutside).toBe(false);
    });
  });

  describe('buildYearPickerOptions', () => {
    it('renders correct options when min and max are moments', () => {
      const month = moment();
      const min = moment().subtract(2, 'years');
      const max = moment().add(2, 'years');

      const yearPicker = UTILS.buildYearPickerOptions(min, max, month);

      expect(yearPicker.length).toBe(max.year() - min.year() + 1);
    });

    it('renders correct options when min and max are objects with values and units', () => {
      const month = moment();
      const min = { value: 3, units: 'years' };
      const max = { value: 1, units: 'years' };

      const yearPicker = UTILS.buildYearPickerOptions(min, max, month);

      expect(yearPicker.length).toBe(
        moment()
          .add(max.value, max.units)
          .year() -
          moment()
            .subtract(min.value, min.units)
            .year() +
          1
      );
    });

    it('renders correct options when min and max are strings', () => {
      const month = moment();
      const min = '01/01/1999';
      const max = '12/31/2020';

      const minMoment = moment(min, [
        'YYYY-MM-DD',
        'MM/DD/YYYY',
        'MMDDYYYY',
        'YYYYMMDD',
      ]);

      const maxMoment = moment(max, [
        'YYYY-MM-DD',
        'MM/DD/YYYY',
        'MMDDYYYY',
        'YYYYMMDD',
      ]);

      const yearPicker = UTILS.buildYearPickerOptions(min, max, month);

      expect(yearPicker.length).toBe(maxMoment.year() - minMoment.year() + 1);
    });

    it('renders correct options when current month.year() > max', () => {
      const month = moment().add(2, 'years');
      const min = moment().subtract(1, 'years');
      const max = moment().add(1, 'years');

      const yearPicker = UTILS.buildYearPickerOptions(min, max, month);

      expect(yearPicker.length).toBe(month.year() - min.year() + 1);
      expect(yearPicker.length).not.toBe(max.year() - min.year() + 1);
      expect(yearPicker[yearPicker.length - 1].value).toBe(month.year());
    });

    it('renders correct options current month.year() < min', () => {
      const month = moment().subtract(2, 'years');
      const min = moment().subtract(1, 'years');
      const max = moment().add(1, 'years');

      const yearPicker = UTILS.buildYearPickerOptions(min, max, month);

      expect(yearPicker.length).toBe(max.year() - month.year() + 1);
      expect(yearPicker.length).not.toBe(max.year() - min.year() + 1);
      expect(yearPicker[0].value).toBe(month.year());
    });
  });
});
