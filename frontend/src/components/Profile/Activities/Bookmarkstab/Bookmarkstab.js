import React from 'react'
import "./Bookmarkstab.css"
import BasicDetails from '../../BasicDetails/BasicDetails'
function Bookmarkstab() {
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
    <div id="user-tab-bookmarks" class="js-user-tab">
<div class="d-flex ai-end jc-space-between mb8 fw-wrap">
<div class="flex--item fl-grow1">
<div class="d-flex fd-column">
    
<h2 class="flex--item fs-title mb0">
0 Bookmarks
</h2>


</div>
</div>
<div class="flex--item">
    <div class="d-flex ai-end">
            <div class="flex--item s-btn-group js-user-tab-sorts fl-shrink0 md:fl-shrink1">
                    <a href="/users/2930622/g-rafael?tab=bookmarks&amp;sort=votes" class="as-center s-btn s-btn__muted s-btn__outlined s-btn__xs js-user-tab-sort is-selected js-selected" data-sort="votes">
                        Score
                    </a>
                    <a href="/users/2930622/g-rafael?tab=bookmarks&amp;sort=activity" class="as-center s-btn s-btn__muted s-btn__outlined s-btn__xs js-user-tab-sort" data-sort="activity">
                        Activity
                    </a>
                    <a href="/users/2930622/g-rafael?tab=bookmarks&amp;sort=newest" class="as-center s-btn s-btn__muted s-btn__outlined s-btn__xs js-user-tab-sort" data-sort="newest">
                        Newest
                    </a>
                    <a href="/users/2930622/g-rafael?tab=bookmarks&amp;sort=views" class="as-center s-btn s-btn__muted s-btn__outlined s-btn__xs js-user-tab-sort" data-sort="views">
                        Views
                    </a>
                    <a href="/users/2930622/g-rafael?tab=bookmarks&amp;sort=added" class="as-center s-btn s-btn__muted s-btn__outlined s-btn__xs js-user-tab-sort" data-sort="added">
                        Added
                    </a>
            </div>
    </div>
</div>
</div>

<div class="ba bc-black-100 bar-md">

<div class="s-empty-state wmx4 p48">
This user has no bookmarked questions       </div>

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

export default Bookmarkstab