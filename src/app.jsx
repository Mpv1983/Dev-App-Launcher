import * as React from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './routing/router.jsx';

const root = createRoot(document.body);
root.render(<AppRouter/>);
