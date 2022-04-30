import { useEffect } from 'react';
import axios from "axios";
import { useState } from "react";
import {Link} from 'react-router-dom';
import "./Chats.css";
//var message_array=[{senderID:1,receiverID:2,message:"hi",timestamp:"123"},{senderID:2,receiverID:1,message:"hello",timestamp:"123"},{senderID:1,receiverID:2,message:"thx",timestamp:"123"}]

function Chat(){
    const [message_array, set_message_array] = useState([]); 
    const [message_text, setmessagetext] = useState("");    
    const senderID = localStorage.getItem("sender");
    const receiverID = localStorage.getItem("receiver");
    useEffect(() => {
        axios.post('http://localhost:3001'+'/api/messages/getMessages',{
        senderID: senderID,
        receiverID:receiverID,
        
        })
        .then(res =>{
          console.log(res.data)
          set_message_array(res.data)
        }).catch(err => {console.log(err)})
        
    
    },[])
console.log(message_array)
function sendnewmessage(e){
    e.preventDefault();
console.log(message_text)
    axios.post('http://localhost:3001'+'/api/messages/sendMessage',{
        senderID: senderID,
        receiverID:receiverID,
        message:message_text,
        
        })
        .then(res =>{
          console.log("%%%",res)
        }).catch(err => {console.log(err)})
    

    }
  return(
      
  <div >

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
         <th >Chat Room</th>
         </div>
 <br></br>
 </tr>
 <div class="container">
 { message_array.map(item => (
 <tr> 
    {item.senderID=="1" ?<div class="sender"> <td style={{textAlign: "left",}}><span  style={{
        backgroundColor:  'white',borderRadius: '5px',width: "900px",padding: "10px"
      }}>{item.message}<br></br></span></td></div>  :<div class="receiver"><td style={{textAlign: "right",}}><span  style={{
        backgroundColor:  'cornsilk',borderRadius: '5px',padding: "10px"
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
        <button onClick={sendnewmessage}>send</button>

    </form>
    <Link to="/allchats">show all my chats</Link>
   </div>
    
</form>  

</div>)
  
}

export default Chat;
