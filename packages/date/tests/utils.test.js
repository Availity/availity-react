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
});
