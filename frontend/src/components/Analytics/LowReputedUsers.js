import React, { useState, useEffect } from "react";
import axios from "axios";
import connection from "../../config.json";

function LowReputedUsers() {
  const [users, setUsers] = useState();
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`${connection.connectionURL}/api/analytics/reputationSortedUsers`,
      { headers: {"Authorization" : `Bearer ${token}`} })
      .then((response) => {
        setUsers(response?.data?.data?.bottomUsers);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <>
      <h2>Users with low reputation</h2>
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

export default LowReputedUsers;
