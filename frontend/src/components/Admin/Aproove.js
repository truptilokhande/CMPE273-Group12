import React, { useEffect } from "react";
import "./Aproove.css";
import { useState } from "react";
import axios from "axios";
import parse from "html-react-parser";
import connection from "../../config.json";

function Aproove() {
  const [questions, setQuestions] = useState();
  const token = localStorage.getItem("token");
  useEffect(() => {
    
    axios
      .get(`${connection.connectionURL}/api/question/getPendingQuestions`,
      { headers: {"Authorization" : `Bearer ${token}`} })
      .then((response) => {
        // filtering out questions which are waiting for approval.
        // const filteredQuestions = response?.data?.data?.questions?.filter(
        //   (question) => question.waitingForApproval === true
        // );
        // setQuestions(filteredQuestions);
        console.log(response);
        setQuestions(response?.data?.data)
        
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const handleAccept = (id) => {
    axios
      .post(`${connection.connectionURL}/api/question/aproove/${id}`,
      null,
      { headers: {"Authorization" : `Bearer ${token}`} })
      .then((response) => {
        console.log(response);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleReject = (id) => {
    axios
      .post(`${connection.connectionURL}/api/question/reject/${id}`,
      null,
      { headers: {"Authorization" : `Bearer ${token}`} })
      .then((response) => {
        console.log(response);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {questions?.map((question) => (
        <div className="question-content">
          <h3 className="question-content-title">
            <a href="/" className="question-link">
              {question.title}
            </a>
            <button
              className="accept"
              onClick={() => {
                handleAccept(question._id);
              }}
            >
              Accept
            </button>
            <button
              className="reject"
              onClick={() => {
                handleReject(question._id);
              }}
            >
              Reject
            </button>
          </h3>

          <div className="question-content question-wrapper-content">
            {parse(question?.questionbody || "")}
          </div>

          <div className="question-content-meta-data d-flex align-item-center justify-content-between flex-wrap">
            <div className="question-tags d-flex flex-wrap">
              {question.tags?.map((tag) => (
                <a href={`/tagOverview/${tag.id}`} className="tag">
                  {tag.name}
                </a>
              ))}
            </div>
          </div>
          <hr></hr>
        </div>
      ))}
    </div>
  );
}

export default Aproove;
