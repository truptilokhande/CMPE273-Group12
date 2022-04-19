import './ProfilePage.css';

import React, {useEffect, Fragment} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import Spinner from './Spinner/Spinnercomponent.js';


import TopPosts from "./TopPosts/TopPosts.js"
import Activities from "./Activities/Activities.js"
import BasicDetails from './BasicDetails/BasicDetails';
const ProfilePage = () => {
  // useEffect(() => {
  //   getProfile(match.params.id);
  //   // eslint-disable-next-line
  // }, [getProfile]);


  return (
    <div>

      <BasicDetails></BasicDetails>
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
                <div class="s-anchors s-anchors__inherit js-rank-badge">        <a href="https://stackexchange.com/leagues/1/year/stackoverflow/2022-01-01/8690857#8690857" target="_blank">top <b>0.01%</b> this year</a>
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
                            <svg aria-hidden="true" class="fc-gold svg-spot spotAward" width="48" height="48" viewBox="0 0 48 48"><path d="M32.87 7a8.85 8.85 0 0 0-2.49-2.79 10.5 10.5 0 0 0-1.41-.92.98.98 0 0 0-.74-.1c-.46.14-.6.62-.71 1.04-.09.31-.2.75-.26 1.27-.12 1-.1 2.4.68 3.58v.01c.83 1.24 1.83 2 2.62 2.46.43.25.88.45 1.3.7a16.38 16.38 0 0 1 8.4 14.34c0 8-5.72 14.66-13.34 16.15a.85.85 0 0 0 .33 1.67c.99-.2 1.95-.47 2.88-.82.23.18.7.55 1.32.94a8.46 8.46 0 0 0 3.38 1.29 5.96 5.96 0 0 0 3.26-.61c.5-.24 1.22-.6 1.43-1.15a.86.86 0 0 0-.04-.72c-.29-.53-.92-1-1.38-1.37a6.88 6.88 0 0 0-2.76-1.39c.49-.4.95-.82 1.39-1.26.56.14 1.12.24 1.7.31 1.03.13 2.43.19 3.67-.2a5.68 5.68 0 0 0 3.32-2.78c.12-.24.22-.53.18-.8a.86.86 0 0 0-.47-.63 9.14 9.14 0 0 0-1.64-.62 6.5 6.5 0 0 0-3.36-.08 18 18 0 0 0 .85-2.04c.4 0 .81-.03 1.21-.1a5.89 5.89 0 0 0 3.14-1.46 7.74 7.74 0 0 0 1.85-3.06c.17-.47.27-.9.33-1.2.07-.32.13-.68-.05-.99-.25-.44-.77-.44-1.22-.42a9.1 9.1 0 0 0-1.24.12c-.9.16-2.06.5-3.04 1.27v-.05c0-.73-.04-1.45-.13-2.15.25-.12.6-.31 1-.59a6.15 6.15 0 0 0 2.11-2.52 8.3 8.3 0 0 0 .57-3.58 9.7 9.7 0 0 0-.14-1.28c-.06-.33-.13-.69-.4-.92a.86.86 0 0 0-.5-.2c-.3-.02-.6.15-.85.28a9.3 9.3 0 0 0-1.08.63 6.63 6.63 0 0 0-2.3 2.58 18 18 0 0 0-1.26-2.24 5.46 5.46 0 0 0 1.82-3.63 8.85 8.85 0 0 0-.65-3.65c-.19-.5-.38-.9-.53-1.2-.21-.4-.47-.85-1-.85a.98.98 0 0 0-.64.3c-.2.18-.65.6-1.11 1.19a6.34 6.34 0 0 0-1.4 3.91c-.72-.6-1.47-1.13-2.27-1.62A5.47 5.47 0 0 0 32.88 7h-.01Zm-3.86-1.7a7.29 7.29 0 0 1 2.35 2.46 4 4 0 0 1 .29 2.44 5.96 5.96 0 0 1-2.29-2.06c-.54-.83-.53-1.9-.35-2.84Zm12.55 25.44c.17-.96.56-1.94 1.28-2.63A5.1 5.1 0 0 1 45.68 27a6.1 6.1 0 0 1-1.53 2.7c-.7.66-1.65.97-2.6 1.06Zm-3.37 7.13a4.55 4.55 0 0 1 2.18-1.66 5 5 0 0 1 3.2.19 4.02 4.02 0 0 1-1.97 1.4 7.6 7.6 0 0 1-3.4.07ZM32 42.86a4.57 4.57 0 0 1 2.66-.67c.89.1 1.73.58 2.38 1.1l.4.34a4.54 4.54 0 0 1-2.42.5A6.93 6.93 0 0 1 32 42.86Zm6.41-33.3a7.2 7.2 0 0 1 .7 3.29 3.68 3.68 0 0 1-1.07 2.3 4.88 4.88 0 0 1-.87-2.93c.07-1 .6-1.91 1.24-2.67Zm5.38 7.92a6.57 6.57 0 0 1-.4 3.16 4.55 4.55 0 0 1-1.73 1.95 4.4 4.4 0 0 1 .06-2.91c.4-.95 1.2-1.67 2.07-2.2Zm-19.95.55L22 23.38a1 1 0 0 1-.94.67h-5.71v.02l4.6 3.48a1 1 0 0 1 .34 1.1l-1.66 5.2 4.7-3.25a1 1 0 0 1 1.13 0l4.6 3.17-1.65-5.2a1 1 0 0 1 .35-1.1l4.52-3.42h-5.64a1 1 0 0 1-.94-.67l-1.85-5.35Zm-.03-2.1a2 2 0 0 1 1.88 1.32l1.66 4.8h5.04c1.81 0 2.62 2.28 1.26 3.46l-.06.05-4.07 3.07 1.5 4.72v.01c.56 1.83-1.48 3.13-2.96 2.15l-.02-.01-4.15-2.86-4.25 2.94-.01.01c-1.49.99-3.53-.31-2.97-2.14v-.02l1.5-4.71-4.07-3.08a1.98 1.98 0 0 1-.67-2.18c.22-.71.87-1.41 1.87-1.41h5.05l1.65-4.78a1.88 1.88 0 0 1 1.82-1.33Zm-9.58 20.71a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-1.53-1.9a.83.83 0 1 1-1.64 0 .83.83 0 0 1 1.65 0Zm-1.2-2.11a.83.83 0 1 1-1.66 0 .83.83 0 0 1 1.65 0Zm-.83-2.36a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-.42-2.44a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm0-2.41a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm.41-2.44a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm.83-2.25a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm1.15-2.23a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm1.59-1.88a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0ZM16.02 15a.83.83 0 1 1-1.65.01.83.83 0 0 1 1.65 0Zm2.08-1.28a.83.83 0 1 1-1.64 0 .83.83 0 0 1 1.65 0Zm2.3-.94a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm2.38-.51a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm2.42-.11a.83.83 0 1 1-1.64 0 .83.83 0 0 1 1.65 0Zm2.48.29a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm2.33.71a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm2.22 1.14a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm1.92 1.41a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm1.75 1.75a.83.83 0 1 1-1.66 0 .83.83 0 0 1 1.65 0Zm1.37 2a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm1.03 2.26a.83.83 0 1 1-1.64 0 .83.83 0 0 1 1.65 0Zm.6 2.34a.83.83 0 1 1-1.66 0 .83.83 0 0 1 1.65 0Zm.22 2.48a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-.18 2.51a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-.62 2.35a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-1.04 2.2a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-1.35 2.09a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-1.73 1.78a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-1.98 1.43a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-2.19 1.09a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-2.28.75a.82.82 0 1 1-1.65 0 .82.82 0 0 1 1.65 0Zm-2.43.31a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-2.48-.12a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-2.43-.44a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-2.25-.99a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-2.26-1.16a.83.83 0 1 1-1.64 0 .83.83 0 0 1 1.65 0ZM14.94 7a8.85 8.85 0 0 1 2.49-2.79 10.5 10.5 0 0 1 1.41-.92c.23-.12.5-.18.74-.1.46.14.6.62.71 1.04.1.31.2.75.26 1.27.12 1 .1 2.4-.68 3.58v.01a7.82 7.82 0 0 1-2.62 2.46c-.43.25-.88.45-1.3.7a16.38 16.38 0 0 0-8.4 14.34c0 8 5.73 14.66 13.34 16.15a.85.85 0 0 1-.33 1.67c-.99-.2-1.95-.47-2.88-.82-.23.18-.7.55-1.32.94a8.46 8.46 0 0 1-3.38 1.29 5.96 5.96 0 0 1-3.26-.61c-.5-.24-1.22-.6-1.43-1.15a.86.86 0 0 1 .04-.72c.29-.53.92-1 1.38-1.37a6.88 6.88 0 0 1 2.76-1.39c-.49-.4-.95-.82-1.39-1.26-.56.14-1.12.24-1.7.31a9.12 9.12 0 0 1-3.67-.2 5.68 5.68 0 0 1-3.32-2.78 1.35 1.35 0 0 1-.18-.8c.02-.1.1-.45.47-.63a9.13 9.13 0 0 1 1.64-.62 6.5 6.5 0 0 1 3.36-.08c-.32-.66-.6-1.34-.85-2.04-.4 0-.81-.03-1.21-.1a5.89 5.89 0 0 1-3.13-1.46 7.74 7.74 0 0 1-1.86-3.06 9.2 9.2 0 0 1-.33-1.2c-.07-.32-.13-.68.05-.99.25-.44.77-.44 1.22-.42.31 0 .75.04 1.24.12.9.16 2.06.5 3.04 1.27v-.05c0-.73.04-1.45.13-2.15-.25-.12-.6-.31-1-.59a6.15 6.15 0 0 1-2.11-2.52 8.22 8.22 0 0 1-.57-3.58c.03-.5.08-.95.14-1.28.06-.33.13-.69.4-.92a.86.86 0 0 1 .5-.2c.3-.02.6.15.85.28.28.14.67.35 1.08.63a6.63 6.63 0 0 1 2.3 2.58 18 18 0 0 1 1.26-2.24 5.46 5.46 0 0 1-1.82-3.63c-.1-1.34.28-2.69.65-3.65.19-.5.38-.9.53-1.2.21-.4.47-.85 1-.85.25 0 .45.13.64.3.2.18.65.6 1.11 1.19a6.34 6.34 0 0 1 1.4 3.91c.72-.6 1.47-1.13 2.27-1.62A5.47 5.47 0 0 1 14.93 7h.01Zm3.86-1.7a7.29 7.29 0 0 0-2.35 2.46 4.04 4.04 0 0 0-.29 2.44 5.96 5.96 0 0 0 2.29-2.06c.54-.83.53-1.9.35-2.84ZM6.25 30.75a4.77 4.77 0 0 0-1.28-2.63A5.1 5.1 0 0 0 2.13 27c.3.99.77 1.98 1.53 2.7.7.66 1.65.97 2.6 1.06Zm3.37 7.13a4.55 4.55 0 0 0-2.18-1.66 5 5 0 0 0-3.2.19 4.1 4.1 0 0 0 1.97 1.4c1.09.34 2.3.25 3.4.07Zm6.19 4.98a4.57 4.57 0 0 0-2.66-.67c-.89.1-1.73.58-2.38 1.1l-.4.34a4.54 4.54 0 0 0 2.42.5 6.93 6.93 0 0 0 3.02-1.27ZM9.4 9.56a7.26 7.26 0 0 0-.7 3.29 3.68 3.68 0 0 0 1.07 2.3c.55-.87.94-1.89.87-2.93A4.8 4.8 0 0 0 9.4 9.55Zm-5.38 7.92a6.57 6.57 0 0 0 .4 3.16 4.55 4.55 0 0 0 1.73 1.95c.26-.94.34-2-.06-2.91a4.99 4.99 0 0 0-2.07-2.2Z"></path></svg>
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
                            <svg aria-hidden="true" class="fc-silver svg-spot spotAward" width="48" height="48" viewBox="0 0 48 48"><path d="M32.87 7a8.85 8.85 0 0 0-2.49-2.79 10.5 10.5 0 0 0-1.41-.92.98.98 0 0 0-.74-.1c-.46.14-.6.62-.71 1.04-.09.31-.2.75-.26 1.27-.12 1-.1 2.4.68 3.58v.01c.83 1.24 1.83 2 2.62 2.46.43.25.88.45 1.3.7a16.38 16.38 0 0 1 8.4 14.34c0 8-5.72 14.66-13.34 16.15a.85.85 0 0 0 .33 1.67c.99-.2 1.95-.47 2.88-.82.23.18.7.55 1.32.94a8.46 8.46 0 0 0 3.38 1.29 5.96 5.96 0 0 0 3.26-.61c.5-.24 1.22-.6 1.43-1.15a.86.86 0 0 0-.04-.72c-.29-.53-.92-1-1.38-1.37a6.88 6.88 0 0 0-2.76-1.39c.49-.4.95-.82 1.39-1.26.56.14 1.12.24 1.7.31 1.03.13 2.43.19 3.67-.2a5.68 5.68 0 0 0 3.32-2.78c.12-.24.22-.53.18-.8a.86.86 0 0 0-.47-.63 9.14 9.14 0 0 0-1.64-.62 6.5 6.5 0 0 0-3.36-.08 18 18 0 0 0 .85-2.04c.4 0 .81-.03 1.21-.1a5.89 5.89 0 0 0 3.14-1.46 7.74 7.74 0 0 0 1.85-3.06c.17-.47.27-.9.33-1.2.07-.32.13-.68-.05-.99-.25-.44-.77-.44-1.22-.42a9.1 9.1 0 0 0-1.24.12c-.9.16-2.06.5-3.04 1.27v-.05c0-.73-.04-1.45-.13-2.15.25-.12.6-.31 1-.59a6.15 6.15 0 0 0 2.11-2.52 8.3 8.3 0 0 0 .57-3.58 9.7 9.7 0 0 0-.14-1.28c-.06-.33-.13-.69-.4-.92a.86.86 0 0 0-.5-.2c-.3-.02-.6.15-.85.28a9.3 9.3 0 0 0-1.08.63 6.63 6.63 0 0 0-2.3 2.58 18 18 0 0 0-1.26-2.24 5.46 5.46 0 0 0 1.82-3.63 8.85 8.85 0 0 0-.65-3.65c-.19-.5-.38-.9-.53-1.2-.21-.4-.47-.85-1-.85a.98.98 0 0 0-.64.3c-.2.18-.65.6-1.11 1.19a6.34 6.34 0 0 0-1.4 3.91c-.72-.6-1.47-1.13-2.27-1.62A5.47 5.47 0 0 0 32.88 7h-.01Zm-3.86-1.7a7.29 7.29 0 0 1 2.35 2.46 4 4 0 0 1 .29 2.44 5.96 5.96 0 0 1-2.29-2.06c-.54-.83-.53-1.9-.35-2.84Zm12.55 25.44c.17-.96.56-1.94 1.28-2.63A5.1 5.1 0 0 1 45.68 27a6.1 6.1 0 0 1-1.53 2.7c-.7.66-1.65.97-2.6 1.06Zm-3.37 7.13a4.55 4.55 0 0 1 2.18-1.66 5 5 0 0 1 3.2.19 4.02 4.02 0 0 1-1.97 1.4 7.6 7.6 0 0 1-3.4.07ZM32 42.86a4.57 4.57 0 0 1 2.66-.67c.89.1 1.73.58 2.38 1.1l.4.34a4.54 4.54 0 0 1-2.42.5A6.93 6.93 0 0 1 32 42.86Zm6.41-33.3a7.2 7.2 0 0 1 .7 3.29 3.68 3.68 0 0 1-1.07 2.3 4.88 4.88 0 0 1-.87-2.93c.07-1 .6-1.91 1.24-2.67Zm5.38 7.92a6.57 6.57 0 0 1-.4 3.16 4.55 4.55 0 0 1-1.73 1.95 4.4 4.4 0 0 1 .06-2.91c.4-.95 1.2-1.67 2.07-2.2Zm-19.95.55L22 23.38a1 1 0 0 1-.94.67h-5.71v.02l4.6 3.48a1 1 0 0 1 .34 1.1l-1.66 5.2 4.7-3.25a1 1 0 0 1 1.13 0l4.6 3.17-1.65-5.2a1 1 0 0 1 .35-1.1l4.52-3.42h-5.64a1 1 0 0 1-.94-.67l-1.85-5.35Zm-.03-2.1a2 2 0 0 1 1.88 1.32l1.66 4.8h5.04c1.81 0 2.62 2.28 1.26 3.46l-.06.05-4.07 3.07 1.5 4.72v.01c.56 1.83-1.48 3.13-2.96 2.15l-.02-.01-4.15-2.86-4.25 2.94-.01.01c-1.49.99-3.53-.31-2.97-2.14v-.02l1.5-4.71-4.07-3.08a1.98 1.98 0 0 1-.67-2.18c.22-.71.87-1.41 1.87-1.41h5.05l1.65-4.78a1.88 1.88 0 0 1 1.82-1.33Zm-9.58 20.71a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-1.53-1.9a.83.83 0 1 1-1.64 0 .83.83 0 0 1 1.65 0Zm-1.2-2.11a.83.83 0 1 1-1.66 0 .83.83 0 0 1 1.65 0Zm-.83-2.36a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-.42-2.44a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm0-2.41a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm.41-2.44a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm.83-2.25a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm1.15-2.23a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm1.59-1.88a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0ZM16.02 15a.83.83 0 1 1-1.65.01.83.83 0 0 1 1.65 0Zm2.08-1.28a.83.83 0 1 1-1.64 0 .83.83 0 0 1 1.65 0Zm2.3-.94a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm2.38-.51a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm2.42-.11a.83.83 0 1 1-1.64 0 .83.83 0 0 1 1.65 0Zm2.48.29a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm2.33.71a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm2.22 1.14a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm1.92 1.41a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm1.75 1.75a.83.83 0 1 1-1.66 0 .83.83 0 0 1 1.65 0Zm1.37 2a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm1.03 2.26a.83.83 0 1 1-1.64 0 .83.83 0 0 1 1.65 0Zm.6 2.34a.83.83 0 1 1-1.66 0 .83.83 0 0 1 1.65 0Zm.22 2.48a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-.18 2.51a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-.62 2.35a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-1.04 2.2a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-1.35 2.09a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-1.73 1.78a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-1.98 1.43a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-2.19 1.09a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-2.28.75a.82.82 0 1 1-1.65 0 .82.82 0 0 1 1.65 0Zm-2.43.31a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-2.48-.12a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-2.43-.44a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-2.25-.99a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-2.26-1.16a.83.83 0 1 1-1.64 0 .83.83 0 0 1 1.65 0ZM14.94 7a8.85 8.85 0 0 1 2.49-2.79 10.5 10.5 0 0 1 1.41-.92c.23-.12.5-.18.74-.1.46.14.6.62.71 1.04.1.31.2.75.26 1.27.12 1 .1 2.4-.68 3.58v.01a7.82 7.82 0 0 1-2.62 2.46c-.43.25-.88.45-1.3.7a16.38 16.38 0 0 0-8.4 14.34c0 8 5.73 14.66 13.34 16.15a.85.85 0 0 1-.33 1.67c-.99-.2-1.95-.47-2.88-.82-.23.18-.7.55-1.32.94a8.46 8.46 0 0 1-3.38 1.29 5.96 5.96 0 0 1-3.26-.61c-.5-.24-1.22-.6-1.43-1.15a.86.86 0 0 1 .04-.72c.29-.53.92-1 1.38-1.37a6.88 6.88 0 0 1 2.76-1.39c-.49-.4-.95-.82-1.39-1.26-.56.14-1.12.24-1.7.31a9.12 9.12 0 0 1-3.67-.2 5.68 5.68 0 0 1-3.32-2.78 1.35 1.35 0 0 1-.18-.8c.02-.1.1-.45.47-.63a9.13 9.13 0 0 1 1.64-.62 6.5 6.5 0 0 1 3.36-.08c-.32-.66-.6-1.34-.85-2.04-.4 0-.81-.03-1.21-.1a5.89 5.89 0 0 1-3.13-1.46 7.74 7.74 0 0 1-1.86-3.06 9.2 9.2 0 0 1-.33-1.2c-.07-.32-.13-.68.05-.99.25-.44.77-.44 1.22-.42.31 0 .75.04 1.24.12.9.16 2.06.5 3.04 1.27v-.05c0-.73.04-1.45.13-2.15-.25-.12-.6-.31-1-.59a6.15 6.15 0 0 1-2.11-2.52 8.22 8.22 0 0 1-.57-3.58c.03-.5.08-.95.14-1.28.06-.33.13-.69.4-.92a.86.86 0 0 1 .5-.2c.3-.02.6.15.85.28.28.14.67.35 1.08.63a6.63 6.63 0 0 1 2.3 2.58 18 18 0 0 1 1.26-2.24 5.46 5.46 0 0 1-1.82-3.63c-.1-1.34.28-2.69.65-3.65.19-.5.38-.9.53-1.2.21-.4.47-.85 1-.85.25 0 .45.13.64.3.2.18.65.6 1.11 1.19a6.34 6.34 0 0 1 1.4 3.91c.72-.6 1.47-1.13 2.27-1.62A5.47 5.47 0 0 1 14.93 7h.01Zm3.86-1.7a7.29 7.29 0 0 0-2.35 2.46 4.04 4.04 0 0 0-.29 2.44 5.96 5.96 0 0 0 2.29-2.06c.54-.83.53-1.9.35-2.84ZM6.25 30.75a4.77 4.77 0 0 0-1.28-2.63A5.1 5.1 0 0 0 2.13 27c.3.99.77 1.98 1.53 2.7.7.66 1.65.97 2.6 1.06Zm3.37 7.13a4.55 4.55 0 0 0-2.18-1.66 5 5 0 0 0-3.2.19 4.1 4.1 0 0 0 1.97 1.4c1.09.34 2.3.25 3.4.07Zm6.19 4.98a4.57 4.57 0 0 0-2.66-.67c-.89.1-1.73.58-2.38 1.1l-.4.34a4.54 4.54 0 0 0 2.42.5 6.93 6.93 0 0 0 3.02-1.27ZM9.4 9.56a7.26 7.26 0 0 0-.7 3.29 3.68 3.68 0 0 0 1.07 2.3c.55-.87.94-1.89.87-2.93A4.8 4.8 0 0 0 9.4 9.55Zm-5.38 7.92a6.57 6.57 0 0 0 .4 3.16 4.55 4.55 0 0 0 1.73 1.95c.26-.94.34-2-.06-2.91a4.99 4.99 0 0 0-2.07-2.2Z"></path></svg>
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
                            <svg aria-hidden="true" class="fc-bronze svg-spot spotAward" width="48" height="48" viewBox="0 0 48 48"><path d="M32.87 7a8.85 8.85 0 0 0-2.49-2.79 10.5 10.5 0 0 0-1.41-.92.98.98 0 0 0-.74-.1c-.46.14-.6.62-.71 1.04-.09.31-.2.75-.26 1.27-.12 1-.1 2.4.68 3.58v.01c.83 1.24 1.83 2 2.62 2.46.43.25.88.45 1.3.7a16.38 16.38 0 0 1 8.4 14.34c0 8-5.72 14.66-13.34 16.15a.85.85 0 0 0 .33 1.67c.99-.2 1.95-.47 2.88-.82.23.18.7.55 1.32.94a8.46 8.46 0 0 0 3.38 1.29 5.96 5.96 0 0 0 3.26-.61c.5-.24 1.22-.6 1.43-1.15a.86.86 0 0 0-.04-.72c-.29-.53-.92-1-1.38-1.37a6.88 6.88 0 0 0-2.76-1.39c.49-.4.95-.82 1.39-1.26.56.14 1.12.24 1.7.31 1.03.13 2.43.19 3.67-.2a5.68 5.68 0 0 0 3.32-2.78c.12-.24.22-.53.18-.8a.86.86 0 0 0-.47-.63 9.14 9.14 0 0 0-1.64-.62 6.5 6.5 0 0 0-3.36-.08 18 18 0 0 0 .85-2.04c.4 0 .81-.03 1.21-.1a5.89 5.89 0 0 0 3.14-1.46 7.74 7.74 0 0 0 1.85-3.06c.17-.47.27-.9.33-1.2.07-.32.13-.68-.05-.99-.25-.44-.77-.44-1.22-.42a9.1 9.1 0 0 0-1.24.12c-.9.16-2.06.5-3.04 1.27v-.05c0-.73-.04-1.45-.13-2.15.25-.12.6-.31 1-.59a6.15 6.15 0 0 0 2.11-2.52 8.3 8.3 0 0 0 .57-3.58 9.7 9.7 0 0 0-.14-1.28c-.06-.33-.13-.69-.4-.92a.86.86 0 0 0-.5-.2c-.3-.02-.6.15-.85.28a9.3 9.3 0 0 0-1.08.63 6.63 6.63 0 0 0-2.3 2.58 18 18 0 0 0-1.26-2.24 5.46 5.46 0 0 0 1.82-3.63 8.85 8.85 0 0 0-.65-3.65c-.19-.5-.38-.9-.53-1.2-.21-.4-.47-.85-1-.85a.98.98 0 0 0-.64.3c-.2.18-.65.6-1.11 1.19a6.34 6.34 0 0 0-1.4 3.91c-.72-.6-1.47-1.13-2.27-1.62A5.47 5.47 0 0 0 32.88 7h-.01Zm-3.86-1.7a7.29 7.29 0 0 1 2.35 2.46 4 4 0 0 1 .29 2.44 5.96 5.96 0 0 1-2.29-2.06c-.54-.83-.53-1.9-.35-2.84Zm12.55 25.44c.17-.96.56-1.94 1.28-2.63A5.1 5.1 0 0 1 45.68 27a6.1 6.1 0 0 1-1.53 2.7c-.7.66-1.65.97-2.6 1.06Zm-3.37 7.13a4.55 4.55 0 0 1 2.18-1.66 5 5 0 0 1 3.2.19 4.02 4.02 0 0 1-1.97 1.4 7.6 7.6 0 0 1-3.4.07ZM32 42.86a4.57 4.57 0 0 1 2.66-.67c.89.1 1.73.58 2.38 1.1l.4.34a4.54 4.54 0 0 1-2.42.5A6.93 6.93 0 0 1 32 42.86Zm6.41-33.3a7.2 7.2 0 0 1 .7 3.29 3.68 3.68 0 0 1-1.07 2.3 4.88 4.88 0 0 1-.87-2.93c.07-1 .6-1.91 1.24-2.67Zm5.38 7.92a6.57 6.57 0 0 1-.4 3.16 4.55 4.55 0 0 1-1.73 1.95 4.4 4.4 0 0 1 .06-2.91c.4-.95 1.2-1.67 2.07-2.2Zm-19.95.55L22 23.38a1 1 0 0 1-.94.67h-5.71v.02l4.6 3.48a1 1 0 0 1 .34 1.1l-1.66 5.2 4.7-3.25a1 1 0 0 1 1.13 0l4.6 3.17-1.65-5.2a1 1 0 0 1 .35-1.1l4.52-3.42h-5.64a1 1 0 0 1-.94-.67l-1.85-5.35Zm-.03-2.1a2 2 0 0 1 1.88 1.32l1.66 4.8h5.04c1.81 0 2.62 2.28 1.26 3.46l-.06.05-4.07 3.07 1.5 4.72v.01c.56 1.83-1.48 3.13-2.96 2.15l-.02-.01-4.15-2.86-4.25 2.94-.01.01c-1.49.99-3.53-.31-2.97-2.14v-.02l1.5-4.71-4.07-3.08a1.98 1.98 0 0 1-.67-2.18c.22-.71.87-1.41 1.87-1.41h5.05l1.65-4.78a1.88 1.88 0 0 1 1.82-1.33Zm-9.58 20.71a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-1.53-1.9a.83.83 0 1 1-1.64 0 .83.83 0 0 1 1.65 0Zm-1.2-2.11a.83.83 0 1 1-1.66 0 .83.83 0 0 1 1.65 0Zm-.83-2.36a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-.42-2.44a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm0-2.41a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm.41-2.44a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm.83-2.25a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm1.15-2.23a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm1.59-1.88a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0ZM16.02 15a.83.83 0 1 1-1.65.01.83.83 0 0 1 1.65 0Zm2.08-1.28a.83.83 0 1 1-1.64 0 .83.83 0 0 1 1.65 0Zm2.3-.94a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm2.38-.51a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm2.42-.11a.83.83 0 1 1-1.64 0 .83.83 0 0 1 1.65 0Zm2.48.29a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm2.33.71a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm2.22 1.14a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm1.92 1.41a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm1.75 1.75a.83.83 0 1 1-1.66 0 .83.83 0 0 1 1.65 0Zm1.37 2a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm1.03 2.26a.83.83 0 1 1-1.64 0 .83.83 0 0 1 1.65 0Zm.6 2.34a.83.83 0 1 1-1.66 0 .83.83 0 0 1 1.65 0Zm.22 2.48a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-.18 2.51a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-.62 2.35a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-1.04 2.2a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-1.35 2.09a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-1.73 1.78a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-1.98 1.43a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-2.19 1.09a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-2.28.75a.82.82 0 1 1-1.65 0 .82.82 0 0 1 1.65 0Zm-2.43.31a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-2.48-.12a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-2.43-.44a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-2.25-.99a.83.83 0 1 1-1.65 0 .83.83 0 0 1 1.65 0Zm-2.26-1.16a.83.83 0 1 1-1.64 0 .83.83 0 0 1 1.65 0ZM14.94 7a8.85 8.85 0 0 1 2.49-2.79 10.5 10.5 0 0 1 1.41-.92c.23-.12.5-.18.74-.1.46.14.6.62.71 1.04.1.31.2.75.26 1.27.12 1 .1 2.4-.68 3.58v.01a7.82 7.82 0 0 1-2.62 2.46c-.43.25-.88.45-1.3.7a16.38 16.38 0 0 0-8.4 14.34c0 8 5.73 14.66 13.34 16.15a.85.85 0 0 1-.33 1.67c-.99-.2-1.95-.47-2.88-.82-.23.18-.7.55-1.32.94a8.46 8.46 0 0 1-3.38 1.29 5.96 5.96 0 0 1-3.26-.61c-.5-.24-1.22-.6-1.43-1.15a.86.86 0 0 1 .04-.72c.29-.53.92-1 1.38-1.37a6.88 6.88 0 0 1 2.76-1.39c-.49-.4-.95-.82-1.39-1.26-.56.14-1.12.24-1.7.31a9.12 9.12 0 0 1-3.67-.2 5.68 5.68 0 0 1-3.32-2.78 1.35 1.35 0 0 1-.18-.8c.02-.1.1-.45.47-.63a9.13 9.13 0 0 1 1.64-.62 6.5 6.5 0 0 1 3.36-.08c-.32-.66-.6-1.34-.85-2.04-.4 0-.81-.03-1.21-.1a5.89 5.89 0 0 1-3.13-1.46 7.74 7.74 0 0 1-1.86-3.06 9.2 9.2 0 0 1-.33-1.2c-.07-.32-.13-.68.05-.99.25-.44.77-.44 1.22-.42.31 0 .75.04 1.24.12.9.16 2.06.5 3.04 1.27v-.05c0-.73.04-1.45.13-2.15-.25-.12-.6-.31-1-.59a6.15 6.15 0 0 1-2.11-2.52 8.22 8.22 0 0 1-.57-3.58c.03-.5.08-.95.14-1.28.06-.33.13-.69.4-.92a.86.86 0 0 1 .5-.2c.3-.02.6.15.85.28.28.14.67.35 1.08.63a6.63 6.63 0 0 1 2.3 2.58 18 18 0 0 1 1.26-2.24 5.46 5.46 0 0 1-1.82-3.63c-.1-1.34.28-2.69.65-3.65.19-.5.38-.9.53-1.2.21-.4.47-.85 1-.85.25 0 .45.13.64.3.2.18.65.6 1.11 1.19a6.34 6.34 0 0 1 1.4 3.91c.72-.6 1.47-1.13 2.27-1.62A5.47 5.47 0 0 1 14.93 7h.01Zm3.86-1.7a7.29 7.29 0 0 0-2.35 2.46 4.04 4.04 0 0 0-.29 2.44 5.96 5.96 0 0 0 2.29-2.06c.54-.83.53-1.9.35-2.84ZM6.25 30.75a4.77 4.77 0 0 0-1.28-2.63A5.1 5.1 0 0 0 2.13 27c.3.99.77 1.98 1.53 2.7.7.66 1.65.97 2.6 1.06Zm3.37 7.13a4.55 4.55 0 0 0-2.18-1.66 5 5 0 0 0-3.2.19 4.1 4.1 0 0 0 1.97 1.4c1.09.34 2.3.25 3.4.07Zm6.19 4.98a4.57 4.57 0 0 0-2.66-.67c-.89.1-1.73.58-2.38 1.1l-.4.34a4.54 4.54 0 0 0 2.42.5 6.93 6.93 0 0 0 3.02-1.27ZM9.4 9.56a7.26 7.26 0 0 0-.7 3.29 3.68 3.68 0 0 0 1.07 2.3c.55-.87.94-1.89.87-2.93A4.8 4.8 0 0 0 9.4 9.55Zm-5.38 7.92a6.57 6.57 0 0 0 .4 3.16 4.55 4.55 0 0 0 1.73 1.95c.26-.94.34-2-.06-2.91a4.99 4.99 0 0 0-2.07-2.2Z"></path></svg>
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