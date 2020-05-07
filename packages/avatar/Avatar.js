import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import { avSettingsApi } from '@availity/api-axios';
import { useEffectAsync } from '@availity/hooks';

export const AvatarContext = createContext();

export const useAvatarContext = () => useContext(AvatarContext);

const Avatar = ({ children, fallback }) => {
  const [avatar, setAvatar] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffectAsync(async () => {
    setLoading(true);
    const resp = await avSettingsApi.getApplication('AVATAR');

    const avi = get(resp, 'data.settings[0].avatar', fallback);

    setAvatar(avi);
    setLoading(false);
  }, []);

  return (
    <AvatarContext.Provider value={{ avatar, loading }}>
      {children}
    </AvatarContext.Provider>
  );
};

Avatar.propTypes = {
  children: PropTypes.node,
  fallback: PropTypes.string,
};

Avatar.defaultProps = {
  fallback: '/public/apps/my-profile/images/Avatars-00.png',
};

export default Avatar;
