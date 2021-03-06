import React, { useEffect, useState } from "react";
import "./Questionstab.css";
import axios from "axios";
import connection from "../../../../config.json";
import BasicDetails from "../../BasicDetails/BasicDetails";
import moment from "moment";

function Questionstab() {
  const [userProfile, setUserProfile] = useState();
  const [questions, setQuestions] = useState([]);
  const [allanswers, setAllAnswers] = useState([]);

  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${connection.connectionURL}/api/user/getUser/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserProfile(response?.data?.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${connection.connectionURL}/api/user/getTopposts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        setQuestions(response?.data?.quesposts);
        setAllAnswers(response?.data?.bestAnswer);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const checkIfUsersAnswerIsRight = (id) => {
    const filteredquestions = allanswers.filter((answer) => answer?._id === id);
    const checkRightAnswer = filteredquestions?.[0]?.answer?.filter(
      (answer) => answer?.markedAsRight === true
    );
    return checkRightAnswer?.length > 0;
  };

  return (
    <div>
      <BasicDetails userdetails={userProfile} />
      <div className="d-flex mb48">
        <nav
          className="flex--item fl-shrink0 mr32 wmn1 md:d-none js-settings-nav"
          role="navigation"
        >
          <ul className="ps-sticky t64 s-navigation s-navigation__muted s-navigation__vertical">
            <li>
              <a
                className="s-navigation--item is-selected pr48 ps-relative"
                href={`/Activities/${id}`}
                title="Answers this user provided"
                data-shortcut="A"
              >
                Answers
              </a>
            </li>
            <li>
              <a
                className="s-navigation--item pr48 ps-relative"
                href={`/Questions/Questionstab/${id}`}
                title="Questions this user asked"
                data-shortcut="Q"
              >
                Questions
              </a>
            </li>
            <li>
              <a
                className="s-navigation--item pr48 ps-relative"
                href={`/UserTags/${id}`}
                title="Tags this user has posts in"
                data-shortcut="T"
              >
                Tags
              </a>
            </li>

            <li>
              <a
                className="s-navigation--item pr48 ps-relative"
                href={`/ActivityBadges/${id}`}
                title="Badges this user has earned"
                data-shortcut="B"
              >
                Badges
              </a>
            </li>
            <li>
              <a
                className="s-navigation--item pr48 ps-relative"
                href={`/Bookmarkstab/Bookmarkstab/${id}`}
                title="Questions this user has bookmarked"
                data-shortcut="F"
              >
                Bookmarks
              </a>
            </li>

            <li>
              <a
                className="s-navigation--item pr48 ps-relative"
                href={`/Reputation/${id}`}
                title="Reputation this user has earned"
                data-shortcut="R"
              >
                Reputation
              </a>
            </li>
          </ul>
        </nav>

        <section className="flex--item fl-grow1 wmx100">
          <div id="user-tab-questions" className="js-user-tab">
            <div className="d-flex ai-end jc-space-between mb8 fw-wrap">
              <div className="flex--item fl-grow1">
                <div className="d-flex fd-column">
                  <h2 className="flex--item fs-title mb0">
                    {questions?.length} Questions
                  </h2>
                </div>
              </div>
            </div>

            <div className="ba bc-black-100 bar-md">
              <div id="js-post-summaries">
                {questions?.map((q) => (
                  <div className="s-post-summary s-post-summary__minimal js-post-summary">
                    <div className="s-post-summary--stats js-post-summary-stats">
                      <div className="s-post-summary--stats-item s-post-summary--stats-item__emphasized">
                        <span className="s-post-summary--stats-item-number">
                          {q?.votes}
                        </span>
                        <span className="s-post-summary--stats-item-unit">
                          votes
                        </span>
                      </div>
                      <div
                        className="s-post-summary--stats-item is-hot"
                        title="40585 views"
                      >
                        <span className="s-post-summary--stats-item-number">
                          {q?.views}
                        </span>
                        <span className="s-post-summary--stats-item-unit">
                          views
                        </span>
                      </div>
                    </div>

                    <div className="s-post-summary--content">
                      <h3 className="s-post-summary--content-title">
                        <a
                          href={`/questionOverview/${q?._id}`}
                          className="s-link"
                        >
                          {q.title}
                        </a>
                      </h3>
                      {q?.waitingForApproval ? (
                        <p className="waiting-for-approval">
                          waiting for approval
                        </p>
                      ) : null}
                      {checkIfUsersAnswerIsRight(q?._id) ? (
                        <p className="right-answer">Right answer</p>
                      ) : (
                        <></>
                      )}
                      <div className="s-post-summary--meta">
                        {q.tags.map((tag) => (
                          <div className="s-post-summary--meta-tags tags js-tags t-python t-pandas t-dataframe t-pandas-groupby t-aggregation">
                            <a
                              href={`/tagOverview/${tag.id}`}
                              className="post-tag flex--item mt0 js-tagname-python"
                              title="show questions tagged 'python'"
                              rel="tag"
                            >
                              {tag.name}
                            </a>
                          </div>
                        ))}

                        <div className="s-user-card s-user-card__minimal">
                          <div className="s-user-card--info">
                            <div className="s-user-card--link d-flex gs4"></div>
                          </div>

                          <time className="s-user-card--time">
                            asked{" "}
                            <span className="relativetime">
                              {moment(q?.question?.[0]?.createdAt).format(
                                "MMMM DD,YYYY"
                              )}{" "}
                              at{" "}
                              {moment(q?.question?.[0]?.createdAt).format(
                                "h:mm"
                              )}
                            </span>
                          </time>
                        </div>
                      </div>
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

export default Questionstab;
