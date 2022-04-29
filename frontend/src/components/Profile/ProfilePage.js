import "./ProfilePage.css";

import React, { useEffect, useState } from "react";
import goldTag from "../../assets/goldbadge.png";
import silverTag from "../../assets/silverbadge.png";
import bronzeTag from "../../assets/bronzebadge.png";
import axios from "axios";
import TopPosts from "./TopPosts/TopPosts.js";
import BasicDetails from "./BasicDetails/BasicDetails";
import connection from "../../config.json";

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState();
  const [questionscount, setQuestionscount] = useState();
  const [answerCount, setAnswerCount] = useState();

  const [userTags, setUserTags] = useState([]);

  const [goldBadges, setGoldBadges] = useState([]);
  const [silverBadges, setSilverBadges] = useState([]);
  const [bronzeBadges, setBronzeBadges] = useState([]);

  useEffect(() => {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    axios
      .get(`${connection.connectionURL}/api/user/getUser/${id}`)
      .then((response) => {
        setUserProfile(response?.data?.data);
        setUserTags(response?.data?.data?.tags);
        setQuestionscount(response?.data?.qc);
        setAnswerCount(response?.data?.ac);

        const filteredGoldTags = response?.data?.data?.tags?.filter(
          (tag) => tag?.tagCount > 20
        );
        const filteredSilverTags = response?.data?.data?.tags?.filter(
          (tag) => tag?.tagCount <= 15 && tag?.tagCount > 10
        );
        const filteredBronzeTags = response?.data?.data?.tags?.filter(
          (tag) => tag?.tagCount <= 10
        );

        setGoldBadges(filteredGoldTags);
        setSilverBadges(filteredSilverTags);
        setBronzeBadges(filteredBronzeTags);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <div>
      <BasicDetails userdetails={userProfile}></BasicDetails>
      <div id="mainbar" className="d-flex flex-col user-main-bar pl24 pt24">
        <div className="m-3">
          <div class="fs-title mb8">Stats</div>
          <div class="s-card fc-light bar-md">
            <div class="d-flex flex__allitems6 gs16 fw-wrap md:jc-space-between">
              <div class="flex--item md:fl-auto">
                <div class="fs-body3 fc-dark">{userProfile?.reputation}</div>
                reputation
              </div>
              <div class="flex--item md:fl-auto">
                <div class="fs-body3 fc-dark">2.4m</div>
                reached
              </div>
              <div class="flex--item md:fl-auto">
                <div class="fs-body3 fc-dark">{answerCount}</div>
                answers
              </div>
              <div class="flex--item md:fl-auto">
                <div class="fs-body3 fc-dark">{questionscount}</div>
                questions
              </div>
            </div>
          </div>
        </div>
        <div className="profile-all-dets m-3">
          <div className="about">
            <h4>About</h4>
            <div>
              <p> Python enthusiast</p>
              <button className="editdetbutton">edit details</button>
            </div>
          </div>
          <div class="grid--item">
            <div class="d-flex ai-center jc-space-between mb8">
              <div class="flex--item fs-title">Badges</div>
              <a
                href="/users/8690857/drew-reese?tab=badges"
                class="s-link s-link__muted flex--item js-gps-track"
                data-gps-track="profile_link.click({ target: 1, type: 2 })"
              >
                View all badges
              </a>
            </div>

            <div class="d-flex flex__fl-equal fw-wrap gs24">
              <div class="flex--item s-card bar-md">
                <div class="d-flex fd-column jc-space-between h100 g12">
                  <div class="d-flex ai-center">
                    <div class="flex--item mr12">
                      <img
                        src={goldTag}
                        style={{ height: "48px", width: "48px" }}
                      ></img>
                    </div>
                    <div class="flex--item fl1">
                      <div class="fs-title fw-bold fc-black-800">
                        {goldBadges.length}
                      </div>
                      <div class="fs-caption">gold badges</div>
                    </div>
                  </div>
                  <div class="flex--item mt-auto">
                    <ul class="list-reset d-grid g8">
                      {goldBadges?.map((goldTag) => {
                        return (
                          <li class="d-flex ai-center">
                            <a
                              href="/help/badges/10969/react-router-dom?userid=8690857"
                              title="gold badge: Earn at least 1000 total score for at least 200 non-community wiki answers in the react-router-dom tag"
                              data-gps-track="profile_link.click({target:1, type:2 })"
                              class="badge-tag d-flex ai-center m0 mr4 lh-md fs-fine js-gps-track"
                            >
                              <span class="badge1"></span>&nbsp;
                              <div class="d-inline-block truncate wmx1">
                                {goldTag.tagName}
                              </div>
                            </a>
                            {/* <div class="flex--item ml-auto fc-medium fs-fine ws-nowrap">
                              Mar 17
                            </div> */}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div class="flex--item s-card bar-md">
                <div class="d-flex fd-column jc-space-between h100 g12">
                  <div class="d-flex ai-center">
                    <div class="flex--item mr12">
                      <img
                        src={silverTag}
                        style={{ height: "48px", width: "48px" }}
                      ></img>
                    </div>
                    <div class="flex--item fl1">
                      <div class="fs-title fw-bold fc-black-800">
                        {silverBadges.length}
                      </div>
                      <div class="fs-caption">silver badges</div>
                    </div>
                  </div>
                  <div class="flex--item mt-auto">
                    <ul class="list-reset d-grid g8">
                      {silverBadges?.map((silverTag) => {
                        return (
                          <li class="d-flex ai-center">
                            <a
                              href="/help/badges/7226/react-router?userid=8690857"
                              title="silver badge: Earn at least 400 total score for at least 80 non-community wiki answers in the react-router tag"
                              data-gps-track="profile_link.click({target:1, type:2 })"
                              class="badge-tag d-flex ai-center m0 mr4 lh-md fs-fine js-gps-track"
                            >
                              <span class="badge2"></span>&nbsp;
                              <div class="d-inline-block truncate wmx1">
                                {silverTag.tagName}
                              </div>
                            </a>
                            {/* <div class="flex--item ml-auto fc-medium fs-fine ws-nowrap">
                              Dec 22
                            </div> */}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div class="flex--item s-card bar-md">
                <div class="d-flex fd-column jc-space-between h100 g12">
                  <div class="d-flex ai-center">
                    <div class="flex--item mr12">
                      <img
                        src={bronzeTag}
                        style={{ height: "48px", width: "48px" }}
                      ></img>
                    </div>
                    <div class="flex--item fl1">
                      <div class="fs-title fw-bold fc-black-800">
                        {bronzeBadges.length}
                      </div>
                      <div class="fs-caption">bronze badges</div>
                    </div>
                  </div>
                  <div class="flex--item mt-auto">
                    <ul class="list-reset d-grid g8">
                      {bronzeBadges?.map((bronzeTag) => {
                        return (
                          <li class="d-flex ai-center">
                            <a
                              href="/help/badges/10564/use-state?userid=8690857"
                              title="bronze badge: Earn at least 100 total score for at least 20 non-community wiki answers in the use-state tag"
                              data-gps-track="profile_link.click({target:1, type:2 })"
                              class="badge-tag d-flex ai-center m0 mr4 lh-md fs-fine js-gps-track"
                            >
                              <span class="badge3"></span>&nbsp;
                              <div class="d-inline-block truncate wmx1">
                                {bronzeTag.tagName}
                              </div>
                            </a>
                            {/* <div class="flex--item ml-auto fc-medium fs-fine ws-nowrap">
                              Jul 22
                            </div> */}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="top-tags" class="top-tags grid--item">
            <div class="d-flex ai-center jc-space-between mb8">
              <div class="flex--item fs-title">Top tags</div>
              <a href="/tags" class="s-link s-link__muted js-gps-track">
                View all tags
              </a>
            </div>
            <div class="s-card bar-md p0 w-100">
              {userTags.map((tag) => (
                <div class="p12 bb bc-black-075">
                  <div class="d-flex ai-center gs12 fw-wrap">
                    <div class="flex--item ws-nowrap">
                      <a
                        href={`/tagOverview/${tag?.tagId}`}
                        class="s-tag js-gps-track"
                      >
                        {tag?.tagName}
                      </a>
                      <a
                        href="/help/badges/5357/reactjs"
                        class="badge-tag bg-transparent bc-transparent m0"
                      >
                        <span class="badge1"></span>
                      </a>
                    </div>
                    <div class="flex--item ml-auto">
                      <div class="d-flex gsx gs16">
                        <div class="flex--item d-flex ai-center">
                          <div class="fs-body3 mr4">{tag?.tagCount}</div>
                          <div class="fc-light tt-lowercase">Score</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <TopPosts/>
    </div>
  );
};

export default ProfilePage;
