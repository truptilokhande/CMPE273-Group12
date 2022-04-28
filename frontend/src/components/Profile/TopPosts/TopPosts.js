import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TopPosts.css";
import { Link } from "react-router-dom";
import connection from "../../../config.json";
function TopPosts(user) {
  const [ques, setQues] = useState([]);
  const [ans, setAns] = useState([]);

  useEffect(() => {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    axios
      .get(`${connection.connectionURL}/api/user/getTopposts/${id}`)
      .then((response) => {
        console.log(response);
        setAns(response.data.data1);
        setQues(response.data.data2);
        //setLastseen(response.data.data.updatedAt)
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <div className="top-posts">
      <div className="d-flex flex-row">
        {ques?.map((q) => (
          <Link to="/" class="questionlink">
            {q.questionId.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TopPosts;
