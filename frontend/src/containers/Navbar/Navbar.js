import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const isAuthenticated = false;
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <Link className="navbar-brand mx-1" to="/">
          <svg width="1em" height="1em" viewBox="0 0 32 37" fill="none">
            <path d="M26 33v-9h4v13H0V24h4v9h22z" fill="#BCBBBB" />
            <path
              d="M21.5 0l-2.7 2 9.9 13.3 2.7-2L21.5 0zM26 18.4L13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5zM9.1 15.2l15 7 1.4-3-15-7-1.4 3zm14 10.79l.68-2.95-16.1-3.35L7 23l16.1 2.99zM23 30H7v-3h16v3z"
              fill="#F48024"
            />
          </svg>
          <h5 className="app-name d-inline-block">stackoverflow</h5>
        </Link>

        <form className="form-inline navbar-search mx-4">
          <input
            className="form-control navbar-search-input"
            type="search"
            placeholder="Search..."
          />
        </form>

        <div className="auth-details">
          {isAuthenticated ? (
            <form
              className="form-inline my-2 my-lg-0 mx-auto flex-grow-1 d-flex"
              id="search-form"
            >
              <input
                className="form-control global-search flex-grow-1 ml-5 mr-2"
                type="search"
                placeholder="Search for anything"
                //  defaultValue={key}
                //  onChange={(e) => {
                //    setSearchKey(e.target.value);
                //  }}
              />
              <Link to="/">
                <button
                  className="btn btn-outline my-2 mr-5"
                  type="submit"
                  color="#FFFFFF"
                >
                  <i className="fa fa-search" />
                </button>
              </Link>
            </form>
          ) : (
            <>
              {/* <Signup />
          <Signin /> */}
              <ul className="navbar-nav ml-auto mr-4">
                <li className="nav-item ml-1">
                  <a href="/" class="nav-login-btn nav-btn">
                    Log in
                  </a>
                </li>
                <li className="nav-item ml-1">
                  <a href="/" class="nav-signup-btn nav-btn">
                    Sign up
                  </a>
                </li>
              </ul>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
