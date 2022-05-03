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

  const [curious, setCurious] = useState();
  const [helpfulness, setHelpfulness] = useState();
  const [popular, setPopular] = useState(0);
  const [sportsmanship, setSportsmanship] = useState(0);
  const [critic, setCritic] = useState(0);
  const [notable, setNotable] = useState(0);
  const [famous, setFamous] = useState(0);
  const [pundit, setPundit] = useState(0);

  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);
  useEffect(() => {
    axios
      .get(`${connection.connectionURL}/api/user/getUser/${id}`)
      .then((response) => {
        console.log(response?.data?.data);
        setUserProfile(response?.data?.data);
        setUserTags(response?.data?.data?.tags);
        setCurious(response?.data?.qc);
        setHelpfulness(response?.data?.ac);
        setPopular(response?.data?.data?.reputation);
        setSportsmanship(response?.data?.data?.upVoteCount);
        setCritic(response?.data?.data?.downVoteCount);
        setNotable(response?.data?.views);
        setFamous(response?.data?.views);
        setPundit(response?.data?.cc)

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
          <div id="user-tab-badges" className="js-user-tab">
            <div className="mb-3">
              <h2>{userTags.length} Badges</h2>
            </div>

            <div className="row">
              <div className="col-2 p-2">
                <a href="/" className="tag">
                  {curious <= 2 ? <span className="badge3">●</span> : null}
                  {curious > 2 && curious < 5 ? (
                    <span className="badge2">●</span>
                  ) : null}
                  {curious >= 5 ? <span className="badge1">●</span> : null}
                  Curious
                </a>
              </div>

              <div className="col-2 p-2">
                <a href="/" className="tag">
                  {helpfulness <= 2 ? <span className="badge3">●</span> : null}
                  {helpfulness > 2 && helpfulness < 5 ? (
                    <span className="badge2">●</span>
                  ) : null}
                  {helpfulness >= 5 ? <span className="badge1">●</span> : null}
                  Helpfulness
                </a>
              </div>

              <div className="col-2 p-2">
                <a href="/" className="tag">
                  {popular <= 2 ? <span className="badge3">●</span> : null}
                  {popular > 2 && popular < 5 ? (
                    <span className="badge2">●</span>
                  ) : null}
                  {popular >= 5 ? <span className="badge1">●</span> : null}
                  Popular
                </a>
              </div>

              <div className="col-2 p-2">
                <a href="/" className="tag">
                  {sportsmanship <= 2 ? (
                    <span className="badge3">●</span>
                  ) : null}
                  {sportsmanship > 2 && sportsmanship < 5 ? (
                    <span className="badge2">●</span>
                  ) : null}
                  {sportsmanship >= 5 ? (
                    <span className="badge1">●</span>
                  ) : null}
                  Sportsmanship
                </a>
              </div>

              <div className="col-2 p-2">
                <a href="/" className="tag">
                  {critic <= 2 ? <span className="badge3">●</span> : null}
                  {critic > 2 && critic < 5 ? (
                    <span className="badge2">●</span>
                  ) : null}
                  {critic >= 5 ? <span className="badge1">●</span> : null}
                  Critic
                </a>
              </div>

              <div className="col-2 p-2">
                <a href="/" className="tag">
                  {notable <= 2 ? <span className="badge3">●</span> : null}
                  {notable > 2 && notable < 5 ? (
                    <span className="badge2">●</span>
                  ) : null}
                  {notable >= 5 && notable <= 15 ? (
                    <span className="badge1">●</span>
                  ) : null}
                  Notable Question
                </a>
              </div>

              <div className="col-2 p-2">
                <a href="/" className="tag">
                  {famous > 15 ? (
                    <span className="badge1">●</span>
                  ) : (
                    <span className="badge3">●</span>
                  )}
                  Famous Question
                </a>
              </div>
              <div className="col-2 p-2">
                <a href="/" className="tag">
                  {pundit <= 2 ? <span className="badge3">●</span> : null}
                  {pundit > 2 && pundit < 5 ? (
                    <span className="badge2">●</span>
                  ) : null}
                  {pundit >= 5 ? <span className="badge1">●</span> : null}
                  Pundit
                </a>
              </div>
              {userTags?.map((userTag) => {
                return (
                    <div className="col-2 p-2">
                      <a
                        href={`/tagOverview/${userTag?.tagId}`}
                        className="tag"
                      >
                        {userTag?.tagCount <= 10 ? (
                          <span className="badge3">●</span>
                        ) : null}
                        {userTag?.tagCount >= 10 && userTag?.tagCount <= 15 ? (
                          <span className="badge2">●</span>
                        ) : null}
                        {userTag?.tagCount > 20 ? (
                          <span className="badge1">●</span>
                        ) : null}
                        <span className="ml-1">{userTag?.tagName}</span>
                      </a>
                  </div>
                );
              })}
            </div>

            {/* <div className="row"></div> */}
            <div>
              <div className="js-user-tab-paging"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ActivityBadges;
