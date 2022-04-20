import React from "react";
import { Link } from "react-router-dom";
import "./Users.css";

function Users() {
  return (
    <>
      <div className="d-flex">
        <h1 className="fs-headline1">Users</h1>
      </div>

      <div className="d-flex align-items-end justify-content-between my-3">
        <input
          className="tags-search-input"
          autocomplete="off"
          name="tagfilter"
          type="text"
          maxlength="35"
          placeholder="Filter by user"
        />
        {/* <svg
          aria-hidden="true"
          className="search-icon"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0Z"></path>
        </svg> */}

        {/* <div className="d-flex flex-row filter-btn-wrapper mt-3">
          <div className="filter-btn">Popular</div>
          <div className="filter-btn">Name</div>
          <div className="filter-btn fliter-btn-last">New</div>
        </div> */}
      </div>

      <div className="users mt-4">
        <div className="users-wrapper row no-gutters">
          {/* start iterating users  */}

          <div className="col-3 d-flex flex-column tag-card">
            <div className="user-content-wrapper">
              <div className="d-flex">
                <div className="users-avatar">
                 
                  <img
                    src="https://www.gravatar.com/avatar/0555bd0deb416a320a0069abef08078a?s=96&amp;d=identicon&amp;r=PG&amp;f=1"
                    alt="user avatar"
                    width="48"
                    height="48"
                    className="rounded"
                  />
                </div>
                <div className="user-details d-flex flex-column ml-2">
                  <a href="/userProfile" className="users-name">mozway</a>
                  <span className="users-location">Mare Tranquillitatis</span>
                  <div className="users-reputation">
                    <span className="reputation-score">968</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-3 d-flex flex-column tag-card">
            <div className="user-content-wrapper">
              <div className="d-flex">
                <div className="users-avatar">
                  <img
                    src="https://www.gravatar.com/avatar/0555bd0deb416a320a0069abef08078a?s=96&amp;d=identicon&amp;r=PG&amp;f=1"
                    alt="user avatar"
                    width="48"
                    height="48"
                    className="rounded"
                  />
                </div>
                <div className="user-details d-flex flex-column ml-2">
                  <a href="/" className="users-name">mozway</a>
                  <span className="users-location">Mare Tranquillitatis</span>
                  <div className="users-reputation">
                    <span className="reputation-score">968</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-3 d-flex flex-column tag-card">
            <div className="user-content-wrapper">
              <div className="d-flex">
                <div className="users-avatar">
                  <img
                    src="https://www.gravatar.com/avatar/0555bd0deb416a320a0069abef08078a?s=96&amp;d=identicon&amp;r=PG&amp;f=1"
                    alt="user avatar"
                    width="48"
                    height="48"
                    className="rounded"
                  />
                </div>
                <div className="user-details d-flex flex-column ml-2">
                  <a href="/" className="users-name">mozway</a>
                  <span className="users-location">Mare Tranquillitatis</span>
                  <div className="users-reputation">
                    <span className="reputation-score">968</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-3 d-flex flex-column tag-card">
            <div className="user-content-wrapper">
              <div className="d-flex">
                <div className="users-avatar">
                  <img
                    src="https://www.gravatar.com/avatar/0555bd0deb416a320a0069abef08078a?s=96&amp;d=identicon&amp;r=PG&amp;f=1"
                    alt="user avatar"
                    width="48"
                    height="48"
                    className="rounded"
                  />
                </div>
                <div className="user-details d-flex flex-column ml-2">
                  <a href="/" className="users-name">mozway</a>
                  <span className="users-location">Mare Tranquillitatis</span>
                  <div className="users-reputation">
                    <span className="reputation-score">968</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-3 d-flex flex-column tag-card">
            <div className="user-content-wrapper">
              <div className="d-flex">
                <div className="users-avatar">
                  <img
                    src="https://www.gravatar.com/avatar/0555bd0deb416a320a0069abef08078a?s=96&amp;d=identicon&amp;r=PG&amp;f=1"
                    alt="user avatar"
                    width="48"
                    height="48"
                    className="rounded"
                  />
                </div>
                <div className="user-details d-flex flex-column ml-2">
                  <a href="/" className="users-name">mozway</a>
                  <span className="users-location">Mare Tranquillitatis</span>
                  <div className="users-reputation">
                    <span className="reputation-score">968</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* tags iteration end */}
        </div>
      </div>
    </>
  );
}

export default Users;
