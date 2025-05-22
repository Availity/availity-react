export const isEssentialsUrl = (url) => /(test|qa(p?)-)?essentials\.availity\.com/.test(url);

/** If absolute or loadApp is disabled, return url. Otherwise loadappify the url */
export const getUrl = (url = '', loadApp = false, absolute = false) => {
  // if ((absolute || !loadApp) && !isEssentialsUrl(url)) return url;
  if (absolute || !loadApp) return url;

  return `/public/apps/home/#!/loadApp?appUrl=${encodeURIComponent(url)}`;
};

/** Return a valid target based on what is passed in */
export const getTarget = (target) => {
  // should start with _, otherwise it is specifying a specific frame name
  // _blank = new tab/window, _self = same frame, _parent = parent frame (use for home page from modals), _top = document body, framename = specific frame
  if (target && !target.startsWith('_')) {
    // Thanos uses BODY
    // 'newBody' hard-coded in spaces -> should we keep this logic?
    if (target === 'BODY' || target === 'newBody') {
      return '_self';
    }
    if (target === 'TAB') {
      return '_blank';
    }
  }

  return target || '_self';
};

/** Takes href and transforms it so that we can compare hostnames and other properties */
export const getLocation = (href) => {
  const location = document.createElement('a');
  location.href = href;
  return location;
};

export const getRel = (url, target, absolute) => {
  if (target === '_blank' && absolute) {
    const dest = getLocation(url);
    if (dest.hostname !== window.location.hostname) {
      // default rel when linking to external destinations for performance and security
      return 'noopener noreferrer';
    }
  }
  // eslint-disable-next-line unicorn/no-useless-undefined
  return undefined;
};
