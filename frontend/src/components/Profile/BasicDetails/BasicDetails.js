import React from "react";
import "./BasicDetails.css";
import moment from "moment";

function BasicDetails({ userdetails }) {
  // const relativeTime = new RelativeTime();

  return (
    <div>
      <div className="d-flex ai-center fw-wrap gs16 mb16">
        <div className="md:d-none js-usermini-avatar-container">
          <div className="bar-md bs-sm">
            <img
              src={userdetails?.profilepicture}
              alt="user avatar"
              width="128"
              height="128"
              className="bar-sm bar-md d-block"
            ></img>
          </div>
        </div>
        <div className="flex--item">
          <div className="d-flex ai-center fw-wrap gs8 wmx4">
            <div className="flex--item mb12 fs-headline2 lh-xs">
              {userdetails?.name}
            </div>
            <div className="flex--item">
              <div className="d-flex ai-center fw-nowrap gs4"></div>
            </div>
          </div>

          <ul className="list-reset s-anchors s-anchors__inherit d-flex fc-light gs8 mln4 fw-wrap">
            <li className="flex--item">
              <div className="d-flex gs4 gsx ai-center">
                <div className="flex--item fc-black-350">
                  <svg
                    aria-hidden="true"
                    className="svg-icon iconCake"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path d="M9 4.5a1.5 1.5 0 0 0 1.28-2.27L9 0 7.72 2.23c-.14.22-.22.48-.22.77 0 .83.68 1.5 1.5 1.5Zm3.45 7.5-.8-.81-.81.8c-.98.98-2.69.98-3.67 0l-.8-.8-.82.8c-.49.49-1.14.76-1.83.76-.55 0-1.3-.17-1.72-.46V15c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2v-2.7c-.42.28-1.17.45-1.72.45-.69 0-1.34-.27-1.83-.76Zm1.3-5H10V5H8v2H4.25C3 7 2 8 2 9.25v.9c0 .81.91 1.47 1.72 1.47.39 0 .77-.14 1.03-.42l1.61-1.6 1.6 1.6a1.5 1.5 0 0 0 2.08 0l1.6-1.6 1.6 1.6c.28.28.64.43 1.03.43.81 0 1.73-.67 1.73-1.48v-.9C16 8.01 15 7 13.75 7Z"></path>
                  </svg>
                </div>
                <div className="flex--item ml-1">
                  Member for{" "}
                  <span>
                    {/* {relativeTime.from(new Date(userdetails?.createdAt) || "")} */}
                    {moment(userdetails?.createdAt).format("MMMM DD,YYYY")} at{" "}
                    {moment(userdetails?.createdAt).format("h:mm")}
                  </span>
                </div>
              </div>
            </li>

            <li className="flex--item">
              <div className="d-flex gs4 gsx align-center ml-1">
                <div className="flex--item fc-black-350">
                  <svg
                    aria-hidden="true"
                    className="svg-icon iconClock"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path d="M9 17c-4.36 0-8-3.64-8-8 0-4.36 3.64-8 8-8 4.36 0 8 3.64 8 8 0 4.36-3.64 8-8 8Zm0-2c3.27 0 6-2.73 6-6s-2.73-6-6-6-6 2.73-6 6 2.73 6 6 6ZM8 5h1.01L9 9.36l3.22 2.1-.6.93L8 10V5Z"></path>
                  </svg>
                </div>
                <div className="flex--item ml-1">
                  Last seen : {moment(userdetails?.lastLoginDate).format("MMMM DD,YYYY")} at{" "}
                  {moment(userdetails?.lastLoginDate).format("h:mm")}
                </div>
              </div>
            </li>
          </ul>
          {userdetails?.location && (
            <>
              <svg
                aria-hidden="true"
                class="mrn2 svg-icon iconLocation"
                width="17"
                height="18"
                viewBox="0 0 17 18"
              >
                <path d="M2 6.38C2 9.91 8.1 17.7 8.1 17.7c.22.29.58.29.8 0 0 0 6.1-7.8 6.1-11.32A6.44 6.44 0 0 0 8.5 0 6.44 6.44 0 0 0 2 6.38Zm9.25.12a2.75 2.75 0 1 1-5.5 0 2.75 2.75 0 0 1 5.5 0Z"></path>
              </svg>{" "}
              <>{userdetails?.location}</>
            </>
          )}
        </div>
      </div>
      <div className="d-flex ai-center jc-space-between fw-wrap mb16 js-user-header">
        <div className="flex--item s-navigation">
          <a
            href={`/userProfile/${userdetails?._id}`}
            className="s-navigation--item"
            data-shortcut="P"
          >
            Profile
          </a>
          <a
            href={`/Activities/${userdetails?._id}`}
            className="s-navigation--item is-selected"
            data-shortcut="A"
          >
            Activity
          </a>
        </div>
        <div className="flex--item ml-auto">
          <div className="s-navigation s-navigation__muted ai-center"></div>
        </div>
      </div>
    </div>
  );
}

export default BasicDetails;
