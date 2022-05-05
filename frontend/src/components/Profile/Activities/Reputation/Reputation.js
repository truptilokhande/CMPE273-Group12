import React, { useEffect, useState } from "react";
import axios from "axios";
import connection from "../../../../config.json";
import BasicDetails from "../../BasicDetails/BasicDetails";
import parse from "html-react-parser";
import RelativeTime from "@yaireo/relative-time";
import "./Reputation.css";
import { getText } from "domutils";

function Reputation() {
  const [userProfile, setUserProfile] = useState();
  const [reputation, setReputation] = useState([]);
  const relativeTime = new RelativeTime();

  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    axios
      .get(`${connection.connectionURL}/api/user/getUser/${id}`,
      { headers: {"Authorization" : `Bearer ${token}`} })
      .then((response) => {
        setUserProfile(response?.data?.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${connection.connectionURL}/api/question/getHistories/${id}`,
      { headers: {"Authorization" : `Bearer ${token}`} })
      .then((response) => {
        setReputation(response?.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const getText = (val) => {
    if (val === "upvote question") return "+5";
    if (val === "upvote answer") return "+10";
    if (val === "downvote question") return "-10";
    if (val === "downvote answer") return "-5";
  };
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
          <div id="user-tab-reputation" className="js-user-tab">
            <h2>{userProfile?.reputation} Reputation</h2>
            <table className="table-header">
              <thead>
                <tr>
                  <th>when</th>
                  <th>what</th>
                  <th>by</th>
                  <th>answer/question</th>
                </tr>
              </thead>
              {reputation?.map((log) => (
                <>
                  <thead>
                    <tr>
                      <td className="p-2">
                        {relativeTime.from(new Date(log?.created))}
                      </td>
                      <td>
                        {log?.what}
                        <span className="ml-1 reputation-score-log">
                          ({getText(log?.what)})
                        </span>
                      </td>
                      <td>{log?.user?.name}</td>
                      <td>{parse(log?.content)}</td>
                    </tr>
                  </thead>
                </>
              ))}
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Reputation;
