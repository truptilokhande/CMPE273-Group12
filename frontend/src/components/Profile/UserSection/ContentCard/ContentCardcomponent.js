import React from "react";
import moment from "moment";

import './ContentCardstyles.css';

const ContentCard = ({ username, answers_count, posts_count, comments_count, tags_count, created_at }) => (
  <div className='content-card'>
    <div className='content-grid'>
      <div className='info-cell'>
        <div className='info'>
          <div className='details'>
              6,123
              <br></br>
              <p style={{color:"hsl(210, 8%, 45%)"}}>reputation</p>
             
          </div>
          <div className="reach">
          191k
          <br></br>
          <p style={{color:"hsl(210, 8%, 45%)"}}>Reached</p>
          </div>
          </div>
          <div className='info'>
        <div className="details">
        <span style={{marginLeft:"7px"}}>23</span>
  
          <p style={{color:"hsl(210, 8%, 45%)",marginLeft:"7px"}}>answers</p>
        </div>
        <div className="reach">
          3
          <br></br>
          <p style={{color:"hsl(210, 8%, 45%)"}}>questions</p>
          </div>
          
         </div>
       
      </div>
       
      
      
    </div>
  </div>
)

export default ContentCard;