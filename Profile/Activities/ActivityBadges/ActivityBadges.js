import React from 'react'
import "./ActivityBadges.css"
import BasicDetails from '../../BasicDetails/BasicDetails'
function ActivityBadges() {
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
                <div id="user-tab-badges" class="js-user-tab">
    <div class="d-flex ai-end jc-space-between mb8 fw-wrap">
        <div class="flex--item fl-grow1">
            <div class="d-flex fd-column">
                
    <h2 class="flex--item fs-title mb0">
        8 Badges
    </h2>


            </div>
        </div>
            <div class="flex--item">
                <div class="d-flex ai-end">
                        <div class="flex--item s-btn-group js-user-tab-sorts fl-shrink0 md:fl-shrink1">
                                <a href="/users/2930622/g-rafael?tab=badges&amp;sort=recent" class="as-center s-btn s-btn__muted s-btn__outlined s-btn__xs js-user-tab-sort is-selected js-selected" data-sort="recent">
                                    Recent
                                </a>
                                <a href="/users/2930622/g-rafael?tab=badges&amp;sort=class" class="as-center s-btn s-btn__muted s-btn__outlined s-btn__xs js-user-tab-sort" data-sort="class">
                                    Class
                                </a>
                                <a href="/users/2930622/g-rafael?tab=badges&amp;sort=name" class="as-center s-btn s-btn__muted s-btn__outlined s-btn__xs js-user-tab-sort" data-sort="name">
                                    Name
                                </a>
                        </div>
                </div>
            </div>
    </div>

    <div>
        
        <div class="d-grid g16 grid__4 lg:grid__3 md:grid__2 sm:grid__1 py8">
                <div class="grid--item">
                    <div class="d-flex ai-center jc-start">
                        <div class="flex--item mbn4">
                            <a href="/help/badges/13/yearling?userid=2930622" title="silver badge: Active member for a year, earning at least 200 reputation" class="badgeclass"><span class="badge2"></span>&nbsp;Yearling</a>
                        </div>
                        <div class="flex--item ml4">
                            
                        </div>
                    </div>
                </div>
                <div class="grid--item">
                    <div class="d-flex ai-center jc-start">
                        <div class="flex--item mbn4">
                            <a href="/help/badges/38/peer-pressure?userid=2930622" title="bronze badge: Delete own post with score of -3 or lower" className="badgeclass"><span class="badge3"></span>&nbsp;Peer Pressure</a>
                        </div>
                        <div class="flex--item ml4">
                            
                        </div>
                    </div>
                </div>
                <div class="grid--item">
                    <div class="d-flex ai-center jc-start">
                        <div class="flex--item mbn4">
                            <a href="/help/badges/6644/census?userid=2930622" title="silver badge: Completed the annual Stack Overflow survey; your responses are anonymous" class="badgeclass"><span class="badge2"></span>&nbsp;Census</a>
                        </div>
                        <div class="flex--item ml4">
                            
                        </div>
                    </div>
                </div>
                <div class="grid--item">
                    <div class="d-flex ai-center jc-start">
                        <div class="flex--item mbn4">
                            <a href="/help/badges/23/nice-answer?userid=2930622" title="bronze badge: Answer score of 10 or more" class="badgeclass"><span class="badge3"></span>&nbsp;Nice Answer</a>
                        </div>
                        <div class="flex--item ml4">
                            
                        </div>
                    </div>
                </div>
                <div class="grid--item">
                    <div class="d-flex ai-center jc-start">
                        <div class="flex--item mbn4">
                            <a href="/help/badges/6/supporter?userid=2930622" title="bronze badge: First up vote" class="badgeclass"><span class="badge3"></span>&nbsp;Supporter</a>
                        </div>
                        <div class="flex--item ml4">
                            
                        </div>
                    </div>
                </div>
                <div class="grid--item">
                    <div class="d-flex ai-center jc-start">
                        <div class="flex--item mbn4">
                            <a href="/help/badges/17/necromancer?userid=2930622" title="silver badge: Answer a question more than 60 days later with score of 5 or more" class="badgeclass"><span class="badge2"></span>&nbsp;Necromancer</a>
                        </div>
                        <div class="flex--item ml4">
                            
                        </div>
                    </div>
                </div>
                <div class="grid--item">
                    <div class="d-flex ai-center jc-start">
                        <div class="flex--item mbn4">
                            <a href="/help/badges/3/editor?userid=2930622" title="bronze badge: First edit" class="badgeclass"><span class="badge3"></span>&nbsp;Editor</a>
                        </div>
                        <div class="flex--item ml4">
                            
                        </div>
                    </div>
                </div>
                <div class="grid--item">
                    <div class="d-flex ai-center jc-start">
                        <div class="flex--item mbn4">
                            <a href="/help/badges/1/teacher?userid=2930622" title="bronze badge: Answer a question with score of 1 or more" class="badgeclass"><span class="badge3"></span>&nbsp;Teacher</a>
                        </div>
                        <div class="flex--item ml4">
                            
                        </div>
                    </div>
                </div>
        </div>

    </div>

    <div>
        
        <div class="js-user-tab-paging">
            
        </div>
    </div>
</div>

        </section>
    </div>
    </div>
  )
}

export default ActivityBadges