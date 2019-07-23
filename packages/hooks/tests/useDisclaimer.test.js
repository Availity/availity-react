import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';
import { avDisclaimersApi } from '@availity/api-axios';
import { useDisclaimer } from '..';

jest.mock('@availity/api-axios');

avDisclaimersApi.get.mockResolvedValue({
  config: { polling: false },
  data: {
    content: 'Some Content',
  },
  status: 200,
  statusText: 'Ok',
});

const Component = () => {
  const [disclaimer, loading] = useDisclaimer('1234');

  return loading ? <span data-testid="loading" /> : JSON.stringify(disclaimer);
};

describe('useDisclaimer', () => {
  test('should return loading', () => {
    const { getByTestId } = render(<Component />);

    getByTestId('loading');
  });

  test('should return content', async () => {
    const { getByText } = render(<Component />);

    await waitForElement(() => getByText('"Some Content"'));
  });
});
