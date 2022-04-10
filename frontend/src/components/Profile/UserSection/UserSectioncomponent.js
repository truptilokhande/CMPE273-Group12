import React from "react";

import AvatarCard from "./AvatarCard/AvatarCardcomponent";
import ContentCard from "./ContentCard/ContentCardcomponent";

import './UserSectionstyles.css';

const UserSection = ( user ) => (
  <div>
  {/* <div className='grid'>
    <AvatarCard
      id="1234"
      gravatar="https://www.gravatar.com/avatar/0555bd0deb416a320a0069abef08078a?s=96&amp;d=identicon&amp;r=PG&amp;f=1"
      views="yz"
    />

  </div> */}
  <div>
    <ContentCard
      username="abc"
      answers_count="2"
      posts_count="4"
      comments_count="6"
      tags_count="8"
      created_at="{user.created_at}"
    />
  </div>
  </div>
)

export default UserSection;