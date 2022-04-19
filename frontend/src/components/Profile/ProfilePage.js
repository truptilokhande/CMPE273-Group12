import './ProfilePage.css';

import React, {useEffect, Fragment} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import UserSection from "./UserSection/UserSectioncomponent";
import PageTitle from '../../containers/PageTitle/PageTitlecomponent.js';
import Spinner from '../../components/Spinner/Spinnercomponent.js';
import ExternalUserDetails from "./ExternalUserDetails/ExternalUserDetailscomponent.js";
import TopTags from "./UserActivity/UserActivitycomponent";
import Badge from './Badge/Badge';
import TopPosts from "./TopPosts/TopPosts.js"
const ProfilePage = () => {
  // useEffect(() => {
  //   getProfile(match.params.id);
  //   // eslint-disable-next-line
  // }, [getProfile]);


  return (
    <div>

    <div className="col-3 d-flex flex-column tag-card">
            <div className="user-content-wrapper">
              <div className="d-flex">
                <div className="users-avatar">
                  <img
                    src="https://www.gravatar.com/avatar/0555bd0deb416a320a0069abef08078a?s=96&amp;d=identicon&amp;r=PG&amp;f=1"
                    alt="user avatar"
                    width="125"
                    height="125"
                    className="rounded"
                  />
                </div>
                <div className="user-details d-flex flex-column ml-2" style={{margin:"20px",marginLeft:"20px"}}>
                  <p className="users-name">mozway</p>
                  <span className="users-location">Mare Tranquillitatis</span>
                  <div className="users-reputation">
                    <span className="reputation-score">968</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='d-flex flex-row bd-highlight'>
           <Link to='#'
             className="p-2 bd-highlight"
             data-shortcut='P'
             
           >
             Profile
         </Link>
             <Link to='#' className='p-2 bd-highlight' data-shortcut='A'>
              Activity
            </Link>
         </div>
         <div id='mainbar' className='d-flex flex-col user-main-bar pl24 pt24'>
          <div>
            <h4>Stats</h4>
            <UserSection user="ramya"/>
          </div>
          <div className='profile-all-dets'>
            <div className='about'>
            
                <h4 className='ml-10' style={{marginLeft:"40px"}}>About</h4>
                <div className='about-content'>
                  <p style={{padding:"10px"}}> Python enthusiast</p>
                  <button className='editdetbutton'>edit details</button>
                </div>

            </div>
            <div className='badges'>
              {/* //loop badges */}
              <h4 className='ml-10' style={{marginLeft:"30px"}}>Badges</h4>
               <Badge ></Badge> 
              

            </div>
            <div className='TopTags'>
              <h4 className='ml-10' style={{marginLeft:"30px"}}>Top tags</h4>
              <TopTags/>
            </div>
           <div className='Posts'>
            <div className='TopPosts'>

              <h4  style={{marginLeft:"30px",height:"30px"}}>Top Posts</h4>
              

                  <div className="d-flex flex-row flex-end filter-btn-wrapper mt-0" style={{marginLeft:"400px"}}>
                    <div className="filter-btn">All posts</div>
                    <div className="filter-btn">Questions</div>
                    <div className="filter-btn">Answers</div>
                  </div>
         
                </div>
                <TopPosts/>
             
            </div>

          </div>
        </div>
            
        </div>
  );
};
  {/* //   <Spinner type='page' width='75px' height='200px' />
  // ) : (
    // <Fragment>
    //   <PageTitle title='Ramya' />
    //   <div id='mainbar' className='user-main-bar pl24 pt24'>
    //   <UserSection user="ramya"/>
    //     <div className='user-card'>
    //       <div className='grid--cell s-navigation mb16'>
    //         <Link
    //           to='#'
    //           className='s-navigation--item is-selected'
    //           data-shortcut='P'
    //         >
    //           Profile
    //         </Link>
    //         <Link to='#' className='s-navigation--item' data-shortcut='A'>
    //           Activity
    //         </Link>
    //       </div>
           
    //     </div>
    //     <div className='row-grid'>
    //        {/* <ExternalUserDetails/> 
        
       </div>
    //   </div>
    // </Fragment> 
  );
}

 // ProfilePage.propTypes = {
//   getProfile: PropTypes.func.isRequired,
//   user: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   user: state.user,
// });  */}

export default ProfilePage;