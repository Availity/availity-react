import React, { useContext } from 'react';

export const AvTableContext = React.createContext();
export const useTableContext = () => useContext(AvTableContext);
