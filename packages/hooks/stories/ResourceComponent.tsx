import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

type Props<TData> = {
  data: TData;
  loading: boolean;
  title?: string;
};

function ResourceComponent<TData>({ data, loading, title = '' }: Props<TData>) {
  return (
    <Card body>
      <CardTitle className="text-center" tag="h4">
        {title}
      </CardTitle>
      <CardBody>{loading ? 'Loading...' : <pre>{JSON.stringify(data, null, 2)}</pre>}</CardBody>
    </Card>
  );
}

export default ResourceComponent;
