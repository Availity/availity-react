import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BlockUi from '@availity/block-ui';
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
  /** Can either be a string, eg: "AV-1234" or an array containing feature ID strings as well as other arrays which contain feature ID strings,
   * eg: ['AV-1234', 'AV-2345', ['AV-3456', 'AV-4567'], ['AV-5678', 'AV-6789']].
   * The items in a nested array indicate feature IDs that must all be enabled for a feature to be considered enabled (see children) - they act as "AND".
   * The items in the top of the array act as "OR" - if any are enabled, the feature is considered enabled.
   * The example ['AV-1234', 'AV-2345', ['AV-3456', 'AV-4567'], ['AV-5678', 'AV-6789']] is similar to 'AV-1234' OR 'AV-2345' OR ('AV-3456' && 'AV-4567') OR ('AV-5678' && 'AV-6789'). */
  features: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string])),
    PropTypes.string,
  ]).isRequired,
  /** When true, BlockUi is used when loading the features.
   * When a node, that node is rendered instead of BlockUi when loading the features.
   * When false, nothing is rendered when loading the features. Default: true. */
  loader: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  /** The content that renders when the features are disabled. */
  whenDisabled: PropTypes.node,
  /** The content that renders when the features are enabled. */
  children: PropTypes.node,
  /** Negate the feature. If the feature specified is enabled, it acts as if it were disabled (by rendering the whenDisabled prop content).
   * If the feature specified is disabled, it acts as if it were enabled (by rendering the children prop content). */
  negate: PropTypes.bool,
};

Feature.defaultProps = {
  whenDisabled: null,
  children: null,
};

export default Feature;
