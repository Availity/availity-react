import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import { avSettingsApi } from '@availity/api-axios';

import Avatar from './Avatar';

jest.mock('@availity/api-axios');

afterEach(cleanup);

describe('Avatar', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render user selected avatar from settings', async () => {
    avSettingsApi.getApplication.mockResolvedValue({
      data: {
        settings: [
          {
            avatar: '/public/apps/my-profile/Avatars-22.png',
          },
        ],
      },
    });

    const { getByTestId } = render(<Avatar />);

    // Check that loader renders
    await waitFor(() => getByTestId('avatar-img-loader'));

    // Check that image renders
    await waitFor(() => getByTestId('avatar-img'));
    expect(avSettingsApi.getApplication).toHaveBeenCalledTimes(1);
  });
});
