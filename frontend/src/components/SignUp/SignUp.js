import React, { useState } from "react";
import "./SignUp.css";
import { connect } from "react-redux";
import { signup } from "../../store/thunk/thunk";

function SignUp({ signUp }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showloader, setShowLoader] = useState(false);
  const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const register = async () => {
    const newUser = {
      email,
      name,
      password,
    };
    try {
      setShowLoader(true);
      await signUp(newUser);
      setShowLoader(false);
    } catch (err) {
      setShowLoader(false);
      console.log(err);
    }
  };

  return (
    <>
      <div className="sign-up-wrapper">
        <div className="sign-up d-flex flex-column justify-content-center m-4">
          <div className="text-center mb-4">
            <a href="https://stackoverflow.com">
              <svg
                aria-hidden="true"
                className="iconLogoGlyphMd "
                width="32"
                height="37"
                viewBox="0 0 32 37"
              >
                <path d="M26 33v-9h4v13H0V24h4v9h22Z" fill="#BCBBBB"></path>
                <path
                  d="m21.5 0-2.7 2 9.9 13.3 2.7-2L21.5 0ZM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5ZM9.1 15.2l15 7 1.4-3-15-7-1.4 3Zm14 10.79.68-2.95-16.1-3.35L7 23l16.1 2.99ZM23 30H7v-3h16v3Z"
                  fill="#F48024"
                ></path>
              </svg>
            </a>
          </div>
          <div className="sign-up-form p-4 mx-auto bg-white">
            <form className="d-flex flex-column">
              <div className="text-danger font-italic small sign-up-error">
                email/password might already exist!
              </div>
              <div className="d-flex flex-column">
                <label className="form-label my-1">Display name</label>
                <input
                  name="display-name"
                  className="form-input"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></input>
                {name.length < 1 && (
                  <div className="text-danger font-italic small">
                    Please enter name
                  </div>
                )}
              </div>
              <div className="d-flex flex-column">
                <label className="form-label my-1">Email</label>
                <input
                  name="display-name"
                  className="form-input"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>
                {!email.match(mailformat) && (
                  <div className="text-danger font-italic small">
                    Please input valid email ID
                  </div>
                )}
              </div>
              <div className="d-flex flex-column">
                <label className="form-label my-1">Password</label>
                <input
                  name="display-name"
                  className="form-input"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></input>
                {password.length < 1 && (
                  <div className="text-danger font-italic small">
                    Please enter password
                  </div>
                )}
              </div>
              <div className="d-flex flex-column mt-3">
                <button
                  className="nav-signup-btn nav-btn form-input-button"
                  onClick={(e) => {
                    e.preventDefault();
                    register();
                  }}
                  disabled={
                    !(
                      email.length > 0 &&
                      password.length > 0 &&
                      email.match(mailformat) &&
                      name.length > 0
                    )
                  }
                >
                  {showloader ? (
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : null}
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  signUp: (val) => dispatch(signup(val)),
});
export default connect(null, mapDispatchToProps)(SignUp);
