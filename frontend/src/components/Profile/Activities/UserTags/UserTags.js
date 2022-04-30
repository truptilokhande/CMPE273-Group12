import React, { useEffect, useState } from "react";
import "./UserTags.css";
import BasicDetails from "../../BasicDetails/BasicDetails";
import axios from "axios";
import connection from "../../../../config.json";

function UserTags() {
  const [userProfile, setUserProfile] = useState();

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
          <div id="user-tab-tags" className="js-user-tab">
            <div className="d-flex ai-end jc-space-between mb8 fw-wrap">
              <div className="flex--item fl-grow1">
                <div className="d-flex fd-column">
                  <h2 className="flex--item fs-title mb0">
                    {userProfile?.tags?.length} Tags
                  </h2>
                </div>
              </div>
            </div>

            <div className="ba bc-black-100 bar-md">
              {userProfile?.tags?.map((tag) => (
                <div className="p12 bb bc-black-075">
                  <div className="d-flex ai-center jc-space-between gs16 fw-wrap">
                    <div className="flex--item ws-nowrap">
                      <a
                        href={`/tagOverview/${tag?.tagId}`}
                        className="post-tag js-gps-track"
                      >
                        {tag?.tagName}
                      </a>
                    </div>
                    <div className="flex--item">
                      <div className="d-flex gsx gs16">
                        <div className="flex--item d-flex ai-center mr-2">
                          <div className="fs-body3 mr4">{tag?.tagCount}</div>
                          <div className="fc-light tt-lowercase">Score</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="js-user-tab-paging"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default UserTags;
