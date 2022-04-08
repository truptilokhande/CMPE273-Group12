import React from "react";
import "./SignUp.css";

function SignUp() {
  return (
    <>
      <div className="sign-up-wrapper">
        <div className="sign-up d-flex flex-column justify-content-center m-4">
          <div class="text-center mb-4">
            <a href="https://stackoverflow.com">
              <svg
                aria-hidden="true"
                class="iconLogoGlyphMd "
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
              <div className="d-flex flex-column">
                <label className="form-label my-1">Display name</label>
                <input name="display-name" className="form-input"></input>
              </div>
              <div className="d-flex flex-column">
                <label className="form-label my-1">Email</label>
                <input name="display-name" className="form-input"></input>
              </div>
              <div className="d-flex flex-column">
                <label className="form-label my-1">Password</label>
                <input
                  name="display-name"
                  className="form-input"
                  type="password"
                ></input>
              </div>
              <div className="d-flex flex-column mt-3">
                <button className="nav-signup-btn nav-btn form-input-button">
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

export default SignUp;
