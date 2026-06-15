import React from 'react';
import { render } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

export default function renderWithClient(client: QueryClient, ui: React.ReactElement) {
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}
