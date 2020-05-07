import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import { avSettingsApi } from '@availity/api-axios';
import Avatar, { useAvatarContext } from '..';

jest.mock('@availity/api-axios');

afterEach(cleanup);

describe('Avatar', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('toggles whether the avatar provider is loading', async () => {
    avSettingsApi.getApplication.mockResolvedValue({
      data: {
        settings: [
          {
            avatar: '/public/apps/my-profile/Avatars-22.png',
          },
        ],
      },
    });

    const fn = jest.fn(() => {});

    const AvatarComponent = () => {
      const { avatar, loading } = useAvatarContext();

      if (avatar && !loading) fn(avatar);
      return loading ? null : (
        <span data-testid="avatar-img">
          {avatar ? `Avatar ${avatar}` : 'No Avatar '}
        </span>
      );
    };

    const MyComponent = () => {
      return (
        <Avatar>
          <AvatarComponent />
        </Avatar>
      );
    };

    const { getByTestId } = render(<MyComponent />);

    await waitForElement(() => getByTestId('avatar-img'));

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
