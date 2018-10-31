import Loadable from 'react-loadable';

import Loading from './Loading';

function AvLoadable(opts) {
  return Loadable(
    Object.assign(
      {
        loading: Loading,
      },
      opts
    )
  );
}

export default AvLoadable;
