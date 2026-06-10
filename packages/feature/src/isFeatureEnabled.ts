import axios, { type AxiosResponse } from 'axios';

export type Features = string | Array<string | string[]>;

let featureCache: Promise<AxiosResponse<string[]>> | undefined;

export const getFeatureCache = () => featureCache;

async function isFeatureEnabled(features: Features): Promise<boolean> {
  featureCache = featureCache || axios.get<string[]>('features.json');

  let envFeatures: string[];
  try {
    const response = await featureCache;
    envFeatures = response.data || [];
  } catch {
    return true;
  }

  if (!envFeatures || envFeatures.length === 0) {
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
