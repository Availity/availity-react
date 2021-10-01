import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import { useEffectAsync } from '@availity/hooks';
import isFeatureEnabled from './isFeatureEnabled';

const Feature = ({ features, loader, whenDisabled, children, negate }) => {
  const [loading, setLoading] = useState(false);
  const [enabled, setEnabled] = useState(null);

  useEffectAsync(async () => {
    if (!loading) setLoading(true);

    const _enabled = await isFeatureEnabled(features);

    setEnabled(_enabled);

    setLoading(false);
  }, [features]);

  if (loading) {
    if (loader) return loader === true ? <BlockUi blocking /> : loader;
    return null;
  }
  const showChildren = enabled ^ negate; // eslint-disable-line no-bitwise
  if (showChildren) {
    return children;
  }

  return whenDisabled;
};

Feature.propTypes = {
  features: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string])),
    PropTypes.string,
  ]).isRequired,
  loader: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  whenDisabled: PropTypes.node,
  children: PropTypes.node,
  negate: PropTypes.bool,
};

Feature.defaultProps = {
  whenDisabled: null,
  children: null,
};

export default Feature;
