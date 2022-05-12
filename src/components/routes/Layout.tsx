import React from "react";
import { Link, Outlet } from "react-router-dom";
import Constants from "../../constants";
import './Layout.css';

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <Link to={Constants.PATHS.API_CRUD}>API CrudCrud</Link>
        <Link to={Constants.PATHS.API_FETCH}>API Marvel GET using Fetch</Link>
        <Link to={Constants.PATHS.API_AXIOS}>API Marvel GET using Axios</Link>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

export default Layout;
