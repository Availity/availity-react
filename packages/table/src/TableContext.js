import React, { useContext } from 'react';

export const TableContext = React.createContext();
export const useTableContext = () => useContext(TableContext);
