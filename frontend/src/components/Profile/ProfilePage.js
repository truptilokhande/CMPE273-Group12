import "./ProfilePage.css";

import React, { useEffect, useState } from "react";
import goldTag from "../../assets/goldbadge.png";
import silverTag from "../../assets/silverbadge.png";
import bronzeTag from "../../assets/bronzebadge.png";
import axios from "axios";
import TopPosts from "./TopPosts/TopPosts.js";
import BasicDetails from "./BasicDetails/BasicDetails";
import connection from "../../config.json";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { getUserSuccess } from "../../store/actions/actions";

const ProfilePage = ({ user }) => {
  const [userProfile, setUserProfile] = useState();
  const [questionscount, setQuestionscount] = useState();
  const [answerCount, setAnswerCount] = useState();
  const [views, setViews] = useState();

  const loginUser = useSelector(getUserSuccess);

  const [creatednewchat, setNewChat] = useState(false);

  const [userTags, setUserTags] = useState([]);

  const [goldBadges, setGoldBadges] = useState([]);
  const [silverBadges, setSilverBadges] = useState([]);
  const [bronzeBadges, setBronzeBadges] = useState([]);
  const [receiver, setReceiverID] = useState("");
  const token = localStorage.getItem("token");

  const [about, setAbout] = useState("");

  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);

  const [receivername, setReceiverName] = useState("");
  const [sender, setSenderID] = useState(loginUser.payload.user._id);
  const [tagScores, setTagScores] = useState();
  const [goldCount, setGoldCount] = useState([]);
  const [silverCount, setSilverCount] = useState([]);
  const [bronzeCount, setBronzeCount] = useState([]);

  useEffect(() => {
    setReceiverID(id);
    axios
      .get(`${connection.connectionURL}/api/user/getUser/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserProfile(response?.data?.data);

        // setGoldBadges(
        //   response?.data?.data?.tags
        //     ?.sort(function (a, b) {
        //       return b.tagCount - a.tagCount;
        //     })
        //     .slice(0, 6)
        // );
        if (response?.data?.data?.tags?.length > 6) {
          const userTags = response?.data?.data?.tags;
          userTags.map((tag) => {
            const scores = response?.data?.tagScores;
            const matchtag = scores?.find((t) => t._id === tag.tagId);
            tag.score = matchtag?.score || 0;
            return tag;
          });
          const sortedTags = userTags?.sort(function (a, b) {
            return b?.score - a?.score;
          });
          const tags = sortedTags.slice(0, 6);
          setUserTags(tags);
        } else {
          const userTags = response?.data?.data?.tags;
          userTags.map((tag) => {
            const scores = response?.data?.tagScores;
            const matchtag = scores?.find((tag) => tag._id === tag.tagId);
            tag.score = matchtag?.score || 0;
            return tag;
          });
          const sortedTags = userTags?.sort(function (a, b) {
            return b?.score - a?.score;
          });
          setUserTags(sortedTags);
        }

        setQuestionscount(response?.data?.qc);
        setAnswerCount(response?.data?.ac);
        setViews(response?.data?.views);
        setAbout(response?.data.data.about);
        setTagScores(response?.data?.tagScores);

        const filteredGoldTags = response?.data?.data?.tags?.filter(
          (tag) => tag?.tagCount > 20
        );
        setGoldCount(filteredGoldTags);

        filteredGoldTags.sort(function (a, b) {
          return b.tagCount - a.tagCount;
        });
        setGoldBadges(filteredGoldTags.slice(0, 3));

        const filteredSilverTags = response?.data?.data?.tags?.filter(
          (tag) => tag?.tagCount <= 15 && tag?.tagCount > 10
        );
        setSilverCount(filteredSilverTags);

        filteredSilverTags.sort(function (a, b) {
          return b.tagCount - a.tagCount;
        });
        setSilverBadges(filteredSilverTags.slice(0, 3));

        const filteredBronzeTags = response?.data?.data?.tags?.filter(
          (tag) => tag?.tagCount <= 10
        );
        setBronzeCount(filteredBronzeTags);

        filteredBronzeTags.sort(function (a, b) {
          return b.tagCount - a.tagCount;
        });
        setBronzeBadges(filteredBronzeTags.slice(0, 3));
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const getTagScore = (id) => {
    const tag = tagScores?.find((tag) => tag._id === id);
    return tag?.score || 0;
  };

  function startnewchat() {
    axios
      .post(
        `${connection.connectionURL}/api/messages/sendMessage`,
        {
          /*    change this to sender ID from store */
          senderID: sender,
          receiverID: receiver,
          receiverName: userProfile.name,
          senderName: user.name,
          message: "",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log("%%%", res);
        setNewChat(true);
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%", creatednewchat);
        localStorage.setItem("receiver", receiver);
        localStorage.setItem("sender", sender);
        localStorage.setItem("receivername", userProfile.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <BasicDetails userdetails={userProfile}></BasicDetails>
      <div>
        <div className="about">
          About:<i> {about}</i>
          <br />
          <span>
            {loginUser.payload.user._id === id ? (
              <Link to={`/Editdetails/${id}`}>
                <button className="nav-signup-btn nav-btn mx-2">
                  edit details
                </button>
              </Link>
            ) : (
              <span></span>
            )}
          </span>
          <button
            onClick={startnewchat}
            className="nav-signup-btn  nav-btn form-input-button"
            style={{ width: "100px" }}
          >
            Start Chat
          </button>
          {creatednewchat && <Navigate to="/chat" />}
          <br />
        </div>
      </div>
      <div id="mainbar" className="d-flex flex-col user-main-bar pl24 pt24">
        <div className="m-3">
          <div className="fs-title mb8">Stats</div>
          <div className="s-card fc-light bar-md">
            <div className="d-flex flex__allitems6 gs16 fw-wrap md:jc-space-between">
              <div className="flex--item md:fl-auto">
                <div className="fs-body3 fc-dark">
                  {userProfile?.reputation}
                </div>
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
          <div className="grid--item">
            <div className="d-flex ai-center jc-space-between mb8">
              <div className="flex--item fs-title">Badges</div>
              <a
                href={`/ActivityBadges/${id}`}
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
                        alt=""
                        style={{ height: "48px", width: "48px" }}
                      ></img>
                    </div>
                    <div className="flex--item fl1">
                      <div className="fs-title fw-bold fc-black-800">
                        {goldCount.length}
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
                        {silverCount.length}
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
                        {bronzeCount.length}
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
          {userTags?.map((tag) => (
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
                    <div className="flex--item d-flex ai-center mr-2">
                      <div className="fs-body3 mr4">
                        {getTagScore(tag?.tagId)}
                      </div>
                      <div className="fc-light tt-lowercase">score</div>
                    </div>
                    <div className="flex--item d-flex ai-center mr-2">
                      <div className="fs-body3 mr4">{tag?.tagCount}</div>
                      <div className="fc-light tt-lowercase">posts</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex--item fs-title">Top Posts</div>
      <TopPosts />
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(ProfilePage);
