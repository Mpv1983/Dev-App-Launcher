import * as React from 'react';
import { Link } from "react-router-dom";

export default function ConfigurationIndexPage(props) {

    return <div>
            <h1>Configuration</h1>
            <hr/>
            <Link to="/manage/manage-app" className='button largeButton'>
                Add Application
            </Link>
        </div>;
  }