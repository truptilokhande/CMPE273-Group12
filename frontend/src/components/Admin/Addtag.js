import React, { useState } from "react";
import axios from "axios";
import connection from "../../config.json";
import { useNavigate } from "react-router-dom";

function Addtag() {
  const [tagTitle, setTagTitle] = useState();
  const [tagDescription, setTagDescription] = useState();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleAddTag = () => {
    axios
      .post(
        `${connection.connectionURL}/api/tag/addTag`,
        {
          tagTitle,
          tagDescription,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        // navigate("/tags");
        const alert = document.querySelector(".add-tag-success");
        if (alert) {
          alert.style.display = "block";
        }
        document.querySelector('.tagtitle').value=""
        document.querySelector('.tagdescription').value=""
        setTimeout(() => {
          if (alert) {
            alert.style.display = "none";
          }
        }, 5000);
      });
  };
  // document?.forms['search-form']?.reset();
  return (
    <div>
      <div class="alert alert-success add-tag-success" role="alert" style={{ display: "none" }}>
        Tag added!
      </div>
      <h2>Add a Tag</h2>
      <table>
        <tbody>
          <tr>
            <td>
              <label>Tag Name :</label>
            </td>
            <td>
              <input
                id="tagitle"
                name="tagtitle"
                type="text"
                maxLength="300"
                placeholder="Python"
                className="tagtitle"
                style={{ marginLeft: "20px" }}
                data-min-length="15"
                data-max-length="150"
                onChange={(e) => setTagTitle(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Tag descrption :</label>
            </td>
            <td>
              <input
                id="tagdescription"
                name="tagdescription"
                type="textarea"
                length="300px"
                className="tagdescription"
                data-min-length="15"
                data-max-length="150"
                style={{ margin: "20px" }}
                onChange={(e) => setTagDescription(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <button
              onClick={handleAddTag}
              type="submit"
              className="addtag nav-login-btn nav-btn"
              style={{ borderRadius: "5px" }}
            >
              submit
            </button>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Addtag;
