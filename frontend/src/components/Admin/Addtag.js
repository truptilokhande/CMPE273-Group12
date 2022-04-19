import React from 'react'

function Addtag() {
  return (
    <div>
        <h2>Add a Tag</h2>
       
            
            <div className="d-flex position-relative">
            <label>Tag Name :</label>
            <input
              id="tagitle"
              name="tagtitle"
              type="text"
              maxlength="300"
              placeholder="python"
              className="tagtitle"
              style={{marginLeft:"20px"}}
              data-min-length="15"
              data-max-length="150"
            />
          </div>
      
        <div>
            <label>Tag descrption :</label>
            <input
              id="tagdescription"
              name="tagdescription"
              type="textarea"
              length="300px"
             
              className="tagdescription"
              value=""
              data-min-length="15"
              data-max-length="150"
              style={{margin:"20px"}}
              />
        </div>
        <button type="submit" className='addtag' style={{borderRadius:"5px"}}>submit</button>
    </div>
  )
}

export default Addtag