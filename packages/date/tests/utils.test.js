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
    it('renders correct options based on minYear and maxYear', () => {
      const month = moment();
      const minYear = 2019;
      const maxYear = 2020;

      const yearPicker = UTILS.buildYearPickerOptions(minYear, maxYear, month);

      expect(yearPicker.length).toBe(maxYear - minYear + 1);
    });

    it('renders correct options when current month.year() > maxYear', () => {
      const month = moment().add(2, 'years');
      const minYear = 2019;
      const maxYear = 2020;

      const yearPicker = UTILS.buildYearPickerOptions(minYear, maxYear, month);

      expect(yearPicker.length).toBe(month.year() - minYear + 1);
      expect(yearPicker.length).not.toBe(maxYear - minYear + 1);
      expect(yearPicker[yearPicker.length - 1].value).toBe(month.year());
    });

    it('renders correct options current month.year() < minYear', () => {
      const month = moment().subtract(2, 'years');
      const minYear = 2019;
      const maxYear = 2020;

      const yearPicker = UTILS.buildYearPickerOptions(minYear, maxYear, month);

      expect(yearPicker.length).toBe(maxYear - month.year() + 1);
      expect(yearPicker.length).not.toBe(maxYear - minYear + 1);
      expect(yearPicker[0].value).toBe(month.year());
    });
  });
});
