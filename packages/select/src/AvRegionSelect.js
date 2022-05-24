import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { avRegionsApi } from '@availity/api-axios';

import ResourceSelect from './ResourceSelect';

const RegionSelect = ResourceSelect.create({
  resource: avRegionsApi,
  labelKey: 'value',
  valueKey: 'id',
});

const searchBy = (prevOptions, inputValue) =>
  prevOptions.filter(
    (option) =>
      option.value.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0 ||
      option.id.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
  );

const AvRegionSelect = ({ defaultToCurrentRegion, name, ...props }) => {
  const { setFieldValue } = useFormikContext();

  const defaultRegion = useCallback(async () => {
    if (defaultToCurrentRegion) {
      try {
        const response = await avRegionsApi.getCurrentRegion();

        const value = response.data.regions[0];

        setFieldValue(name, value);
      } catch {
        // eslint-disable-next-line no-console
        console.warn('AvRegionSelect failed to load the current region');
      }
    }
  }, [defaultToCurrentRegion, setFieldValue, name]);

  useEffect(() => {
    defaultRegion();
  }, [defaultRegion]);

  return (
    <RegionSelect
      name={name}
      pageAll
      pageAllSearchBy={searchBy}
      getResult={(regions) => regions.map((region) => ({ id: region.id, value: region.value }))}
      {...props}
    />
  );
};

AvRegionSelect.propTypes = {
  defaultToCurrentRegion: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

export default AvRegionSelect;
