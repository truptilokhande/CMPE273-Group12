/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./Users.css";
import axios from "axios";
import connection from "../../config.json";

function Users() {
  const [users, setUsers] = useState();
  const [usersInitial, setUsersInitial] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // if (searchTerm.length < 4) return;
      const filteredTags = usersInitial.filter((i) =>
        i.name.includes(searchTerm, i)
      );
      setUsers(filteredTags);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    axios
      .get(`${connection.connectionURL}/api/user/getAllUsers`)
      .then((response) => {
        setUsers(response?.data?.data);
        setUsersInitial(response?.data?.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <>
      <div className="d-flex">
        <h1 className="fs-headline1">Users</h1>
      </div>

      <div className="d-flex align-items-end justify-content-between my-3">
        <input
          className="tags-search-input"
          autoComplete="off"
          name="tagfilter"
          type="text"
          maxLength="35"
          placeholder="Filter by user"
          onChange={(e) => setSearchTerm(e.target.value)}
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
                      src={user?.profilepicture}
                      alt="user avatar"
                      width="48"
                      height="48"
                      className="rounded"
                    />
                  </div>
                  <div className="user-details d-flex flex-column ml-2">
                    <a href={`/userProfile/${user._id}`} className="users-name">
                      {user?.name}
                    </a>
                    <span className="users-location">{user?.location}</span>
                    <div className="users-reputation">
                      <span className="reputation-score">
                        {user?.reputation}
                      </span>
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
