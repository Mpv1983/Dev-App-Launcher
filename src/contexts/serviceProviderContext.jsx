import React, { createContext } from 'react';
import AppManagerService from '../services/renderer/AppManagerService.jsx';

const ServiceProviderContext = createContext();

export const ServiceProviderContextProvider = ({ children }) => {

  var services = {
    appManagerService : new AppManagerService()
  };

  const value = {'serviceProvider': services};

  return (
    <ServiceProviderContext.Provider value={value}>
      {children}
    </ServiceProviderContext.Provider>
  );
};

export default ServiceProviderContext;
