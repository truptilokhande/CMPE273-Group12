import React, { useEffect, useState } from "react";
import axios from "axios";
import connection from "../../config.json";

function HighReputedUsers() {
  const [users, setUsers] = useState();
  useEffect(() => {
    axios
      .get(`${connection.connectionURL}/api/analytics/reputationSortedUsers`)
      .then((response) => {
        setUsers(response?.data?.data?.topUsers);
      })
      .catch((err) => {
        throw err;
      });
  }, []);
  return (
    <>
      <h2>Users with high reputation</h2>
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

export default HighReputedUsers;
