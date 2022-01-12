import React from 'react';
import { render, cleanup, waitFor, screen } from '@testing-library/react';
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
    (avSettingsApi.getApplication as jest.Mock).mockResolvedValue({
      data: {
        settings: [
          {
            avatar: '/public/apps/my-profile/Avatars-22.png',
          },
        ],
      },
    });

    render(<Avatar />);

    // Check that loader renders
    await waitFor(() => screen.getByTestId('loader'));

    // Check that image renders
    await waitFor(() => screen.getByTestId('avatar-img'));
    expect(avSettingsApi.getApplication).toHaveBeenCalledTimes(1);
  });
});
