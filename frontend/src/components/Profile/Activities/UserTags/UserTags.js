import React from 'react'
import "./UserTags.css"
import BasicDetails from '../../BasicDetails/BasicDetails'

function UserTags() {
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
                <div id="user-tab-tags" class="js-user-tab">
    <div class="d-flex ai-end jc-space-between mb8 fw-wrap">
        <div class="flex--item fl-grow1">
            <div class="d-flex fd-column">
                
    <h2 class="flex--item fs-title mb0">
        8 Tags
    </h2>


            </div>
        </div>
            <div class="flex--item">
                <div class="d-flex ai-end">
                        <div class="flex--item s-btn-group js-user-tab-sorts fl-shrink0 md:fl-shrink1">
                                <a href="/users/2930622/g-rafael?tab=tags&amp;sort=votes" class="as-center s-btn s-btn__muted s-btn__outlined s-btn__xs js-user-tab-sort is-selected js-selected" data-sort="votes">
                                    Score
                                </a>
                                <a href="/users/2930622/g-rafael?tab=tags&amp;sort=name" class="as-center s-btn s-btn__muted s-btn__outlined s-btn__xs js-user-tab-sort" data-sort="name">
                                    Name
                                </a>
                        </div>
                </div>
            </div>
    </div>

    <div class="ba bc-black-100 bar-md">
        
            <div class="p12 bb bc-black-075" title="0 non-wiki questions (0 score). 2 non-wiki answers (21 score).">
                

<div class="d-flex ai-center jc-space-between gs16 fw-wrap">
    <div class="flex--item ws-nowrap">
        <a href="/search?q=user:2930622+[docker]" class="post-tag js-gps-track" title="" rel="tag" data-gps-track="profile_link.click({target:2, type:2 })">docker</a>
    </div>
    <div class="flex--item">
        <div class="d-flex gsx gs16">
            <div class="flex--item d-flex ai-center mr-2">
                <div class="fs-body3 mr4">21</div>
                <div class="fc-light tt-lowercase">Score</div>
            </div>
            <div class="flex--item d-flex ai-center">
                <div class="fs-body3 mr4">2</div>
                <div class="fc-light">posts</div>
            </div>
        </div>
    </div>
</div>


            </div>
            <div class="p12 bb bc-black-075" title="0 non-wiki questions (0 score). 2 non-wiki answers (2 score).">
                

<div class="d-flex ai-center jc-space-between gs16 fw-wrap">
    <div class="flex--item ws-nowrap">
        <a href="/search?q=user:2930622+[kubernetes]" class="post-tag js-gps-track" title="show questions tagged 'kubernetes'" rel="tag" data-gps-track="profile_link.click({target:2, type:2 })">kubernetes</a>
    </div>
    <div class="flex--item">
        <div class="d-flex gsx gs16">
            <div class="flex--item d-flex ai-center mr-2">
                <div class="fs-body3 mr4">2</div>
                <div class="fc-light tt-lowercase">Score</div>
            </div>
            <div class="flex--item d-flex ai-center">
                <div class="fs-body3 mr4">2</div>
                <div class="fc-light">posts</div>
            </div>
        </div>
    </div>
</div>


            </div>
            <div class="p12 bb bc-black-075" title="0 non-wiki questions (0 score). 1 non-wiki answers (1 score).">
                

<div class="d-flex ai-center jc-space-between gs16 fw-wrap">
    <div class="flex--item ws-nowrap">
        <a href="/search?q=user:2930622+[jconsole]" class="post-tag js-gps-track" title="show questions tagged 'jconsole'" rel="tag" data-gps-track="profile_link.click({target:2, type:2 })">jconsole</a>
    </div>
    <div class="flex--item">
        <div class="d-flex gsx gs16">
            <div class="flex--item d-flex ai-center mr-2">
                <div class="fs-body3 mr4">1</div>
                <div class="fc-light tt-lowercase">Score</div>
            </div>
            <div class="flex--item d-flex ai-center">
                <div class="fs-body3 mr4">1</div>
                <div class="fc-light">post</div>
            </div>
        </div>
    </div>
</div>


            </div>
            <div class="p12 bb bc-black-075" title="0 non-wiki questions (0 score). 1 non-wiki answers (1 score).">
                

<div class="d-flex ai-center jc-space-between gs16 fw-wrap">
    <div class="flex--item ws-nowrap">
        <a href="/search?q=user:2930622+[jvisualvm]" class="post-tag js-gps-track" title="show questions tagged 'jvisualvm'" rel="tag" data-gps-track="profile_link.click({target:2, type:2 })">jvisualvm</a>
    </div>
    <div class="flex--item">
        <div class="d-flex gsx gs16">
            <div class="flex--item d-flex ai-center mr-2">
                <div class="fs-body3 mr4">1</div>
                <div class="fc-light tt-lowercase">Score</div>
            </div>
            <div class="flex--item d-flex ai-center">
                <div class="fs-body3 mr4">1</div>
                <div class="fc-light">post</div>
            </div>
        </div>
    </div>
</div>


            </div>
            <div class="p12 bb bc-black-075" title="0 non-wiki questions (0 score). 1 non-wiki answers (1 score).">
                

<div class="d-flex ai-center jc-space-between gs16 fw-wrap">
    <div class="flex--item ws-nowrap">
        <a href="/search?q=user:2930622+[docker-machine]" class="post-tag js-gps-track" title="show questions tagged 'docker-machine'" rel="tag" data-gps-track="profile_link.click({target:2, type:2 })">docker-machine</a>
    </div>
    <div class="flex--item">
        <div class="d-flex gsx gs16">
            <div class="flex--item d-flex ai-center mr-2">
                <div class="fs-body3 mr4">1</div>
                <div class="fc-light tt-lowercase">Score</div>
            </div>
            <div class="flex--item d-flex ai-center">
                <div class="fs-body3 mr4">1</div>
                <div class="fc-light">post</div>
            </div>
        </div>
    </div>
</div>


            </div>
            <div class="p12 bb bc-black-075" title="0 non-wiki questions (0 score). 1 non-wiki answers (1 score).">
                

<div class="d-flex ai-center jc-space-between gs16 fw-wrap">
    <div class="flex--item ws-nowrap">
        <a href="/search?q=user:2930622+[remote-debugging]" class="post-tag js-gps-track" title="show questions tagged 'remote-debugging'" rel="tag" data-gps-track="profile_link.click({target:2, type:2 })">remote-debugging</a>
    </div>
    <div class="flex--item">
        <div class="d-flex gsx gs16">
            <div class="flex--item d-flex ai-center">
                <div class="fs-body3 mr4">1</div>
                <div class="fc-light tt-lowercase">Score</div>
            </div>
            <div class="flex--item d-flex ai-center">
                <div class="fs-body3 mr4">1</div>
                <div class="fc-light">post</div>
            </div>
        </div>
    </div>
</div>


            </div>
            <div class="p12 bb bc-black-075" title="0 non-wiki questions (0 score). 1 non-wiki answers (0 score).">
                

<div class="d-flex ai-center jc-space-between gs16 fw-wrap">
    <div class="flex--item ws-nowrap">
        <a href="/search?q=user:2930622+[google-cloud-platform]" class="post-tag js-gps-track" title="show questions tagged 'google-cloud-platform'" rel="tag" data-gps-track="profile_link.click({target:2, type:2 })">google-cloud-platform</a>
    </div>
    <div class="flex--item">
        <div class="d-flex gsx gs16">
            <div class="flex--item d-flex ai-center">
                <div class="fs-body3 mr4">0</div>
                <div class="fc-light tt-lowercase">Score</div>
            </div>
            <div class="flex--item d-flex ai-center">
                <div class="fs-body3 mr4">1</div>
                <div class="fc-light">post</div>
            </div>
        </div>
    </div>
</div>


            </div>
            <div class="p12" title="0 non-wiki questions (0 score). 1 non-wiki answers (0 score).">
                

<div class="d-flex ai-center jc-space-between gs16 fw-wrap">
    <div class="flex--item ws-nowrap">
        <a href="/search?q=user:2930622+[kubernetes-helm]" class="post-tag js-gps-track" title="show questions tagged 'kubernetes-helm'" rel="tag" data-gps-track="profile_link.click({target:2, type:2 })">kubernetes-helm</a>
    </div>
    <div class="flex--item">
        <div class="d-flex gsx gs16">
            <div class="flex--item d-flex ai-center">
                <div class="fs-body3 mr4">0</div>
                <div class="fc-light tt-lowercase">Score</div>
            </div>
            <div class="flex--item d-flex ai-center">
                <div class="fs-body3 mr4">1</div>
                <div class="fc-light">post</div>
            </div>
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

export default UserTags