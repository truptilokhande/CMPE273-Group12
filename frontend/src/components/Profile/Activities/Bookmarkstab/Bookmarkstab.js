import React, { useEffect, useState } from "react";
import "./Bookmarkstab.css";
import axios from "axios";
import connection from "../../../../config.json";
import BasicDetails from "../../BasicDetails/BasicDetails";
function Bookmarkstab() {
  const [userProfile, setUserProfile] = useState();
  const [, setBookmarks] = useState([]);
  const [questions, setQuestions] = useState([]);

  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);

  useEffect(() => {
    axios
      .get(`${connection.connectionURL}/api/user/getUser/${id}`)
      .then((response1) => {
        setUserProfile(response1?.data?.data);
        setBookmarks(response1?.data?.data?.bookmarks);
        axios
          .get(`${connection.connectionURL}/api/question/getQuestions`)
          .then((response) => {
            const filteredQuestions = response?.data?.data?.questions?.filter(
              (question) => response1?.data?.data?.bookmarks?.includes(question?._id)
            );
            setQuestions(filteredQuestions);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        throw err;
      });
  }, []);

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
          <div id="user-tab-bookmarks" className="js-user-tab">
            <div className="d-flex ai-end jc-space-between mb8 fw-wrap">
              <div className="flex--item fl-grow1">
                <div className="d-flex fd-column">
                  <h2 className="flex--item fs-title mb0">
                    {questions.length} Bookmarks
                  </h2>
                </div>
              </div>
            </div>
            <div className="ba bc-black-100 bar-md">
              <div id="js-post-summaries">
                {questions?.map((q) => (
                  <div
                    id="question-summary-53781634"
                    className="s-post-summary s-post-summary__minimal js-post-summary"
                  >
                    <div className="s-post-summary--stats js-post-summary-stats">
                      <div
                        className="s-post-summary--stats-item s-post-summary--stats-item__emphasized"
                        title="Score of 73"
                      >
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
                          href="/questions/53781634/aggregation-in-pandas"
                          className="s-link"
                        >
                          {q.title}
                        </a>
                      </h3>
                      <div className="s-post-summary--meta">
                        {q.tags.map((tag) => (
                          <div className="s-post-summary--meta-tags tags js-tags t-python t-pandas t-dataframe t-pandas-groupby t-aggregation">
                            <a
                              href="/questions/tagged/python"
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
                            <span
                              title="2018-12-14 14:30:27Z"
                              className="relativetime"
                            >
                              {q.createdAt}
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

export default Bookmarkstab;
