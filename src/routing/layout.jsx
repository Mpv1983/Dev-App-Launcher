import * as React from 'react';
import { Outlet, Link } from "react-router-dom";
import './layout.css';
import CogIcon from '../icons/cogs.jsx';
import HomeIcon from '../icons/home.jsx';

const Layout = () => {
    return (
      <>
        <div class="sidenav">
          <Link to="/">
            <HomeIcon color="white" size="25"/>
          </Link>
          <Link to="/manage-app">
            <CogIcon color="white" size="25"/>
          </Link>
        </div>

        <div class="main">
            <Outlet />
        </div>
        
      </>
    )
  };
  
  export default Layout;