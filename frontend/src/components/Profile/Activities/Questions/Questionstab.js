import React, { useEffect, useState } from "react";
import "./Questionstab.css";
import axios from "axios";
import connection from "../../../../config.json";
import BasicDetails from "../../BasicDetails/BasicDetails";
import moment from "moment";

function Questionstab() {
  const [userProfile, setUserProfile] = useState();
  const [questions, setQuestions] = useState([]);

  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);

  useEffect(() => {
    axios
      .get(`${connection.connectionURL}/api/user/getUser/${id}`)
      .then((response) => {
        setUserProfile(response?.data?.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${connection.connectionURL}/api/user/getTopposts/${id}`)
      .then((response) => {
        console.log(response);
        setQuestions(response?.data?.quesposts);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <div>
      <BasicDetails userdetails={userProfile} />
      <div class="d-flex mb48">
        <nav
          class="flex--item fl-shrink0 mr32 wmn1 md:d-none js-settings-nav"
          role="navigation"
        >
          <ul class="ps-sticky t64 s-navigation s-navigation__muted s-navigation__vertical">
            <li>
              <a
                class="s-navigation--item is-selected pr48 ps-relative"
                href={`/Activities/${id}`}
                title="Answers this user provided"
                data-shortcut="A"
              >
                Answers
              </a>
            </li>
            <li>
              <a
                class="s-navigation--item pr48 ps-relative"
                href={`/Questions/Questionstab/${id}`}
                title="Questions this user asked"
                data-shortcut="Q"
              >
                Questions
              </a>
            </li>
            <li>
              <a
                class="s-navigation--item pr48 ps-relative"
                href={`/UserTags/${id}`}
                title="Tags this user has posts in"
                data-shortcut="T"
              >
                Tags
              </a>
            </li>

            <li>
              <a
                class="s-navigation--item pr48 ps-relative"
                href={`/ActivityBadges/${id}`}
                title="Badges this user has earned"
                data-shortcut="B"
              >
                Badges
              </a>
            </li>
            <li>
              <a
                class="s-navigation--item pr48 ps-relative"
                href={`/Bookmarkstab/Bookmarkstab/${id}`}
                title="Questions this user has bookmarked"
                data-shortcut="F"
              >
                Bookmarks
              </a>
            </li>

            <li>
              <a
                class="s-navigation--item pr48 ps-relative"
                href={`/Reputation/${id}`}
                title="Reputation this user has earned"
                data-shortcut="R"
              >
                Reputation
              </a>
            </li>
          </ul>
        </nav>

        <section class="flex--item fl-grow1 wmx100">
          <div id="user-tab-questions" class="js-user-tab">
            <div class="d-flex ai-end jc-space-between mb8 fw-wrap">
              <div class="flex--item fl-grow1">
                <div class="d-flex fd-column">
                  <h2 class="flex--item fs-title mb0">
                    {questions?.length} Questions
                  </h2>
                </div>
              </div>
            </div>

            <div class="ba bc-black-100 bar-md">
              <div id="js-post-summaries">
                {questions?.map((q) => (
                  <div class="s-post-summary s-post-summary__minimal js-post-summary">
                    <div class="s-post-summary--stats js-post-summary-stats">
                      <div class="s-post-summary--stats-item s-post-summary--stats-item__emphasized">
                        <span class="s-post-summary--stats-item-number">
                          {q?.votes}
                        </span>
                        <span class="s-post-summary--stats-item-unit">
                          votes
                        </span>
                      </div>
                      <div
                        class="s-post-summary--stats-item is-hot"
                        title="40585 views"
                      >
                        <span class="s-post-summary--stats-item-number">
                          {q?.views}
                        </span>
                        <span class="s-post-summary--stats-item-unit">
                          views
                        </span>
                      </div>
                    </div>

                    <div class="s-post-summary--content">
                      <h3 class="s-post-summary--content-title">
                        <a
                          href="/questions/53781634/aggregation-in-pandas"
                          class="s-link"
                        >
                          {q.title}
                        </a>
                      </h3>
                      {
                      q?.waitingForApproval
                      ? <p>waiting for approval</p>
                      : null
                      }
                      <div class="s-post-summary--meta">
                        {q.tags.map((tag) => (
                          <div class="s-post-summary--meta-tags tags js-tags t-python t-pandas t-dataframe t-pandas-groupby t-aggregation">
                            <a
                              href="/questions/tagged/python"
                              class="post-tag flex--item mt0 js-tagname-python"
                              title="show questions tagged 'python'"
                              rel="tag"
                            >
                              {tag.name}
                            </a>
                          </div>
                        ))}

                        <div class="s-user-card s-user-card__minimal">
                          <div class="s-user-card--info">
                            <div class="s-user-card--link d-flex gs4"></div>
                          </div>

                          <time class="s-user-card--time">
                            asked{" "}
                            <span
                              class="relativetime"
                            >
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
