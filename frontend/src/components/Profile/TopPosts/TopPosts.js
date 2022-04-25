import React from 'react'
import "./TopPosts.css"
import { Link } from 'react-router-dom'
function TopPosts() {
  return (
    
      <div className='top-posts'>
         <div className='d-flex flex-row'>
            <Link to="/" class="questionlink">How to filter large files on git pull?</Link>
            
          </div>
         

      </div>
   
  )
}

export default TopPosts