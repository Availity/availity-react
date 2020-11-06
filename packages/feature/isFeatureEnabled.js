import axios from 'axios';

let featureCache;

export const getFeatureCache = () => featureCache;

async function isFeatureEnabled(features) {
  featureCache = featureCache || axios.get('features.json');

  let envFeatures;
  try {
    envFeatures = (await featureCache).data || [];
  } catch {
    return true;
  }
  // eslint-disable-next-line unicorn/explicit-length-check
  if (!envFeatures || !envFeatures.length) {
    return true;
  }

  const featuresSets = Array.isArray(features) ? features : [features];

  return featuresSets.some((featureSet) => {
    if (Array.isArray(featureSet)) {
      return featureSet.every((feature) => envFeatures.indexOf(feature) === -1);
    }
    return envFeatures.indexOf(featureSet) === -1;
  });
}

export default isFeatureEnabled;
