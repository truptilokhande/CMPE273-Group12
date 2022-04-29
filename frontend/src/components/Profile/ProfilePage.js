import './ProfilePage.css';

import React, {useEffect, Fragment,useState } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import goldTag from "../../assets/goldbadge.png";
import silverTag from "../../assets/silverbadge.png";
import bronzeTag from "../../assets/bronzebadge.png";
import Spinner from './Spinner/Spinnercomponent.js';

import TopPosts from "./TopPosts/TopPosts.js"
import Activities from "./Activities/Activities.js"
import BasicDetails from './BasicDetails/BasicDetails';
import axios from 'axios';
const ProfilePage = () => {
    const [receiver, setReceiverID] = useState("");
  // useEffect(() => {
  //   getProfile(match.params.id);
  //   // eslint-disable-next-line
  // }, [getProfile]);

function startnewchat() {
alert("1")
   console.log(receiver)
   axios.post('http://localhost:3001'+'/api/messages/sendMessage',{
        senderID: "1",
        receiverID:receiver,
        message:"",
        
        })
        .then(res =>{
          console.log("%%%",res)
        }).catch(err => {console.log(err)})
    

  };
  return (
    <div>
  

      <BasicDetails></BasicDetails>



       
         <div className="App">
        
        <input
          type="text" data-testid="username" 
          onChange={(event) => {
            setReceiverID(event.target.value);
          }} placeholder="receiverID"
        ></input>
        <button onClick={startnewchat}>Start Chat</button>
        </div>
            <br></br>



         <div id='mainbar' className='d-flex flex-col user-main-bar pl24 pt24'>
         <div class="grid--item" data-is-here-when="lg" id="stats">
                        <div class="fs-title mb8">Stats</div>
                        <div class="s-card fc-light bar-md">
                            <div class="d-flex flex__allitems6 gs16 fw-wrap md:jc-space-between">
                                        <div class="flex--item md:fl-auto">
            <div class="fs-body3 fc-dark">93,446</div>
            reputation
        </div>
            <div class="flex--item md:fl-auto" title="Estimated number of times people viewed helpful posts by this user
(based on page views of questions
and questions where they wrote highly-ranked answers)">
                <div class="fs-body3 fc-dark">2.4m</div>
                reached
            </div>
        <div class="flex--item md:fl-auto">
            <div class="fs-body3 fc-dark">4,042</div>
            answers
        </div>
        <div class="flex--item md:fl-auto">
            <div class="fs-body3 fc-dark">0</div>
            questions
        </div>
<div class="flex--item fl-auto m8 js-rank-container">
                <div class="fc-medium mt4 sm:mt2">
                    <svg aria-hidden="true" class="svg-icon iconAchievements" width="18" height="18" viewBox="0 0 18 18"><path d="M15 2V1H3v1H0v4c0 1.6 1.4 3 3 3v1c.4 1.5 3 2.6 5 3v2H5s-1 1.5-1 2h10c0-.4-1-2-1-2h-3v-2c2-.4 4.6-1.5 5-3V9c1.6-.2 3-1.4 3-3V2h-3ZM3 7c-.5 0-1-.5-1-1V4h1v3Zm8.4 2.5L9 8 6.6 9.4l1-2.7L5 5h3l1-2.7L10 5h2.8l-2.3 1.8 1 2.7h-.1ZM16 6c0 .5-.5 1-1 1V4h1v2Z"></path></svg>
                </div>
                <div class="s-anchors s-anchors__inherit js-rank-badge">        <a href="https://stackexchange.com/leagues/1/year/stackoverflow/2022-01-01/8690857#8690857" target="_blank" rel="noreferrer">top <b>0.01%</b> this year</a>
</div>
            </div>

                            </div>
                        </div>
                    </div>
          <div className='profile-all-dets'>
            <div className='about'>
            
                <h4 class='ml-10' style={{marginLeft:"40px"}}>About</h4>
                <div className='about-content'>
                  <p style={{padding:"25px",color:'black',fontSize:"15px"}}> Python enthusiast</p>
                  <button className='editdetbutton'>edit details</button>
                </div>

            </div>
            <div class="grid--item">
                        <div class="d-flex ai-center jc-space-between mb8">
                            <div class="flex--item fs-title">
                                Badges
                            </div>
                                <a href="/users/8690857/drew-reese?tab=badges" class="s-link s-link__muted flex--item js-gps-track" data-gps-track="profile_link.click({ target: 1, type: 2 })">View all badges</a>
                        </div>
                        
    <div class="d-flex flex__fl-equal fw-wrap gs24">
        <div class="flex--item s-card bar-md">
            <div class="d-flex fd-column jc-space-between h100 g12">
                    <div class="d-flex ai-center">
                        <div class="flex--item mr12">
                            <img src={goldTag} style={{height:"48px",width  :"48px"}}></img>
                        </div>
                        <div class="flex--item fl1">
                            <div class="fs-title fw-bold fc-black-800">
                                8
                            </div>
                            <div class="fs-caption">
                                gold badges
                            </div>
                        </div>
                    </div>
                    <div class="flex--item mt-auto">
                        <ul class="list-reset d-grid g8">
        <li class="d-flex ai-center">
            <a href="/help/badges/10969/react-router-dom?userid=8690857" title="gold badge: Earn at least 1000 total score for at least 200 non-community wiki answers in the react-router-dom tag" data-gps-track="profile_link.click({target:1, type:2 })" class="badge-tag d-flex ai-center m0 mr4 lh-md fs-fine js-gps-track"><span class="badge1"></span>&nbsp;<div class="d-inline-block truncate wmx1">react-router-dom</div></a>
            <div class="flex--item ml-auto fc-medium fs-fine ws-nowrap">Mar 17</div>
        </li>
        <li class="d-flex ai-center">
            <a href="/help/badges/9195/react-hooks?userid=8690857" title="gold badge: Earn at least 1000 total score for at least 200 non-community wiki answers in the react-hooks tag" data-gps-track="profile_link.click({target:1, type:2 })" class="badge-tag d-flex ai-center m0 mr4 lh-md fs-fine js-gps-track"><span class="badge1"></span>&nbsp;<div class="d-inline-block truncate wmx1">react-hooks</div></a>
            <div class="flex--item ml-auto fc-medium fs-fine ws-nowrap">Feb 24</div>
        </li>
        <li class="d-flex ai-center">
            <a href="/help/badges/5357/reactjs?userid=8690857" title="gold badge: Earn at least 1000 total score for at least 200 non-community wiki answers in the reactjs tag" data-gps-track="profile_link.click({target:1, type:2 })" class="badge-tag d-flex ai-center m0 mr4 lh-md fs-fine js-gps-track"><span class="badge1"></span>&nbsp;<div class="d-inline-block truncate wmx1">reactjs</div></a>
            <div class="flex--item ml-auto fc-medium fs-fine ws-nowrap">Oct 20, 2020</div>
        </li>
                        </ul>
                    </div>
            </div>
        </div>
        <div class="flex--item s-card bar-md">
            <div class="d-flex fd-column jc-space-between h100 g12">
                    <div class="d-flex ai-center">
                        <div class="flex--item mr12">
                        <img src={silverTag} style={{height:"48px",width:"48px"}}></img>
                        </div>
                        <div class="flex--item fl1">
                            <div class="fs-title fw-bold fc-black-800">
                                61
                            </div>
                            <div class="fs-caption">
                                silver badges
                            </div>
                        </div>
                    </div>
                    <div class="flex--item mt-auto">
                        <ul class="list-reset d-grid g8">
        <li class="d-flex ai-center">
            <a href="/help/badges/7226/react-router?userid=8690857" title="silver badge: Earn at least 400 total score for at least 80 non-community wiki answers in the react-router tag" data-gps-track="profile_link.click({target:1, type:2 })" class="badge-tag d-flex ai-center m0 mr4 lh-md fs-fine js-gps-track"><span class="badge2"></span>&nbsp;<div class="d-inline-block truncate wmx1">react-router</div></a>
            <div class="flex--item ml-auto fc-medium fs-fine ws-nowrap">Dec 22</div>
        </li>
        <li class="d-flex ai-center">
            <a href="/help/badges/145/epic?userid=8690857" title="silver badge: Earn 200 daily reputation 50 times" data-gps-track="profile_link.click({target:1, type:2 })" class="badge d-flex ai-center m0 mr4 lh-md fs-fine js-gps-track"><span class="badge2"></span>&nbsp;<div class="d-inline-block truncate wmx1">Epic</div></a>
            <div class="flex--item ml-auto fc-medium fs-fine ws-nowrap">Jul 21</div>
        </li>
        <li class="d-flex ai-center">
            <a href="/help/badges/59/javascript?userid=8690857" title="silver badge: Earn at least 400 total score for at least 80 non-community wiki answers in the javascript tag" data-gps-track="profile_link.click({target:1, type:2 })" class="badge-tag d-flex ai-center m0 mr4 lh-md fs-fine js-gps-track"><span class="badge2"></span>&nbsp;<div class="d-inline-block truncate wmx1">javascript</div></a>
            <div class="flex--item ml-auto fc-medium fs-fine ws-nowrap">Jul 26, 2020</div>
        </li>
                        </ul>
                    </div>
            </div>
        </div>
        <div class="flex--item s-card bar-md">
            <div class="d-flex fd-column jc-space-between h100 g12">
                    <div class="d-flex ai-center">
                        <div class="flex--item mr12">
                        <img src={bronzeTag} style={{height:"48px",width:"48px"}}></img>
                        </div>
                        <div class="flex--item fl1">
                            <div class="fs-title fw-bold fc-black-800">
                                85
                            </div>
                            <div class="fs-caption">
                                bronze badges
                            </div>
                        </div>
                    </div>
                    <div class="flex--item mt-auto">
                        <ul class="list-reset d-grid g8">
        <li class="d-flex ai-center">
            <a href="/help/badges/10564/use-state?userid=8690857" title="bronze badge: Earn at least 100 total score for at least 20 non-community wiki answers in the use-state tag" data-gps-track="profile_link.click({target:1, type:2 })" class="badge-tag d-flex ai-center m0 mr4 lh-md fs-fine js-gps-track"><span class="badge3"></span>&nbsp;<div class="d-inline-block truncate wmx1">use-state</div></a>
            <div class="flex--item ml-auto fc-medium fs-fine ws-nowrap">Jul 22</div>
        </li>
        <li class="d-flex ai-center">
            <a href="/help/badges/10581/use-effect?userid=8690857" title="bronze badge: Earn at least 100 total score for at least 20 non-community wiki answers in the use-effect tag" data-gps-track="profile_link.click({target:1, type:2 })" class="badge-tag d-flex ai-center m0 mr4 lh-md fs-fine js-gps-track"><span class="badge3"></span>&nbsp;<div class="d-inline-block truncate wmx1">use-effect</div></a>
            <div class="flex--item ml-auto fc-medium fs-fine ws-nowrap">Jul 26</div>
        </li>
        <li class="d-flex ai-center">
            <a href="/help/badges/6568/react-redux?userid=8690857" title="bronze badge: Earn at least 100 total score for at least 20 non-community wiki answers in the react-redux tag" data-gps-track="profile_link.click({target:1, type:2 })" class="badge-tag d-flex ai-center m0 mr4 lh-md fs-fine js-gps-track"><span class="badge3"></span>&nbsp;<div class="d-inline-block truncate wmx1">react-redux</div></a>
            <div class="flex--item ml-auto fc-medium fs-fine ws-nowrap">Feb 8, 2021</div>
        </li>
                        </ul>
                    </div>
            </div>
        </div>
    </div>

                    </div>
                    <div id="top-tags" class="top-tags grid--item">
    <div class="d-flex ai-center jc-space-between mb8">
        <div class="flex--item fs-title">
            Top tags
        </div>

            <a href="/users/8690857/drew-reese?tab=tags" class="s-link s-link__muted js-gps-track" data-gps-track="profile_link.click({target:2, type:2 })">
                View all tags
            </a>
    </div>

        <div class="s-card bar-md p0">
                <div class="p12 bb bc-black-075" title=" Gave 3859 non-wiki answers with a total score of 4974.">
                    <div class="d-flex ai-center gs12 fw-wrap">
                        <div class="flex--item ws-nowrap">
                            <a href="/search?q=user:8690857+[reactjs]" class="s-tag js-gps-track" title="show questions tagged 'reactjs'" rel="tag" data-gps-track="profile_link.click({target:2, type:2 })">reactjs</a>
        <a href="/help/badges/5357/reactjs" class="badge-tag bg-transparent bc-transparent m0" title="Gold badge"><span class="badge1"></span></a>
                        </div>
                        <div class="flex--item ml-auto"> 
                            <div class="d-flex gsx gs16">
                                <div class="flex--item d-flex ai-center">
                                    <div class="fs-body3 mr4">4,974</div>
                                    <div class="fc-light tt-lowercase">Score</div>
                                </div>
                                <div class="flex--item d-flex ai-center">
                                    <div class="fs-body3 mr4">3,859</div>
                                    <div class="fc-light tt-lowercase">Posts</div>
                                </div>
                                <div class="flex--item d-flex ai-center">
                                    <div class="fs-body3 mr4">95</div>
                                    <div class="fc-light tt-lowercase">Posts %</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p12 bb bc-black-075" title=" Gave 1884 non-wiki answers with a total score of 2404.">
                    <div class="d-flex ai-center gs12 fw-wrap">
                        <div class="flex--item ws-nowrap">
                            <a href="/search?q=user:8690857+[javascript]" class="s-tag js-gps-track" title="show questions tagged 'javascript'" rel="tag" data-gps-track="profile_link.click({target:2, type:2 })">javascript</a>
        <a href="/help/badges/78/javascript" class="badge-tag bg-transparent bc-transparent m0" title="Gold badge"><span class="badge1"></span></a>
                        </div>
                        <div class="flex--item ml-auto"> 
                            <div class="d-flex gsx gs16">
                                <div class="flex--item d-flex ai-center">
                                    <div class="fs-body3 mr4">2,404</div>
                                    <div class="fc-light tt-lowercase">Score</div>
                                </div>
                                <div class="flex--item d-flex ai-center">
                                    <div class="fs-body3 mr4">1,884</div>
                                    <div class="fc-light tt-lowercase">Posts</div>
                                </div>
                                <div class="flex--item d-flex ai-center">
                                    <div class="fs-body3 mr4">47</div>
                                    <div class="fc-light tt-lowercase">Posts %</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p12 bb bc-black-075" title=" Gave 881 non-wiki answers with a total score of 1158.">
                    <div class="d-flex ai-center gs12 fw-wrap">
                        <div class="flex--item ws-nowrap">
                            <a href="/search?q=user:8690857+[react-hooks]" class="s-tag js-gps-track" title="show questions tagged 'react-hooks'" rel="tag" data-gps-track="profile_link.click({target:2, type:2 })">react-hooks</a>
        <a href="/help/badges/9195/react-hooks" class="badge-tag bg-transparent bc-transparent m0" title="Gold badge"><span class="badge1"></span></a>
                        </div>
                        <div class="flex--item ml-auto"> 
                            <div class="d-flex gsx gs16">
                                <div class="flex--item d-flex ai-center">
                                    <div class="fs-body3 mr4">1,158</div>
                                    <div class="fc-light tt-lowercase">Score</div>
                                </div>
                                <div class="flex--item d-flex ai-center">
                                    <div class="fs-body3 mr4">881</div>
                                    <div class="fc-light tt-lowercase">Posts</div>
                                </div>
                                <div class="flex--item d-flex ai-center">
                                    <div class="fs-body3 mr4">22</div>
                                    <div class="fc-light tt-lowercase">Posts %</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p12 bb bc-black-075" title=" Gave 715 non-wiki answers with a total score of 1136.">
                    <div class="d-flex ai-center gs12 fw-wrap">
                        <div class="flex--item ws-nowrap">
                            <a href="/search?q=user:8690857+[react-router-dom]" class="s-tag js-gps-track" title="show questions tagged 'react-router-dom'" rel="tag" data-gps-track="profile_link.click({target:2, type:2 })">react-router-dom</a>
        <a href="/help/badges/10969/react-router-dom" class="badge-tag bg-transparent bc-transparent m0" title="Gold badge"><span class="badge1"></span></a>
                        </div>
                        <div class="flex--item ml-auto"> 
                            <div class="d-flex gsx gs16">
                                <div class="flex--item d-flex ai-center">
                                    <div class="fs-body3 mr4">1,136</div>
                                    <div class="fc-light tt-lowercase">Score</div>
                                </div>
                                <div class="flex--item d-flex ai-center">
                                    <div class="fs-body3 mr4">715</div>
                                    <div class="fc-light tt-lowercase">Posts</div>
                                </div>
                                <div class="flex--item d-flex ai-center">
                                    <div class="fs-body3 mr4">18</div>
                                    <div class="fc-light tt-lowercase">Posts %</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p12 bb bc-black-075" title=" Gave 645 non-wiki answers with a total score of 902.">
                    <div class="d-flex ai-center gs12 fw-wrap">
                        <div class="flex--item ws-nowrap">
                            <a href="/search?q=user:8690857+[react-router]" class="s-tag js-gps-track" title="show questions tagged 'react-router'" rel="tag" data-gps-track="profile_link.click({target:2, type:2 })">react-router</a>
        <a href="/help/badges/7226/react-router" class="badge-tag bg-transparent bc-transparent m0" title="Silver badge"><span class="badge2"></span></a>
                        </div>
                        <div class="flex--item ml-auto"> 
                            <div class="d-flex gsx gs16">
                                <div class="flex--item d-flex ai-center">
                                    <div class="fs-body3 mr4">902</div>
                                    <div class="fc-light tt-lowercase">Score</div>
                                </div>
                                <div class="flex--item d-flex ai-center">
                                    <div class="fs-body3 mr4">645</div>
                                    <div class="fc-light tt-lowercase">Posts</div>
                                </div>
                                <div class="flex--item d-flex ai-center">
                                    <div class="fs-body3 mr4">16</div>
                                    <div class="fc-light tt-lowercase">Posts %</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p12" title=" Gave 252 non-wiki answers with a total score of 345.">
                    <div class="d-flex ai-center gs12 fw-wrap">
                        <div class="flex--item ws-nowrap">
                            <a href="/search?q=user:8690857+[react-native]" class="s-tag js-gps-track" title="show questions tagged 'react-native'" rel="tag" data-gps-track="profile_link.click({target:2, type:2 })">react-native</a>
        <a href="/help/badges/5182/react-native" class="badge-tag bg-transparent bc-transparent m0" title="Bronze badge"><span class="badge3"></span></a>
                        </div>
                        <div class="flex--item ml-auto"> 
                            <div class="d-flex gsx gs16">
                                <div class="flex--item d-flex ai-center">
                                    <div class="fs-body3 mr4">345</div>
                                    <div class="fc-light tt-lowercase">Score</div>
                                </div>
                                <div class="flex--item d-flex ai-center">
                                    <div class="fs-body3 mr4">252</div>
                                    <div class="fc-light tt-lowercase">Posts</div>
                                </div>
                                <div class="flex--item d-flex ai-center">
                                    <div class="fs-body3 mr4">6</div>
                                    <div class="fc-light tt-lowercase">Posts %</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
</div>



           <div className='Posts'>
            <div className='TopPosts'>

              <h4  style={{marginLeft:"30px",height:"30px",marginTop:"10px"}}>Top Posts</h4>
              

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