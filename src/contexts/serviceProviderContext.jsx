import React, { createContext, useContext, useState } from 'react';

const ServiceProviderContext = createContext();

export const ServiceProviderContextProvider = ({ children }) => {

    const value = {'serviceProvider': 'helloworld'};
  
    return (
      <ServiceProviderContext.Provider value={value}>
        {children}
      </ServiceProviderContext.Provider>
    );
  };

export default ServiceProviderContext;
