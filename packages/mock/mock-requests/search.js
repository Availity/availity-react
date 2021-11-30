/* eslint-disable unicorn/prefer-array-some */
import { get } from 'lodash/get';

export default (fields, data) => (q) =>
  !q
    ? data
    : data.filter(
        (obj) =>
          fields.map((field) => get(obj, field)).filter((val) => val?.toLowerCase().indexOf(q.toLowerCase()) > -1)
            .length > 0
      );
