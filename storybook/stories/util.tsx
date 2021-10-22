import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

export const Preview: React.FC = ({ children }) => (
  <React.Suspense fallback={<div className="text-center">Loading...</div>}>{children}</React.Suspense>
);

type Props = {
  data: Record<string, unknown>;
  loading: boolean;
  title: string;
}

export const ResourceComponent: React.FC<Props> = ({ data, loading, title = '' }) => (
  <Card body>
    <CardTitle className="text-center" tag="h4">
      {title}
    </CardTitle>
    <CardBody>{loading ? 'Loading...' : <pre>{JSON.stringify(data, null, 2)}</pre>}</CardBody>
  </Card>
);

