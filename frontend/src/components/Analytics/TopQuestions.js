import React, { useEffect, useState } from "react";
import axios from "axios";
import connection from "../../config.json";

function TopQuestions() {
  const [topQuestions, setTopQuestions] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`${connection.connectionURL}/api/analytics/topViewedQuestion`,
      { headers: {"Authorization" : `Bearer ${token}`} })
      .then((response) => {
        // console.log(response.data.data.topquestions);
        setTopQuestions(response?.data?.data?.topquestions);
      })
      .catch((err) => {
        throw err;
      });
  }, []);
  return (
    <>
      <h2>Top 10 Questions</h2>
      <div className="questions-wrapper move-left">
        {topQuestions?.map((question) => {
          return (
            <div className="question-summary" key={question?._id}>
              <div className="question-stats">
                <div className="question-votes">
                  {/* <span className="question-votes-number">
                    {question.votes}
                  </span> */}
                  <span className="question-votes-text">votes</span>
                </div>
                {/* {props?.answercount ? (
                  <div className="question-answers">
                    <span className="question-answers-number">
                      {props?.answercount?.filter(
                        (i) => i._id === question?._id
                      )[0]?.answerCount || 0}
                    </span>
                    <span className="question-answers-text">answers</span>
                  </div>
                ) : null} */}
                <div className="question-views">
                  <span className="question-views-number">
                    {question.views}
                  </span>
                  <span className="question-views-text">views</span>
                </div>
              </div>
              <div className="question-content">
                <h3 className="question-content-title">
                  <a
                    href={`/questionOverview/${question?._id}`}
                    className="question-link"
                  >
                    {question?.title}
                  </a>
                </h3>
                {/* <div className="question-content-summary">
                  {parse(question?.questionbody)}
                </div> */}
                <div className="question-content-meta-data d-flex align-item-center justify-content-between flex-wrap">
                  <div className="question-tags d-flex flex-wrap">
                    {question?.tags.map((tag) => (
                      <a href="/" className="tag">
                        {tag?.name}
                      </a>
                    ))}
                    {/* tags iteration stop */}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {/* question iteration end */}
      </div>
    </>
  );
}

export default TopQuestions;
