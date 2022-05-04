import { useEffect } from 'react';
import axios from "axios";
import { useState } from "react";
import {Link} from 'react-router-dom';
import "./Chats.css";
import connection from "../../config.json";
import { connect } from "react-redux";

//var message_array=[{senderID:1,receiverID:2,message:"hi",timestamp:"123"},{senderID:2,receiverID:1,message:"hello",timestamp:"123"},{senderID:1,receiverID:2,message:"thx",timestamp:"123"}]

function Chat({ user}){
    const [message_array, set_message_array] = useState([]); 
    const [message_text, setmessagetext] = useState("");    
    const senderID = user._id

    const receiverID = localStorage.getItem("receiver");
    const receiverName = localStorage.getItem("receivername")
    const [trigger,setTrigger] = useState([]);
    useEffect(() => {
        axios.post(`${connection.connectionURL}/api/messages/getMessages`,{
        senderID: receiverID,
        receiverID:senderID,
        
        })
        .then(res =>{
          set_message_array(res.data)
        }).catch(err => {console.log(err)})
        
    
    },[])
/*      window.addEventListener('click', (event) => {
      sendnewmessage()
      setTrigger(1)
      window.location.reload(true);
    });  */
function sendnewmessage(e){
    e.preventDefault();
   // setTrigger(1)
    
    axios.post(`${connection.connectionURL}/api/messages/sendMessage`,{
        senderID: senderID,
        receiverID:receiverID,
        message:message_text,
        
        })
        .then(res =>{
          console.log("%%%",res,res.senderID,res.receiverID)
        }).catch(err => {console.log(err)})
        window.location.reload(true);

    }

  return(
      
  <div >
  Chat Room<br></br>
      <br></br>
      <br></br>
      <br></br>
    <form >
    <ul className='list-group mb-4'>
 


 <div className="block col-2" >
 <div style={{justifyContent:'center', alignItems:'center'}}>
  
 <table class="center" >
 <tr>
        <div class="messagehead">
         <th >{receiverName} </th>
         </div>
 <br></br>
 </tr>
 <div class="container">
 { message_array.map(item => (
  <tr> 
{item.senderID==senderID ?<div class="sender"> <td style={{textAlign: "left",}}><span  style={{
    backgroundColor:  'dodgerblue',borderRadius: '5px',width: "900px",padding: "10px"
  }}>{item.message}<br></br></span></td></div>  :<div class="receiver"><td style={{textAlign: "right",}}><br></br><span  style={{
    backgroundColor:  'floralwhite',borderRadius: '5px',width: "900px",padding: "10px"
  }}>{item.message}<br></br></span></td></div> }

</tr>

 
))} 
 </div>


</table>  
</div> 
</div>


</ul>
   <div class="messagebox">
<label>
        message:
    </label>
    <form >
         <input
          type="text" data-testid="username" 
          onChange={(event) => {
            setmessagetext(event.target.value);
          }}
        ></input>
        <button className="nav-signup-btn  nav-btn form-input-button" style={{width: "100px",}} onClick={sendnewmessage}> send </button>

    </form>
    <Link to="/allchats">show all my chats</Link>
   </div>
    
</form>  

</div>)
  
}
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null) (Chat);
