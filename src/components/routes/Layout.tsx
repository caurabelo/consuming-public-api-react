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
        <Link to={Constants.PATHS.API_FETCH}>API GET using Fetch</Link>
        <Link to={Constants.PATHS.API_AXIOS}>API GET using Axios</Link>
      </nav>

      <hr />

      <header className="header">
        <h1>Random Marvel Comics</h1>
      </header>

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

export default Layout;
