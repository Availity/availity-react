import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

export const PatientContext = createContext();

const Patients = ({ children }) => {
  const [currentPatient, setCurrentPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <PatientContext.Provider
      value={{ currentPatient, setCurrentPatient, loading, setLoading }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = () => {
  const { currentPatient, setCurrentPatient, loading, setLoading } =
    useContext(PatientContext) || {};

  return { currentPatient, setCurrentPatient, loading, setLoading };
};

Patients.propTypes = {
  children: PropTypes.node,
};

export default Patients;
