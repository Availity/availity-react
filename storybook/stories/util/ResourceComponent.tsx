import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

type Props = {
  data: Record<string, unknown>;
  loading: boolean;
  title?: string;
};

const ResourceComponent = ({ data, loading, title = '' }: Props): JSX.Element => (
  <Card body>
    <CardTitle className="text-center" tag="h4">
      {title}
    </CardTitle>
    <CardBody>{loading ? 'Loading...' : <pre>{JSON.stringify(data, null, 2)}</pre>}</CardBody>
  </Card>
);

export default ResourceComponent;
