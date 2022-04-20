import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import "./Users.css";
import axios from "axios";
import connection from "../../config.json";

function Users() {
  useEffect(() => {
    axios
      .get(`${connection.connectionURL}/api/user/getAllUsers`)
      .then((response) => {
        setUsers(response?.data?.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const [users, setUsers] = useState();


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
      </div>

      <div className="users mt-4">
        <div className="users-wrapper row no-gutters">
          {/* start iterating users  */}
          {users?.map((user) => (
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
                    <a href="/userProfile" className="users-name">
                      {user?.name}
                    </a>
                    <span className="users-location">{user?.location}</span>
                    <div className="users-reputation">
                      <span className="reputation-score">{user?.reputation}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* user iteration end */}
        </div>
      </div>
    </>
  );
}

export default Users;
