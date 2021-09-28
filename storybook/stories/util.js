import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardTitle } from 'reactstrap';

export const Preview = ({ children }) => (
  <React.Suspense fallback={<div className="text-center">Loading...</div>}>{children}</React.Suspense>
);

Preview.propTypes = {
  children: PropTypes.node,
};

export const ResourceComponent = ({ data, loading, title = '' }) => (
  <Card body>
    <CardTitle className="text-center" tag="h4">
      {title}
    </CardTitle>
    <CardBody>{loading ? 'Loading...' : <pre>{JSON.stringify(data, null, 2)}</pre>}</CardBody>
  </Card>
);

ResourceComponent.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  title: PropTypes.string,
};
