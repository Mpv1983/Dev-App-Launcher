import React, { createContext, useContext, useState } from 'react';
import ConfigurationService from '../services/ConfigurationService.jsx';
import AppRunnerService from '../services/AppRunnerService.jsx';

const ServiceProviderContext = createContext();

export const ServiceProviderContextProvider = ({ children }) => {

  var services = {
    configurationService : new ConfigurationService(),
    appRunnerService : new AppRunnerService()
  };

  const value = {'serviceProvider': services};

  return (
    <ServiceProviderContext.Provider value={value}>
      {children}
    </ServiceProviderContext.Provider>
  );
};

export default ServiceProviderContext;
