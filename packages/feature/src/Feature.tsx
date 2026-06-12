import React, { useState } from 'react';
import BlockUi from '@availity/block-ui';
import { useEffectAsync } from '@availity/hooks';
import isFeatureEnabled, { type Features } from './isFeatureEnabled';

export interface FeatureProps {
  /** Can either be a string, eg: "AV-1234" or an array containing feature ID strings as well as other arrays which contain feature ID strings.
   * Nested arrays act as "AND", top-level items act as "OR". */
  features: Features;
  /** When true, BlockUi is used when loading. When a node, that node is rendered instead. When false, nothing renders while loading. */
  loader?: boolean | React.ReactNode;
  /** Content rendered when features are disabled. */
  whenDisabled?: React.ReactNode;
  /** Content rendered when features are enabled. */
  children?: React.ReactNode;
  /** Negate the feature check result. */
  negate?: boolean;
}

const Feature = ({ features, loader, whenDisabled = null, children = null, negate }: FeatureProps) => {
  const [loading, setLoading] = useState(false);
  const [enabled, setEnabled] = useState<boolean | null>(null);

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

  const showChildren = (enabled as unknown as number) ^ (negate as unknown as number); // eslint-disable-line no-bitwise
  if (showChildren) {
    return children;
  }

  return whenDisabled;
};

export default Feature;
