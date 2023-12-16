import * as React from 'react';
import { Outlet, Link } from "react-router-dom";
import './layout.css';

const Layout = () => {
    return (
      <>
        <div class="sidenav">
            <Link to="/">Home</Link>
            <Link to="/manage-app">ManageApp</Link>
        </div>

        <div class="main">
            <Outlet />
        </div>
        
      </>
    )
  };
  
  export default Layout;