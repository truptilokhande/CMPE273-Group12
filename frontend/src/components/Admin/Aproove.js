import React from 'react'
import "./Aproove.css"

function Aproove() {
  return (
    <div>
        <div className="question-content">
            <h3 className="question-content-title">
              <a href="/" className="question-link">
                What are the differences among below topics?
              </a>
              <button className='accept'>Accept</button>
              <button className='reject'>Reject</button>
            </h3>
            <p className="tag" style={{float:"right",marginTop:"40px"}}>waiting for approval</p>
            <div className="question-content-summary">
              Static code analysis, dynamic code analysis, static testing,
              dynamic testing, Dynamic security testing (DAST), Static security
              testing (SAST), debugging, static binary testing, and dynamic
              binary ...
            </div>
            <div className="question-content-meta-data d-flex align-item-center justify-content-between flex-wrap">
              <div className="question-tags d-flex flex-wrap">
                 {/* tags iteration start */}
                <a href="/" className="tag">
                  debugging
                </a>{" "}
                <a href="/" className="tag">
                  code-analysis
                </a>{" "}
                {/* tags iteration stop */}
              </div>
    </div>
    </div>
    </div>
  )
}

export default Aproove