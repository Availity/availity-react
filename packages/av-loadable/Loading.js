import React from 'react';
import PropTypes from 'prop-types';

import Loader from 'react-block-ui/lib/Loader';
import { Button } from 'reactstrap';

const Loading = ({ pastDelay, error, timedOut, retry }) => {
  if (!pastDelay) return null;

  let text = 'Loading';
  if (error) {
    text = 'Error!';
  } else if (pastDelay) {
    text = 'Taking a long time';
  }

  const ShowButton = (error || timedOut) && (
    <div>
      <Button onClick={retry}>Retry</Button>
    </div>
  );
  const ShowLoader = !error && <Loader />;

  return (
    <div>
      {text}
      {ShowLoader}
      {ShowButton}
    </div>
  );
};

Loading.propTypes = {
  pastDelay: PropTypes.bool,
  error: PropTypes.object,
  timedOut: PropTypes.bool,
  retry: PropTypes.func,
};

export default Loading;
