import React, { useState, useEffect } from "react";
import "./ActivityBadges.css";
import BasicDetails from "../../BasicDetails/BasicDetails";
import axios from "axios";
import connection from "../../../../config.json";

function ActivityBadges() {
  const [userProfile, setUserProfile] = useState();
  const [userTags, setUserTags] = useState([]);
  const [goldBadges, setGoldBadges] = useState([]);
  const [silverBadges, setSilverBadges] = useState([]);
  const [bronzeBadges, setBronzeBadges] = useState([]);

  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);
  useEffect(() => {
    axios
      .get(`${connection.connectionURL}/api/user/getUser/${id}`)
      .then((response) => {
        setUserProfile(response?.data?.data);
        setUserTags(response?.data?.data?.tags);

        const filteredGoldTags = response?.data?.data?.tags?.filter(
          (tag) => tag?.tagCount > 20
        );
        setGoldBadges(filteredGoldTags.length);

        const filteredSilverTags = response?.data?.data?.tags?.filter(
          (tag) => tag?.tagCount <= 15 && tag?.tagCount > 10
        );
        setSilverBadges(filteredSilverTags.length);

        const filteredBronzeTags = response?.data?.data?.tags?.filter(
          (tag) => tag?.tagCount <= 10
        );
        setBronzeBadges(filteredBronzeTags.length);
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
          <div id="user-tab-badges" class="js-user-tab">
            <div class="mb-3">
              <h2>{userTags.length} Badges</h2>
            </div>

            <div class="row">
              {userTags?.map((userTag) => {
                return (
                  <div class="col-2">
                    <a href={`/tagOverview/${userTag?.tagId}`} className="tag">
                      {userTag?.tagCount <= 10 ? (
                        <span className="badge3">●</span>
                      ) : null}
                      {userTag?.tagCount >= 10 && userTag?.tagCount <= 15 ? (
                        <span className="badge2">●</span>
                      ) : null}
                      {userTag?.tagCount >= 10 &&
                      userTag?.tagCount >= 15 &&
                      userTag?.tagCount <= 20 ? (
                        <span className="badge1">●</span>
                      ) : null}
                      <span className="ml-1">{userTag?.tagName}</span>
                    </a>
                  </div>
                );
              })}
            </div>
            <div className="row">
              {bronzeBadges <= 2 &&
              silverBadges > 2 &&
              silverBadges < 5 &&
              goldBadges >= 5 ? (
                <div class="col-2">
                  <a href="/" className="tag">
                    curious
                  </a>
                </div>
              ) : null}
              {bronzeBadges <= 2 &&
              silverBadges > 2 &&
              silverBadges < 5 &&
              goldBadges >= 5 ? (
                <div class="col-2">
                  <a href="/" className="tag">
                    Helpfulness
                  </a>
                </div>
              ) : null}
              <div class="col-2">
                <a href="/" className="tag">
                  popular
                </a>
              </div>
              <div class="col-2">
                <a href="/" className="tag">
                  sportsmanship
                </a>
              </div>
              <div class="col-2">
                <a href="/" className="tag">
                  critic
                </a>
              </div>
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

export default ActivityBadges;
