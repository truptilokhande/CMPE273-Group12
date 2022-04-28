
import React, {useEffect, useState, Fragment} from 'react';
import axios from 'axios';
import connection from "../../../config.json";
import BasicDetails from '../BasicDetails/BasicDetails'
import "./Activities.css"
//import Questionstab from './Questions/Questionstab'

function Activities(user) {
    const [answers,setAnswers]=useState([]);
    const [ac,setAc]=useState(0);
  const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
  console.log(id);
  useEffect(() => {
      
    axios
      .get(`${connection.connectionURL}/api/user/getAnswers/${id}`)
      .then((response) => {
          console.log(response);
        setAnswers(response.data.data);
        setAc(response.data.ac)
        //setLastseen(response.data.data.updatedAt)
      })
      .catch((err) => {
        throw err;
      });
  }, []);


  return (
    <div>
        <BasicDetails id={id}/>
        <div class="d-flex mb48">
        <nav class="flex--item fl-shrink0 mr32 wmn1 md:d-none js-settings-nav" role="navigation">
            <ul class="ps-sticky t64 s-navigation s-navigation__muted s-navigation__vertical">
                   
                    <li>
                        <a class="s-navigation--item is-selected pr48 ps-relative" href={`/Activities/${id}`} title="Answers this user provided" data-shortcut="A">
                            Answers
                        </a>
                    </li>
                    <li>
                        <a class="s-navigation--item pr48 ps-relative" href={`/Questions/Questionstab/${id}`} title="Questions this user asked" data-shortcut="Q">
                            Questions
                        </a>
                    </li>
                    <li>
                        <a class="s-navigation--item pr48 ps-relative" href="/UserTags/UserTags" title="Tags this user has posts in" data-shortcut="T">
                            Tags
                        </a>
                    </li>
                    
                    <li>
                        <a class="s-navigation--item pr48 ps-relative" href="/ActivityBadges/ActivityBadges" title="Badges this user has earned" data-shortcut="B">
                            Badges
                        </a>
                    </li>
                    <li>
                        <a class="s-navigation--item pr48 ps-relative" href={`/Bookmarkstab/Bookmarkstab/${id}`} title="Questions this user has bookmarked" data-shortcut="F">
                            Bookmarks
                        </a>
                    </li>
                    
                    <li>
                        <a class="s-navigation--item pr48 ps-relative" href="/Reputation/Reputation" title="Reputation this user has earned" data-shortcut="R">
                            Reputation
                        </a>
                    </li>
                    
            </ul>
        </nav>

        <section class="flex--item fl-grow1 wmx100">
                <div id="user-tab-answers" class="js-user-tab">
    <div class="d-flex ai-end jc-space-between mb8 fw-wrap">
        <div class="flex--item fl-grow1">
            <div class="d-flex fd-column">
                
    <h2 class="flex--item fs-title mb0">
 {    ac} Answers 
    </h2>



            </div>
        </div>
            <div class="flex--item">
                <div class="d-flex ai-end">
                        <div class="flex--item s-btn-group js-user-tab-sorts fl-shrink0 md:fl-shrink1">
                                <a href="/users/2901002/jezrael?tab=answers&amp;sort=votes" class="as-center s-btn s-btn__muted s-btn__outlined s-btn__xs js-user-tab-sort is-selected js-selected" data-sort="votes">
                                    Score
                                </a>
                                <a href="/users/2901002/jezrael?tab=answers&amp;sort=activity" class="as-center s-btn s-btn__muted s-btn__outlined s-btn__xs js-user-tab-sort" data-sort="activity">
                                    Activity
                                </a>
                                <a href="/users/2901002/jezrael?tab=answers&amp;sort=newest" class="as-center s-btn s-btn__muted s-btn__outlined s-btn__xs js-user-tab-sort" data-sort="newest">
                                    Newest
                                </a>
                        </div>
                </div>
            </div>
    </div>

    <div class="ba bc-black-100 bar-md">
        
            <div id="js-post-summaries">
                    

            {answers?.map((ans) => (
<div id="answer-id-30359308" class="s-post-summary s-post-summary__minimal js-post-summary" data-post-id="30359308" data-post-type-id="2">
    <div class="s-post-summary--stats js-post-summary-stats">
    

                <div class="s-post-summary--stats-item s-post-summary--stats-item__emphasized" title="Score of 1845">
            <span class="s-post-summary--stats-item-number">{ans.votes}</span>
            <span class="s-post-summary--stats-item-unit">vote/s</span>
        </div>



    </div>
    <div class="s-post-summary--content">

        <h3 class="s-post-summary--content-title">

            

            <a href="/questions/123198/how-to-copy-files/30359308#30359308" class="answer-hyperlink ">{ans.questionId.title}</a>
        </h3>
        <div class="s-post-summary--meta">
        {ans.questionId.tags?.map((tag)=>(
            <div class="s-post-summary--meta-tags tags js-tags t-python t-file t-copy t-filesystems t-file-copying">

            <a href="/questions/tagged/python" class="post-tag flex--item mt0 js-tagname-python" title="show questions tagged 'python'" rel="tag">{tag.name}</a> 
            </div>
            
            ))}

<div class="s-user-card s-user-card__minimal">


    <div class="s-user-card--info">
            <div class="s-user-card--link d-flex gs4">
                
            </div>
        
        
        
    </div>

        <time class="s-user-card--time">answered <span title="2015-05-20 20:01:48Z" class="relativetime">{ans.createdAt}</span></time>
</div>

        </div>
    </div>
</div>
))}

                    



                    



                    




            </div>

    </div>

    <div>
        
        <div class="js-user-tab-paging">
            <div class="s-pagination site1 themed pager float-right">
<div class="s-pagination--item is-selected">1</div>
<a class="s-pagination--item js-pagination-item" href="/users/2901002/jezrael?tab=answers&amp;sort=votes&amp;page=2" rel="" title="Go to page 2">2</a>
<a class="s-pagination--item js-pagination-item" href="/users/2901002/jezrael?tab=answers&amp;sort=votes&amp;page=3" rel="" title="Go to page 3">3</a>
<a class="s-pagination--item js-pagination-item" href="/users/2901002/jezrael?tab=answers&amp;sort=votes&amp;page=4" rel="" title="Go to page 4">4</a>
<a class="s-pagination--item js-pagination-item" href="/users/2901002/jezrael?tab=answers&amp;sort=votes&amp;page=5" rel="" title="Go to page 5">5</a>
<div class="s-pagination--item s-pagination--item__clear">…</div>
<a class="s-pagination--item js-pagination-item" href="/users/2901002/jezrael?tab=answers&amp;sort=votes&amp;page=926" rel="" title="Go to page 926">926</a>
<a class="s-pagination--item js-pagination-item" href="/users/2901002/jezrael?tab=answers&amp;sort=votes&amp;page=2" rel="next" title="Go to page 2"> Next</a></div>

        </div>
    </div>
</div>

        </section>
    </div>
    </div>
  )
}

export default Activities