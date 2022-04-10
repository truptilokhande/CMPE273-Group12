import React from 'react'
import "./Badge.css"
import goldbadge from "../../../assets/goldbadge.png"
import moment from "moment";

const Badge=()=> {
return(
    <div className='badge-page'>
        <div className='badgeCard'>
            <div>
                <img src={goldbadge} style={{height:"50px",width:"50px",margin:"2px"}}/>
                8
                <p style={{marginLeft:"50px",marginTop:"-20px"}}>goldbadges</p>
           </div>
           <div className='tags'>
            
       
           <button className='tag1'>Python</button>
           <button className='tag1'>Java</button>
           </div>
        </div>
        
    
  </div>
)

}

export default Badge