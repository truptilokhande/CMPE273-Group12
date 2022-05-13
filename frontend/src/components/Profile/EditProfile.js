import React, { useEffect, useState } from "react";
import BasicDetails from "./BasicDetails/BasicDetails";
import "./EditProfile.css";

import { connect, useDispatch, useSelector } from "react-redux";
import { editdetails } from "../../store/thunk/thunk";
import axios from "axios";

import connection from "../../config.json";

function EditProfile() {
  //const dispatch = useDispatch();
  //const user = useSelector(selectUser);
  const [userProfile, setUserProfile] = useState("");
  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("");
  const [location, setLocation] = useState("");
  const [aboutme, setAbout] = useState("");
  const [title, setTitle] = useState("");
  const [websitelink, setWebsiteLink] = useState("");
  const [githublink, setGithubLink] = useState("");
  const [twitterlink, setTwitterLink] = useState("");
  const [fullname, setFullName] = useState("");
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);
  console.log(id);
  // const [pic, setPic] = useState();
  useEffect(() => {
    fetchItemDetails();
  }, []);

  const fetchItemDetails = (e) => {
    const token = localStorage.getItem("token");
    axios
      .get(`${connection.connectionURL}/api/user/getUser/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserProfile(response?.data?.data);
        if (response.data.success === true) {
          setUserName(response.data.data["name"]);
          setUserImage(response.data.data["profilepicture"]);
          setLocation(response.data.data["location"]);
          setAbout(response.data.data["about"]);
          setTitle(response.data.data["title"]);
          setWebsiteLink(response.data.data["websitelink"]);
          setGithubLink(response.data.data["githublink"]);
          setTwitterLink(response.data.data["twitterlink"]);
          setFullName(response.data.data["fullname"]);
          console.log("details stored in backend");
        }
      });
  };

  const updateProfile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userImage", userImage);
    formData.append("userName", userName);
    formData.append("location", location);
    formData.append("aboutme", aboutme);
    formData.append("title", title);
    formData.append("websitelink", websitelink);
    formData.append("githublink", githublink);
    formData.append("twitterlink", twitterlink);
    formData.append("fullname", fullname);
    console.log(formData);
    axios
      .put(`${connection.connectionURL}/api/user/editProfile/${id}`, formData)
      .then((response) => {
        console.log(response.data.data);
        if (response.data.success === true) {
          console.log(response?.data?.data);
          // setUserName(response.data.data["name"]);
          // setLocation(response.data.data["location"]);
          // setAbout(response.data.data["about"]);
          // setTitle(response.data.data["title"]);
          // setWebsiteLink(response.data.data["websitelink"]);
          // setGithubLink(response.data.data["githublink"]);
          // setTwitterLink(response.data.data["twitterlink"]);
          // setFullName(response.data.data["fullname"]);
          // setUserImage(response.data.profilepicture);
        }
      });
    window.location.pathname = `/Editdetails/${id}`;
  };

  return (
    <div>
      <div className="editdetails-content">
        <div className="editdetails-heading">
          <div className="editdetails-h1">
            <h2>Edit your profile</h2>
          </div>
        </div>
        <form encType="multipart/form-data">
          <div className="editdetails-h2">
            <div className="editdetails-publicinfo">
              <div className="editdetails-profileimg">
                <h4>Profile image</h4>
                <img
                  src={userImage}
                  alt="userimage"
                  style={{ width: "100px", borderRadius: "50%" }}
                />

                <input
                  type="file"
                  name="userImage"
                  id="profile-picture"
                  onChange={(event) => {
                    setUserImage(event.target.files[0]);
                  }}
                  style={{
                    marginLeft: "40px",
                    backgroundColor: "transperant",
                    width: "110px",
                    padding: "15px",
                  }}
                />
              </div>

              <div className="editdetails-name">
                <div className="label">Display Name</div>
                <input
                  type="text"
                  value={userName === "undefined" ? "" : userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="editdetails-location">
                <div className="label">Location</div>
                <input
                  type="text"
                  placeholder="Enter Location"
                  value={location === "undefined" ? "" : location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="editdetails-title">
                <div className="label">Title</div>
                <input
                  type="text"
                  placeholder="Enter Title"
                  value={title === "undefined" ? "" : title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="editdetails-editor">
                <div className="label">About me</div>
                <div className="ck-editor__editable">
                  <input
                    type="text"
                    value={aboutme === "undefined" ? "" : aboutme}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="editdetails-links">
            <div className="label">Links</div>
            <div className="editdetails-links-group">
              <div className="editdetails-editlabel-weblink">
                <div className="label">Website link</div>
                <input
                  type="text"
                  value={websitelink === "undefined" ? "" : websitelink}
                  onChange={(e) => setWebsiteLink(e.target.value)}
                />
              </div>

              <div className="editdetails-editlabel-twitterlink">
                <div className="label">Twitter link or username</div>
                <input
                  type="text"
                  value={twitterlink === "undefined" ? "" : twitterlink}
                  onChange={(e) => setTwitterLink(e.target.value)}
                />
              </div>

              <div className="editdetails-editlabel-githublink">
                <div className="label">GitHub link or username</div>
                <input
                  type="text"
                  value={githublink === "undefined" ? "" : githublink}
                  onChange={(e) => setGithubLink(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="editdetails-privateinfo">
            <div className="label">Private information</div>
            <div className="editdetails-privateinfo-group">
              <div className="label">full name</div>
              <input
                type="text"
                placeholder="Enter Name"
                value={fullname === "undefined" ? "" : fullname}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

          <div className="editdetails-saveinfo">
            <div className="editdetails-savebtn">
              <button onClick={updateProfile} type="button" class="button">
                Save profile
              </button>
            </div>
            <div className="editdetails-cancelbtn">
              <button type="button" class="button">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
