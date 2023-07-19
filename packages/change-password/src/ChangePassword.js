import React, { createContext, useContext, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import AvApi, { AvMicroserviceApi } from '@availity/api-axios';

export const ChangePasswordContext = createContext();

export const useChangePasswordContext = () => useContext(ChangePasswordContext);

const ChangePassword = ({ resource, schema, conditions, children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const currentPasswordIconRef = useRef(null);
  const newPasswordIconRef = useRef(null);
  const confirmNewPasswordIconRef = useRef(null);

  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] = useState(false);

  return (
    <ChangePasswordContext.Provider
      value={{
        loading,
        setLoading,
        error,
        setError,
        success,
        setSuccess,
        resource,
        schema,
        conditions,
        currentPasswordIconRef,
        newPasswordIconRef,
        confirmNewPasswordIconRef,
        currentPasswordVisible,
        setCurrentPasswordVisible,
        newPasswordVisible,
        setNewPasswordVisible,
        confirmNewPasswordVisible,
        setConfirmNewPasswordVisible,
      }}
    >
      {children}
    </ChangePasswordContext.Provider>
  );
};

ChangePassword.propTypes = {
  resource: PropTypes.oneOfType([PropTypes.instanceOf(AvApi), PropTypes.instanceOf(AvMicroserviceApi)]).isRequired,
  schema: PropTypes.object,
  conditions: PropTypes.arrayOf(PropTypes.shape({ message: PropTypes.string, passes: PropTypes.func })),
  children: PropTypes.node,
};

export default ChangePassword;
