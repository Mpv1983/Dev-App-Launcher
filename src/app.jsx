import * as React from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './router.jsx';
import { ServiceProviderContextProvider } from './contexts/serviceProviderContext.jsx';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<ServiceProviderContextProvider><AppRouter/></ServiceProviderContextProvider>);