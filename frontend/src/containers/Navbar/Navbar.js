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
            <ol className="d-flex list-unstyled m-0 align-items-center">
              <li className="d-flex align-items-center">
                <a href="/user" class="navbar-user-card">
                  <div class="navbar-avatar">
                    <img
                      src="https://www.gravatar.com/avatar/0555bd0deb416a320a0069abef08078a?s=96&amp;d=identicon&amp;r=PG&amp;f=1"
                      alt="user avatar"
                      width="24"
                      height="24"
                      className="rounded"
                    />
                  </div>
                </a>
                <div className="user-details p-0">
                  <div className="reputation-wrapper pl-2">
                    <span className="reputation-score">753</span>
                    <span>
                      <span className="badge2">●</span>
                      <span className="badgecount">3</span>
                    </span>
                    <span>
                      <span className="badge3">●</span>
                      <span className="badgecount">11</span>
                    </span>
                  </div>
                </div>
              </li>
              <li className="mx-3 align-self-end mt-2">
                <a href="/myMessages" class="navbar-messages">
                  <svg
                    class="iconInbox"
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                  >
                    <path d="M4.63 1h10.56a2 2 0 0 1 1.94 1.35L20 10.79V15a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-4.21l2.78-8.44c.25-.8 1-1.36 1.85-1.35Zm8.28 12 2-2h2.95l-2.44-7.32a1 1 0 0 0-.95-.68H5.35a1 1 0 0 0-.95.68L1.96 11h2.95l2 2h6Z"></path>
                  </svg>
                </a>
              </li>

              <li className="align-self-end">
                <a href="/logout" class="navbar-logout">
                  <svg
                    id="cloud-upload"
                    fill="#232629"
                    height="20"
                    viewBox="0 0 24 24"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                      id="upcloud"
                      d="M10.09 15.59l1.41 1.41 5-5-5-5-1.41 1.41 2.58 2.59h-9.67v2h9.67l-2.58 2.59zm8.91-12.59h-14c-1.11 0-2 .9-2 2v4h2v-4h14v14h-14v-4h-2v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2z"
                    />
                  </svg>
                </a>
              </li>
            </ol>
          ) : (
            <>
              <ul className="navbar-nav ml-auto mr-4">
                <li className="nav-item ml-1">
                  <a href="/signin" class="nav-login-btn nav-btn">
                    Log in
                  </a>
                </li>
                <li className="nav-item ml-1">
                  <a href="/signup" class="nav-signup-btn nav-btn">
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
