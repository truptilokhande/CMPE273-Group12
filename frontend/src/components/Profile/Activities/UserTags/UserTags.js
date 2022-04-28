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
          <div id="user-tab-tags" class="js-user-tab">
            <div class="d-flex ai-end jc-space-between mb8 fw-wrap">
              <div class="flex--item fl-grow1">
                <div class="d-flex fd-column">
                  <h2 class="flex--item fs-title mb0">
                    {userProfile?.tags?.length} Tags
                  </h2>
                </div>
              </div>
              <div class="flex--item">
                <div class="d-flex ai-end">
                  <div class="flex--item s-btn-group js-user-tab-sorts fl-shrink0 md:fl-shrink1">
                    <a
                      href="/users/2930622/g-rafael?tab=tags&amp;sort=votes"
                      class="as-center s-btn s-btn__muted s-btn__outlined s-btn__xs js-user-tab-sort is-selected js-selected"
                      data-sort="votes"
                    >
                      Score
                    </a>
                    <a
                      href="/users/2930622/g-rafael?tab=tags&amp;sort=name"
                      class="as-center s-btn s-btn__muted s-btn__outlined s-btn__xs js-user-tab-sort"
                      data-sort="name"
                    >
                      Name
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div class="ba bc-black-100 bar-md">
              {userProfile?.tags?.map((tag) => (
                <div class="p12 bb bc-black-075">
                  <div class="d-flex ai-center jc-space-between gs16 fw-wrap">
                    <div class="flex--item ws-nowrap">
                      <a
                        href="/search?q=user:2930622+[docker]"
                        class="post-tag js-gps-track"
                      >
                        {tag?.tagName}
                      </a>
                    </div>
                    <div class="flex--item">
                      <div class="d-flex gsx gs16">
                        <div class="flex--item d-flex ai-center mr-2">
                          <div class="fs-body3 mr4">{tag?.tagCount}</div>
                          <div class="fc-light tt-lowercase">Score</div>
                        </div>
                        {/* <div class="flex--item d-flex ai-center">
                          <div class="fs-body3 mr4">2</div>
                          <div class="fc-light">posts</div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div class="js-user-tab-paging"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default UserTags;
