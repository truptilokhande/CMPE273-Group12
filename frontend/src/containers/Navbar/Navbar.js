import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import connection from "../../config.json";
import { useNavigate } from "react-router-dom";

function Navbar({ isAuthenticated, user, reputation }) {
  const navigate = useNavigate();

  const signout = () => {
    axios
      .get(`${connection.connectionURL}/api/user/signout`)
      .then(() => {
        localStorage.clear();
        window.location.reload(true);
      })
      .catch((err) => {
        throw err;
      });
  };

  const searchUsers = (searchkey) => {
    axios
      .get(
        `${connection.connectionURL}/api/question/searchQuestionsByUserId/${searchkey}`
      )
      .then((response) => {
        // redirect to users page
        navigate("/search", { state: { questions: response?.data?.data } });
        window.location.reload(true);
      })
      .catch((err) => {
        throw err;
      });
  };

  const searchQuestionsByText = (searchkey) => {
    axios
      .get(
        `${connection.connectionURL}/api/question/searchQuestionsByText/${searchkey}`
      )
      .then((response) => {
        // redirect to users page
        navigate("/search", { state: { questions: response?.data?.data } });
        window.location.reload(true);
      })
      .catch((err) => {
        throw err;
      });
  };

  const onSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const searchkey = e.target.value;
      // check for [ ] and then its tag search and redirect to tag overview page
      if (/^\[.*\]$/.test(searchkey)) {
        // redirect to tags page
      } else if (/^user:.*$/.test(searchkey)) {
        // split the search key and get search key value and call the api for results
        searchUsers(searchkey.split(":")[1]);
      }
      // check for " " and search for anything redirect to search page
      else if (/^".*"$/.test(searchkey)) {
        // redirect to search page
        searchQuestionsByText(searchkey.split('"')[1]);
      } else if (/^is:question.*$/.test(searchkey)) {
        navigate("/homepage");
      } else if (/^is:accepted.*$/.test(searchkey)) {
      }
    }
  };

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
            onKeyDown={(e) => {
              onSearch(e);
            }}
          />
          <div
            className="js-search-hints px-4"
            aria-describedby="Tips for searching"
          >
            <div className="js-search-hints-text d-flex">
              <div className="flex-grow-1">
                <div className="mb-3">
                  <span className="search-criteria mr-2">[tag]</span>
                  <span className="search-criteria-description">
                    search within a tag
                  </span>
                </div>
                <div className="mb12">
                  <span className="search-criteria mr-2">user:1234</span>
                  <span className="search-criteria-description">
                    search by author
                  </span>
                </div>
                <div className="mb12">
                  <span className="search-criteria mr-2">"words here"</span>
                  <span className="search-criteria-description">exact phrase</span>
                </div>
              </div>
              <div className="flex-grow-1">
                <div className="mb-3">
                  <span className="search-criteria mr-2">is:question</span>
                  <span className="search-criteria-description">type of post</span>
                </div>
                <div className="">
                  <span className="search-criteria mr-2">isaccepted:yes</span>
                  <span className="search-criteria-description">
                    search within status
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="auth-details">
          {isAuthenticated ? (
            <ol className="d-flex list-unstyled m-0 align-items-center">
              <li className="d-flex align-items-center">
                <a href="/user" className="navbar-user-card">
                  <div className="navbar-avatar">
                    <img
                      src={user?.profilepicture}
                      alt="user avatar"
                      width="24"
                      height="24"
                      className="rounded"
                    />
                  </div>
                </a>
                <div className="user-details p-0">
                  <div className="reputation-wrapper pl-2">
                    <span className="reputation-score">{reputation}</span>
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
                <a href="/allchats" className="navbar-messages">
                  <svg
                    className="iconInbox"
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                  >
                    <path d="M4.63 1h10.56a2 2 0 0 1 1.94 1.35L20 10.79V15a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-4.21l2.78-8.44c.25-.8 1-1.36 1.85-1.35Zm8.28 12 2-2h2.95l-2.44-7.32a1 1 0 0 0-.95-.68H5.35a1 1 0 0 0-.95.68L1.96 11h2.95l2 2h6Z"></path>
                  </svg>
                </a>
              </li>

              <li className="align-self-end">
                <button
                  className="navbar-logout"
                  onClick={() => {
                    signout();
                  }}
                >
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
                </button>
              </li>
            </ol>
          ) : (
            <>
              <ul className="navbar-nav ml-auto mr-4">
                <li className="nav-item ml-1">
                  <a href="/signin" className="nav-login-btn nav-btn">
                    Log in
                  </a>
                </li>
                <li className="nav-item ml-1">
                  <a href="/signup" className="nav-signup-btn nav-btn">
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
  user: state.user,
  reputation: state.reputation,
});

export default connect(mapStateToProps, null)(Navbar);
