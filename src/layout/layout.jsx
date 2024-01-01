import * as React from 'react';
import { Outlet, Link } from "react-router-dom";
import './layout.css';
import CogIcon from '../icons/cogs.jsx';
import HomeIcon from '../icons/home.jsx';

const Layout = () => {
    return (
      <>
        <div className="sidenav">
          <Link to="/">
            <HomeIcon color="white" size="25" tooltip="Home"/>
          </Link>
          <Link to="/manage/index">
            <CogIcon color="white" size="25" tooltip="Settings"/>
          </Link>
        </div>

        <div className="main">
            <Outlet />
        </div>
        
      </>
    )
  };
  
  export default Layout;