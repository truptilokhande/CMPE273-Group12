import React from 'react'
import BasicDetails from '../BasicDetails/BasicDetails'
import "./Activities.css"
//import Questionstab from './Questions/Questionstab'

function Activities() {
  return (
    <div>
        <BasicDetails/>
        <div class="d-flex mb48">
        <nav class="flex--item fl-shrink0 mr32 wmn1 md:d-none js-settings-nav" role="navigation">
            <ul class="ps-sticky t64 s-navigation s-navigation__muted s-navigation__vertical">
                   
                    <li>
                        <a class="s-navigation--item is-selected pr48 ps-relative" href="/users/2901002/jezrael?tab=answers" title="Answers this user provided" data-shortcut="A">
                            Answers
                        </a>
                    </li>
                    <li>
                        <a class="s-navigation--item pr48 ps-relative" href="/Questions/Questionstab" title="Questions this user asked" data-shortcut="Q">
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
                        <a class="s-navigation--item pr48 ps-relative" href="/Bookmarkstab/Bookmarkstab" title="Questions this user has bookmarked" data-shortcut="F">
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
        27,777 Answers
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
                    


<div id="answer-id-30359308" class="s-post-summary s-post-summary__minimal js-post-summary" data-post-id="30359308" data-post-type-id="2">
    <div class="s-post-summary--stats js-post-summary-stats">
        

                <div class="s-post-summary--stats-item s-post-summary--stats-item__emphasized" title="Score of 1845">
            <span class="s-post-summary--stats-item-number">1845</span>
            <span class="s-post-summary--stats-item-unit">votes</span>
        </div>



    </div>
    <div class="s-post-summary--content">

        <h3 class="s-post-summary--content-title">

            

            <a href="/questions/123198/how-to-copy-files/30359308#30359308" class="answer-hyperlink ">How to copy files?</a>
        </h3>
        <div class="s-post-summary--meta">
            <div class="s-post-summary--meta-tags tags js-tags t-python t-file t-copy t-filesystems t-file-copying">

<a href="/questions/tagged/python" class="post-tag flex--item mt0 js-tagname-python" title="show questions tagged 'python'" rel="tag">python</a> <a href="/questions/tagged/file" class="post-tag flex--item mt0 js-tagname-file" title="show questions tagged 'file'" rel="tag">file</a> <a href="/questions/tagged/copy" class="post-tag flex--item mt0 js-tagname-copy" title="show questions tagged 'copy'" rel="tag">copy</a> <a href="/questions/tagged/filesystems" class="post-tag flex--item mt0 js-tagname-filesystems" title="show questions tagged 'filesystems'" rel="tag">filesystems</a> <a href="/questions/tagged/file-copying" class="post-tag flex--item mt0 js-tagname-file-copying" title="show questions tagged 'file-copying'" rel="tag">file-copying</a> 
            </div>
            


<div class="s-user-card s-user-card__minimal">


    <div class="s-user-card--info">
            <div class="s-user-card--link d-flex gs4">
                
            </div>
        
        
        
    </div>

        <time class="s-user-card--time">answered <span title="2015-05-20 20:01:48Z" class="relativetime">May 20, 2015 at 20:01</span></time>
</div>

        </div>
    </div>
</div>

                    



                    



                    


<div id="answer-id-36005031" class="s-post-summary s-post-summary__minimal js-post-summary" data-post-id="36005031" data-post-type-id="2">
    <div class="s-post-summary--stats js-post-summary-stats">
        

                <div class="s-post-summary--stats-item s-post-summary--stats-item__emphasized" title="Score of 135">
            <span class="s-post-summary--stats-item-number">135</span>
            <span class="s-post-summary--stats-item-unit">votes</span>
        </div>
            <div class="s-post-summary--stats-item has-answers has-accepted-answer">
                <svg aria-hidden="true" class="svg-icon iconCheckmarkSm" width="14" height="14" viewBox="0 0 14 14"><path d="M13 3.41 11.59 2 5 8.59 2.41 6 1 7.41l4 4 8-8Z"></path></svg>
                Accepted
            </div>



    </div>
    <div class="s-post-summary--content">

        <h3 class="s-post-summary--content-title">

            

            <a href="/questions/36004976/count-frequency-of-values-in-pandas-dataframe-column/36005031#36005031" class="answer-hyperlink ">Count frequency of values in pandas DataFrame column</a>
        </h3>
        <div class="s-post-summary--meta">
            <div class="s-post-summary--meta-tags tags js-tags t-python t-django t-pandas t-dataframe">

<a href="/questions/tagged/python" class="post-tag flex--item mt0 js-tagname-python" title="show questions tagged 'python'" rel="tag">python</a> <a href="/questions/tagged/django" class="post-tag flex--item mt0 js-tagname-django" title="show questions tagged 'django'" rel="tag">django</a> <a href="/questions/tagged/pandas" class="post-tag flex--item mt0 js-tagname-pandas" title="show questions tagged 'pandas'" rel="tag">pandas</a> <a href="/questions/tagged/dataframe" class="post-tag flex--item mt0 js-tagname-dataframe" title="show questions tagged 'dataframe'" rel="tag">dataframe</a> 
            </div>
            


<div class="s-user-card s-user-card__minimal">


    <div class="s-user-card--info">
            <div class="s-user-card--link d-flex gs4">
                
            </div>
        
        
        
    </div>

        <time class="s-user-card--time">answered <span title="2016-03-15 07:32:51Z" class="relativetime">Mar 15, 2016 at 7:32</span></time>
</div>

        </div>
    </div>
</div>

                    


<div id="answer-id-45281439" class="s-post-summary s-post-summary__minimal js-post-summary" data-post-id="45281439" data-post-type-id="2">
    <div class="s-post-summary--stats js-post-summary-stats">
        

                <div class="s-post-summary--stats-item s-post-summary--stats-item__emphasized" title="Score of 133">
            <span class="s-post-summary--stats-item-number">133</span>
            <span class="s-post-summary--stats-item-unit">votes</span>
        </div>
            <div class="s-post-summary--stats-item has-answers has-accepted-answer">
                <svg aria-hidden="true" class="svg-icon iconCheckmarkSm" width="14" height="14" viewBox="0 0 14 14"><path d="M13 3.41 11.59 2 5 8.59 2.41 6 1 7.41l4 4 8-8Z"></path></svg>
                Accepted
            </div>



    </div>
    <div class="s-post-summary--content">

        <h3 class="s-post-summary--content-title">

            

            <a href="/questions/45281297/group-by-week-in-pandas/45281439#45281439" class="answer-hyperlink ">group by week in pandas</a>
        </h3>
        <div class="s-post-summary--meta">
            <div class="s-post-summary--meta-tags tags js-tags t-python t-pandas t-date t-group-by">

<a href="/questions/tagged/python" class="post-tag flex--item mt0 js-tagname-python" title="show questions tagged 'python'" rel="tag">python</a> <a href="/questions/tagged/pandas" class="post-tag flex--item mt0 js-tagname-pandas" title="show questions tagged 'pandas'" rel="tag">pandas</a> <a href="/questions/tagged/date" class="post-tag flex--item mt0 js-tagname-date" title="show questions tagged 'date'" rel="tag">date</a> <a href="/questions/tagged/group-by" class="post-tag flex--item mt0 js-tagname-group-by" title="show questions tagged 'group-by'" rel="tag">group-by</a> 
            </div>
            


<div class="s-user-card s-user-card__minimal">


    <div class="s-user-card--info">
            <div class="s-user-card--link d-flex gs4">
                
            </div>
        
        
        
    </div>

        <time class="s-user-card--time">answered <span title="2017-07-24 13:05:29Z" class="relativetime">Jul 24, 2017 at 13:05</span></time>
</div>

        </div>
    </div>
</div>

                    


<div id="answer-id-37697279" class="s-post-summary s-post-summary__minimal js-post-summary" data-post-id="37697279" data-post-type-id="2">
    <div class="s-post-summary--stats js-post-summary-stats">
        

                <div class="s-post-summary--stats-item s-post-summary--stats-item__emphasized" title="Score of 130">
            <span class="s-post-summary--stats-item-number">130</span>
            <span class="s-post-summary--stats-item-unit">votes</span>
        </div>
            <div class="s-post-summary--stats-item has-answers has-accepted-answer">
                <svg aria-hidden="true" class="svg-icon iconCheckmarkSm" width="14" height="14" viewBox="0 0 14 14"><path d="M13 3.41 11.59 2 5 8.59 2.41 6 1 7.41l4 4 8-8Z"></path></svg>
                Accepted
            </div>



    </div>
    <div class="s-post-summary--content">

        <h3 class="s-post-summary--content-title">

            

            <a href="/questions/37697195/how-to-merge-two-data-frames-based-on-particular-column-in-pandas-python/37697279#37697279" class="answer-hyperlink ">how to merge two data frames based on particular column in pandas python?</a>
        </h3>
        <div class="s-post-summary--meta">
            <div class="s-post-summary--meta-tags tags js-tags t-python t-pandas t-python-2û7 t-merge">

<a href="/questions/tagged/python" class="post-tag flex--item mt0 js-tagname-python" title="show questions tagged 'python'" rel="tag">python</a> <a href="/questions/tagged/pandas" class="post-tag flex--item mt0 js-tagname-pandas" title="show questions tagged 'pandas'" rel="tag">pandas</a> <a href="/questions/tagged/python-2.7" class="post-tag flex--item mt0 js-tagname-python-2û7" title="show questions tagged 'python-2.7'" rel="tag">python-2.7</a> <a href="/questions/tagged/merge" class="post-tag flex--item mt0 js-tagname-merge" title="show questions tagged 'merge'" rel="tag">merge</a> 
            </div>
            


<div class="s-user-card s-user-card__minimal">


    <div class="s-user-card--info">
            <div class="s-user-card--link d-flex gs4">
                
            </div>
        
        
        
    </div>

        <time class="s-user-card--time">answered <span title="2016-06-08 08:35:23Z" class="relativetime">Jun 8, 2016 at 8:35</span></time>
</div>

        </div>
    </div>
</div>

                    


<div id="answer-id-37103131" class="s-post-summary s-post-summary__minimal js-post-summary" data-post-id="37103131" data-post-type-id="2">
    <div class="s-post-summary--stats js-post-summary-stats">
        

                <div class="s-post-summary--stats-item s-post-summary--stats-item__emphasized" title="Score of 120">
            <span class="s-post-summary--stats-item-number">120</span>
            <span class="s-post-summary--stats-item-unit">votes</span>
        </div>



    </div>
    <div class="s-post-summary--content">

        <h3 class="s-post-summary--content-title">

            

            <a href="/questions/19350806/how-to-convert-columns-into-one-datetime-column-in-pandas/37103131#37103131" class="answer-hyperlink ">How to convert columns into one datetime column in pandas?</a>
        </h3>
        <div class="s-post-summary--meta">
            <div class="s-post-summary--meta-tags tags js-tags t-python t-pandas t-datetime">

<a href="/questions/tagged/python" class="post-tag flex--item mt0 js-tagname-python" title="show questions tagged 'python'" rel="tag">python</a> <a href="/questions/tagged/pandas" class="post-tag flex--item mt0 js-tagname-pandas" title="show questions tagged 'pandas'" rel="tag">pandas</a> <a href="/questions/tagged/datetime" class="post-tag flex--item mt0 js-tagname-datetime" title="show questions tagged 'datetime'" rel="tag">datetime</a> 
            </div>
            


<div class="s-user-card s-user-card__minimal">


    <div class="s-user-card--info">
            <div class="s-user-card--link d-flex gs4">
                
            </div>
        
        
        
    </div>

        <time class="s-user-card--time">answered <span title="2016-05-08 18:06:27Z" class="relativetime">May 8, 2016 at 18:06</span></time>
</div>

        </div>
    </div>
</div>

                    


<div id="answer-id-42826430" class="s-post-summary s-post-summary__minimal js-post-summary" data-post-id="42826430" data-post-type-id="2">
    <div class="s-post-summary--stats js-post-summary-stats">
        

                <div class="s-post-summary--stats-item s-post-summary--stats-item__emphasized" title="Score of 120">
            <span class="s-post-summary--stats-item-number">120</span>
            <span class="s-post-summary--stats-item-unit">votes</span>
        </div>
            <div class="s-post-summary--stats-item has-answers has-accepted-answer">
                <svg aria-hidden="true" class="svg-icon iconCheckmarkSm" width="14" height="14" viewBox="0 0 14 14"><path d="M13 3.41 11.59 2 5 8.59 2.41 6 1 7.41l4 4 8-8Z"></path></svg>
                Accepted
            </div>



    </div>
    <div class="s-post-summary--content">

        <h3 class="s-post-summary--content-title">

            

            <a href="/questions/42826388/using-time-zone-in-pandas-to-datetime/42826430#42826430" class="answer-hyperlink ">using time zone in pandas to_datetime</a>
        </h3>
        <div class="s-post-summary--meta">
            <div class="s-post-summary--meta-tags tags js-tags t-pandas t-timezone">

<a href="/questions/tagged/pandas" class="post-tag flex--item mt0 js-tagname-pandas" title="show questions tagged 'pandas'" rel="tag">pandas</a> <a href="/questions/tagged/timezone" class="post-tag flex--item mt0 js-tagname-timezone" title="show questions tagged 'timezone'" rel="tag">timezone</a> 
            </div>
            


<div class="s-user-card s-user-card__minimal">


    <div class="s-user-card--info">
            <div class="s-user-card--link d-flex gs4">
                
            </div>
        
        
        
    </div>

        <time class="s-user-card--time">answered <span title="2017-03-16 06:04:29Z" class="relativetime">Mar 16, 2017 at 6:04</span></time>
</div>

        </div>
    </div>
</div>

                    


<div id="answer-id-52297788" class="s-post-summary s-post-summary__minimal js-post-summary" data-post-id="52297788" data-post-type-id="2">
    <div class="s-post-summary--stats js-post-summary-stats">
        

                <div class="s-post-summary--stats-item s-post-summary--stats-item__emphasized" title="Score of 120">
            <span class="s-post-summary--stats-item-number">120</span>
            <span class="s-post-summary--stats-item-unit">votes</span>
        </div>
            <div class="s-post-summary--stats-item has-answers has-accepted-answer">
                <svg aria-hidden="true" class="svg-icon iconCheckmarkSm" width="14" height="14" viewBox="0 0 14 14"><path d="M13 3.41 11.59 2 5 8.59 2.41 6 1 7.41l4 4 8-8Z"></path></svg>
                Accepted
            </div>



    </div>
    <div class="s-post-summary--content">

        <h3 class="s-post-summary--content-title">

            

            <a href="/questions/52297740/typeerror-bad-operand-type-for-unary-float/52297788#52297788" class="answer-hyperlink ">TypeError: bad operand type for unary ~: float</a>
        </h3>
        <div class="s-post-summary--meta">
            <div class="s-post-summary--meta-tags tags js-tags t-python t-pandas">

<a href="/questions/tagged/python" class="post-tag flex--item mt0 js-tagname-python" title="show questions tagged 'python'" rel="tag">python</a> <a href="/questions/tagged/pandas" class="post-tag flex--item mt0 js-tagname-pandas" title="show questions tagged 'pandas'" rel="tag">pandas</a> 
            </div>
            


<div class="s-user-card s-user-card__minimal">


    <div class="s-user-card--info">
            <div class="s-user-card--link d-flex gs4">
                
            </div>
        
        
        
    </div>

        <time class="s-user-card--time">answered <span title="2018-09-12 14:38:39Z" class="relativetime">Sep 12, 2018 at 14:38</span></time>
</div>

        </div>
    </div>
</div>

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