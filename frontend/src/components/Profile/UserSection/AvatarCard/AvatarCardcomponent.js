import React from "react";
import {Link} from "react-router-dom";

import './AvatarCardstyles.css';

const AvatarCard = ({ id, gravatar, views }) => (
  <div className='img-card'>
    <div className='avatar-card'>
      <div className='avatar'>
        <Link className='avatar-link' to="/">
          <div className='logo-wrapper'>
            <img
              src={gravatar}
              alt='user-logo'
            />
          </div>
        </Link>
      </div>
      <div className='title'>
        <div className='grid fc-black-800'>
          
         
        </div>
      </div>
    </div>
  </div>
)

export default AvatarCard;