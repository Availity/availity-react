import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import { avSettingsApi } from '@availity/api-axios';
import Avatar, { AvatarImage } from '..';

jest.mock('@availity/api-axios');

afterEach(cleanup);

describe('AvatarImage', () => {
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

    const MyComponent = () => (
      <Avatar>
        <AvatarImage />
      </Avatar>
    );
    const { getByTestId } = render(<MyComponent />);

    // Check that loader renders
    await waitForElement(() => getByTestId('avatar-img-loader'));

    // Check that image renders
    await waitForElement(() => getByTestId('avatar-img'));
    expect(avSettingsApi.getApplication).toHaveBeenCalledTimes(1);
  });
});
