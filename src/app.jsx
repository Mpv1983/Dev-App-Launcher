import * as React from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './routing/router.jsx';
import { ServiceProviderContextProvider } from './contexts/serviceProviderContext.jsx';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<ServiceProviderContextProvider><AppRouter/></ServiceProviderContextProvider>);
//ReactDOM.render(<ServiceProviderContextProvider><AppRouter/></ServiceProviderContextProvider>, document.getElementById("root"));