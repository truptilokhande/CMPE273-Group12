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
  const [views, setViews] = useState();

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
        setGoldBadges(
          response?.data?.data?.tags
            ?.sort(function (a, b) {
              return b.tagCount - a.tagCount;
            })
            .slice(0, 6)
        );
        setUserTags(response?.data?.data?.tags);
        setQuestionscount(response?.data?.qc);
        setAnswerCount(response?.data?.ac);
        setViews(response?.data?.views);

        const filteredGoldTags = response?.data?.data?.tags?.filter(
          (tag) => tag?.tagCount > 20
        );
        filteredGoldTags.sort(function (a, b) {
          return b.tagCount - a.tagCount;
        });
        setGoldBadges(filteredGoldTags.slice(0, 3));

        const filteredSilverTags = response?.data?.data?.tags?.filter(
          (tag) => tag?.tagCount <= 15 && tag?.tagCount > 10
        );
        filteredSilverTags.sort(function (a, b) {
          return b.tagCount - a.tagCount;
        });
        setSilverBadges(filteredSilverTags.slice(0, 3));

        const filteredBronzeTags = response?.data?.data?.tags?.filter(
          (tag) => tag?.tagCount <= 10
        );
        filteredBronzeTags.sort(function (a, b) {
          return b.tagCount - a.tagCount;
        });
        setBronzeBadges(filteredBronzeTags.slice(0, 3));
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
          <div className="fs-title mb8">Stats</div>
          <div className="s-card fc-light bar-md">
            <div className="d-flex flex__allitems6 gs16 fw-wrap md:jc-space-between">
              <div className="flex--item md:fl-auto">
                <div className="fs-body3 fc-dark">{userProfile?.reputation}</div>
                reputation
              </div>
              <div className="flex--item md:fl-auto">
                <div className="fs-body3 fc-dark">{views}</div>
                reached
              </div>
              <div className="flex--item md:fl-auto">
                <div className="fs-body3 fc-dark">{answerCount}</div>
                answers
              </div>
              <div className="flex--item md:fl-auto">
                <div className="fs-body3 fc-dark">{questionscount}</div>
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
          <div className="grid--item">
            <div className="d-flex ai-center jc-space-between mb8">
              <div className="flex--item fs-title">Badges</div>
              <a
                href="/users/8690857/drew-reese?tab=badges"
                className="s-link s-link__muted flex--item js-gps-track"
                data-gps-track="profile_link.click({ target: 1, type: 2 })"
              >
                View all badges
              </a>
            </div>

            <div className="d-flex flex__fl-equal fw-wrap gs24">
              <div className="flex--item s-card bar-md">
                <div className="d-flex fd-column jc-space-between h100 g12">
                  <div className="d-flex ai-center">
                    <div className="flex--item mr12">
                      <img
                        src={goldTag}
                        style={{ height: "48px", width: "48px" }}
                      ></img>
                    </div>
                    <div className="flex--item fl1">
                      <div className="fs-title fw-bold fc-black-800">
                        {goldBadges.length}
                      </div>
                      <div className="fs-caption">gold badges</div>
                    </div>
                  </div>
                  <div className="flex--item mt-auto">
                    <ul className="list-reset d-grid g8">
                      {goldBadges?.map((goldTag) => {
                        return (
                          <li className="d-flex ai-center">
                            <a
                              href={`/tagOverview/${goldTag?.tagId}`}
                              className="badge-tag d-flex ai-center m0 mr4 lh-md fs-fine js-gps-track"
                            >
                              <span className="badge1">●</span>
                              <div className="d-inline-block truncate ml-1">
                                {goldTag.tagName}
                              </div>
                            </a>
                            {/* <div className="flex--item ml-auto fc-medium fs-fine ws-nowrap">
                              Mar 17
                            </div> */}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex--item s-card bar-md">
                <div className="d-flex fd-column jc-space-between h100 g12">
                  <div className="d-flex ai-center">
                    <div className="flex--item mr12">
                      <img
                        src={silverTag}
                        style={{ height: "48px", width: "48px" }}
                      ></img>
                    </div>
                    <div className="flex--item fl1">
                      <div className="fs-title fw-bold fc-black-800">
                        {silverBadges.length}
                      </div>
                      <div className="fs-caption">silver badges</div>
                    </div>
                  </div>
                  <div className="flex--item mt-auto">
                    <ul className="list-reset d-grid g8">
                      {silverBadges?.map((silverTag) => {
                        return (
                          <li className="d-flex ai-center">
                            <a
                              href={`/tagOverview/${silverTag?.tagId}`}
                              className="badge-tag d-flex ai-center m0 mr4 lh-md fs-fine js-gps-track"
                            >
                              <span className="badge2">●</span>
                              <div className="d-inline-block truncate ml-1">
                                {silverTag.tagName}
                              </div>
                            </a>
                            {/* <div className="flex--item ml-auto fc-medium fs-fine ws-nowrap">
                              Dec 22
                            </div> */}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex--item s-card bar-md">
                <div className="d-flex fd-column jc-space-between h100 g12">
                  <div className="d-flex ai-center">
                    <div className="flex--item mr12">
                      <img
                        src={bronzeTag}
                        style={{ height: "48px", width: "48px" }}
                      ></img>
                    </div>
                    <div className="flex--item fl1">
                      <div className="fs-title fw-bold fc-black-800">
                        {bronzeBadges.length}
                      </div>
                      <div className="fs-caption">bronze badges</div>
                    </div>
                  </div>
                  <div className="flex--item mt-auto">
                    <ul className="list-reset d-grid g8">
                      {bronzeBadges?.map((bronzeTag) => {
                        return (
                          <li className="d-flex ai-center">
                            <a
                              href={`/tagOverview/${bronzeTag?.tagId}`}
                              className="badge-tag d-flex ai-center m0 mr4 lh-md fs-fine js-gps-track"
                            >
                              <span className="badge3">●</span>
                              <div className="d-inline-block truncate ml-1">
                                {bronzeTag.tagName}
                              </div>
                            </a>
                            {/* <div className="flex--item ml-auto fc-medium fs-fine ws-nowrap">
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
          <div id="top-tags" className="top-tags grid--item">
            <div className="d-flex ai-center jc-space-between mb8">
              <div className="flex--item fs-title">Top tags</div>
              <a href="/tags" className="s-link s-link__muted js-gps-track">
                View all tags
              </a>
            </div>
            <div className="s-card bar-md p0 w-100">
              {userTags.map((tag) => (
                <div className="p12 bb bc-black-075">
                  <div className="d-flex ai-center gs12 fw-wrap">
                    <div className="flex--item ws-nowrap">
                      <a
                        href={`/tagOverview/${tag?.tagId}`}
                        className="s-tag js-gps-track"
                      >
                        {tag?.tagName}
                      </a>
                      <a
                        href="/help/badges/5357/reactjs"
                        className="badge-tag bg-transparent bc-transparent m0"
                      >
                        <span className="badge1"></span>
                      </a>
                    </div>
                    <div className="flex--item ml-auto">
                      <div className="d-flex gsx gs16">
                        <div className="flex--item d-flex ai-center">
                          <div className="fs-body3 mr4">{tag?.tagCount}</div>
                          <div className="fc-light tt-lowercase">Score</div>
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
      <TopPosts />
    </div>
  );
};

export default ProfilePage;
