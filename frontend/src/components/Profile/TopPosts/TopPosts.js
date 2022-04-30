import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TopPosts.css";
import { Link } from "react-router-dom";
import connection from "../../../config.json";
import moment from "moment";

function TopPosts(user) {
  const [ques, setQues] = useState([]);
  const [ans, setAns] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [sort, setSort] = useState("all");
  const [filter, setFilter] = useState();

  useEffect(() => {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    axios
      .get(`${connection.connectionURL}/api/user/getTopposts/${id}`)
      .then((response) => {
        setAns(response?.data?.answerposts);
        setQues(response?.data?.quesposts);
        setQuestions([
          ...response?.data?.answerposts,
          ...response?.data?.quesposts,
        ]);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const sortQuestions = (criteria) => {
    if (criteria === "score") {
      const sortedQuestions = questions.sort(function (a, b) {
        return (
          (b?.votes || b?.question?.[0]?.votes || 0) -
          (a?.votes || a?.question?.[0]?.votes || 0)
        );
      });
      setQuestions([...sortedQuestions]);
      setSort("score");
    }
    if (criteria === "newest") {
      const sortedQuestions = questions.sort(function (a, b) {
        const t1 =
          new Date(a?.createdAt || a?.question?.[0]?.createdAt) <
          new Date(a?.updatedAt || a?.question?.[0]?.createdAt)
            ? new Date(a?.updatedAt || a?.question?.[0]?.createdAt)
            : new Date(a?.createdAt || a?.question?.[0]?.createdAt);
        const t2 =
          new Date(b?.createdAt || b?.question?.[0]?.createdAt) <
          new Date(b?.updatedAt || b?.question?.[0]?.createdAt)
            ? new Date(b?.updatedAt || b?.question?.[0]?.createdAt)
            : new Date(b?.createdAt || b?.question?.[0]?.createdAt);
        return t2 - t1;
      });
      setQuestions([...sortedQuestions]);
      setSort("newest");
    }
  };

  return (
    <div className="top-posts">
      <div className="d-flex flex-row">
        <section className="flex--item fl-grow1 wmx100">
          <div id="user-tab-answers" className="js-user-tab">
            <div className="row flex jc-space-between flex-row">
              <div
                className="d-flex flex-row filter-btn-wrappers my-3 ml-3"
                style={{ width: "fit-content" }}
              >
                <div
                  className={`filter-btn ${sort === "all" ? "active" : ""}`}
                  onClick={() => {
                    setQuestions([...ques, ...ans]);
                    setSort("all");
                  }}
                >
                  All
                </div>
                <div
                  className={`filter-btn ${
                    sort === "questions" ? "active" : ""
                  }`}
                  onClick={() => {
                    setQuestions(ques);
                    setSort("questions");
                  }}
                >
                  Questions
                </div>
                <div
                  className={`filter-btn fliter-btn-last ${
                    sort === "answers" ? "active" : ""
                  }`}
                  onClick={() => {
                    setQuestions(ans);
                    setSort("answers");
                  }}
                >
                  Answers
                </div>
              </div>
              <div
                className="d-flex flex-row filter-btn-wrappers my-3 mr-3"
                style={{ width: "fit-content" }}
              >
                <div
                  className={`filter-btn ${filter === "score" ? "active" : ""}`}
                  onClick={() => {
                    sortQuestions("score");
                    setFilter("score");
                  }}
                >
                  score
                </div>
                <div
                  className={`filter-btn fliter-btn-last${
                    sort === "filter" ? "newest" : ""
                  }`}
                  onClick={() => {
                    sortQuestions("newest");
                    setFilter("newest");
                  }}
                >
                  newest
                </div>
              </div>
            </div>
            <div className="ba bc-black-100 bar-md mb-4">
              <div id="js-post-summaries">
                {questions?.map((post) => (
                  <div
                    id="answer-id-30359308"
                    className="s-post-summary s-post-summary__minimal js-post-summary"
                  >
                    <div className="s-post-summary--stats js-post-summary-stats w-auto">
                      <div className="s-post-summary--stats-item s-post-summary--stats-item__emphasized">
                        <span className="s-post-summary--stats-item-number count">
                          {post?.votes || post?.question?.[0]?.votes || 0}
                        </span>
                      </div>
                    </div>
                    <div className="s-post-summary--content">
                      <h3 className="s-post-summary--content-title">
                        <a
                          href="/questions/123198/how-to-copy-files/30359308#30359308"
                          className="answer-hyperlink "
                        >
                          {post?.title || post?.question?.[0]?.title}
                        </a>
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TopPosts;
