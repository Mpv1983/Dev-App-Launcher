import * as React from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import ConfigurationIndexPage from '../pages/manage/configure-index.jsx'
import ManageApp from '../pages/manage/manage-app.jsx'
import HomePage from '../pages/home/home.jsx';
import Layout from './layout.jsx';

export default function AppRouter(props) {
    return <HashRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
            </Route>
            <Route path="/manage" element={<Layout />}>
                <Route path="index" element={<ConfigurationIndexPage />} />
                <Route path="manage-app" element={<ManageApp />} />
            </Route>
        </Routes>
    </HashRouter>;
  }