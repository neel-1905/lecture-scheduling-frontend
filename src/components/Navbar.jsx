import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import PrivateRoute from "../context/PrivateRoute";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const context = useContext(UserContext);

  return (
    <>
      <PrivateRoute>
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" href="#">
              Admin Panel
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link text-dark" aria-current="page">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={`/addCourse`}
                    className="nav-link text-dark"
                    href="#"
                  >
                    Add Course
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to={`/`}
                    onClick={context?.handleLogout}
                    className="nav-link text-dark"
                    href="#"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </PrivateRoute>
    </>
  );
};

export default Navbar;
