import React from 'react';
import { render } from '@testing-library/react';
import { QueryClientProvider } from 'react-query';

// Taken from https://github.com/tannerlinsley/react-query/blob/master/src/react/tests/utils.tsx#L6
export default function renderWithClient(client, ui) {
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}
