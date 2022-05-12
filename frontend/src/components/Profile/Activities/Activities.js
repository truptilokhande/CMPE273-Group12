import React, { useEffect, useState } from "react";
import axios from "axios";
import connection from "../../../config.json";
import BasicDetails from "../BasicDetails/BasicDetails";
import "./Activities.css";
import moment from "moment";

function Activities() {
  const [userProfile, setUserProfile] = useState();
  const [answers, setAnswers] = useState([]);

  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
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
        setAnswers(response?.data?.answerposts);
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
          <div id="user-tab-answers" className="js-user-tab">
            <div className="d-flex ai-end jc-space-between mb8 fw-wrap">
              <div className="flex--item fl-grow1">
                <div className="d-flex fd-column">
                  <h2 className="flex--item fs-title mb0">
                    {answers?.length} Answers
                  </h2>
                </div>
              </div>
            </div>

            <div className="ba bc-black-100 bar-md">
              <div id="js-post-summaries">
                {answers?.map((ans) => (
                  <div className="s-post-summary s-post-summary__minimal js-post-summary">
                    <div className="s-post-summary--stats js-post-summary-stats">
                      <div className="s-post-summary--stats-item s-post-summary--stats-item__emphasized">
                        <span className="s-post-summary--stats-item-number"></span>
                        <div className="d-flex flex-column">
                          <span className="s-post-summary--stats-item-unit">
                            {ans?.question[0]?.votes}
                            <span className="ml-1">votes</span>
                          </span>
                          {ans?.markedAsRight ? (
                            <div>marked as right</div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="s-post-summary--content">
                      <h3 className="s-post-summary--content-title">
                        <a
                          href={`/questionOverview/${ans?.question[0]?._id}`}
                          className="answer-hyperlink "
                        >
                          {ans?.question[0]?.title}
                        </a>
                      </h3>
                      <div className="s-post-summary--meta">
                        {ans?.question[0]?.tags?.map((tag) => (
                          <div className="s-post-summary--meta-tags tags js-tags t-python t-file t-copy t-filesystems t-file-copying">
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
                            answered{" "}
                            <span
                              title="2015-05-20 20:01:48Z"
                              className="relativetime"
                            >
                              {moment(ans?.question[0]?.createdAt).format(
                                "MMMM DD,YYYY"
                              )}{" "}
                              at{" "}
                              {moment(ans?.question[0]?.createdAt).format(
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

export default Activities;
