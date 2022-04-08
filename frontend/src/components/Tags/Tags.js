import React from "react";
import "./Tags.css";

function Tags() {
  return (
    <>
      <div className="d-flex">
        <h1 className="fs-headline1">Tags</h1>
      </div>
      <p className="heading-body">
        A tag is a keyword or label that categorizes your question with other,
        similar questions. Using the right tags makes it easier for others to
        find and answer your question.
      </p>
      <div className="d-flex align-items-end justify-content-between mb-3">
        <input
          className="tags-search-input"
          autocomplete="off"
          name="tagfilter"
          type="text"
          maxlength="35"
          placeholder="Filter by tag name"
        />
        {/* <svg
          aria-hidden="true"
          className="search-icon"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0Z"></path>
        </svg> */}

        <div className="d-flex flex-row filter-btn-wrapper mt-3">
          <div className="filter-btn">Popular</div>
          <div className="filter-btn">Name</div>
          <div className="filter-btn fliter-btn-last">New</div>
        </div>
      </div>

      <div className="tags">
        <div className="tags-wrapper row no-gutters">
          {/* start iterating tags  */}

          <div className="col-3 d-flex flex-column tag-card">
            <div className="tag-content-wrapper">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="">
                  <a href="/tagOverview" className="tag">
                    javascript
                  </a>
                </div>
              </div>

              <div className="mb-3 tag-content">
                For questions regarding programming in ECMAScript
                (JavaScript/JS) and its various dialects/implementations
                (excluding ActionScript). Note JavaScript is NOT the same as
                Java! Please include all relevan…
              </div>

              <div className="d-flex justify-content-between tag-meta-data">
                <div>2356572 questions</div>
                <div>
                  {" "}
                  <span>759 asked today</span>, <span>4450 this week</span>{" "}
                </div>
              </div>
            </div>
          </div>

          <div className="col-3 d-flex flex-column tag-card">
            <div className="tag-content-wrapper">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="">
                  <a href="/" className="tag">
                    javascript
                  </a>
                </div>
              </div>

              <div className="mb-3 tag-content">
                For questions regarding programming in ECMAScript
                (JavaScript/JS) and its various dialects/implementations
                (excluding ActionScript). Note JavaScript is NOT the same as
                Java! Please include all relevan…
              </div>

              <div className="d-flex justify-content-between tag-meta-data">
                <div>2356572 questions</div>
                <div>
                  {" "}
                  <span>759 asked today</span>, <span>4450 this week</span>{" "}
                </div>
              </div>
            </div>
          </div>

          <div className="col-3 d-flex flex-column tag-card">
            <div className="tag-content-wrapper">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="">
                  <a href="/" className="tag">
                    javascript
                  </a>
                </div>
              </div>

              <div className="mb-3 tag-content">
                For questions regarding programming in ECMAScript
                (JavaScript/JS) and its various dialects/implementations
                (excluding ActionScript). Note JavaScript is NOT the same as
                Java! Please include all relevan…
              </div>

              <div className="d-flex justify-content-between tag-meta-data">
                <div>2356572 questions</div>
                <div>
                  {" "}
                  <span>759 asked today</span>, <span>4450 this week</span>{" "}
                </div>
              </div>
            </div>
          </div>

          <div className="col-3 d-flex flex-column tag-card">
            <div className="tag-content-wrapper">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="">
                  <a href="/" className="tag">
                    javascript
                  </a>
                </div>
              </div>

              <div className="mb-3 tag-content">
                For questions regarding programming in ECMAScript
                (JavaScript/JS) and its various dialects/implementations
                (excluding ActionScript). Note JavaScript is NOT the same as
                Java! Please include all relevan…
              </div>

              <div className="d-flex justify-content-between tag-meta-data">
                <div>2356572 questions</div>
                <div>
                  {" "}
                  <span>759 asked today</span>, <span>4450 this week</span>{" "}
                </div>
              </div>
            </div>
          </div>

          <div className="col-3 d-flex flex-column tag-card">
            <div className="tag-content-wrapper">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="">
                  <a href="/" className="tag">
                    javascript
                  </a>
                </div>
              </div>

              <div className="mb-3 tag-content">
                For questions regarding programming in ECMAScript
                (JavaScript/JS) and its various dialects/implementations
                (excluding ActionScript). Note JavaScript is NOT the same as
                Java! Please include all relevan…
              </div>

              <div className="d-flex justify-content-between tag-meta-data">
                <div>2356572 questions</div>
                <div>
                  {" "}
                  <span>759 asked today</span>, <span>4450 this week</span>{" "}
                </div>
              </div>
            </div>
          </div>
          {/* tags iteration end */}
        </div>
      </div>
    </>
  );
}

export default Tags;
