import { useEffect } from 'react';
import axios from "axios";
import { useState } from "react";
//var message_array=[{senderID:1,receiverID:2,message:"hi",timestamp:"123"},{senderID:2,receiverID:1,message:"hello",timestamp:"123"},{senderID:1,receiverID:2,message:"thx",timestamp:"123"}]

function Chat(){
    console.log("chat")
    const [message_array, set_message_array] = useState([]); 
    const [message_text, setmessagetext] = useState("");    
    
    useEffect(() => {
        axios.post('http://localhost:3001'+'/api/messages/getMessages',{
        senderID: "1",
        receiverID:"2",
        
        })
        .then(res =>{
          console.log(res.data)
          set_message_array(res.data)
        }).catch(err => {console.log(err)})
    
    
    },[])

function sendnewmessage(e){
    e.preventDefault();
console.log(message_text)
    axios.post('http://localhost:3001'+'/api/messages/sendMessage',{
        senderID: "3",
        receiverID:"1",
        message:message_text,
        
        })
        .then(res =>{
          console.log("%%%",res)
        }).catch(err => {console.log(err)})
    

    }
  return(
      
  <div>

      welcome to chat
      <br></br>
      <br></br>
      <br></br>
    <form >
    <ul className='list-group mb-4'>
 


 <div className="block col-2" >
 <table class="center">
 <tr>

         <th>messages</th>
         
 
 </tr>
 { message_array.map(item => (
 <tr> 
    {item.senderID=="1" ?<td style={{textAlign: "left",}}>{item.message}</td> : <td style={{color: "red",textAlign: "right",}}>{item.message}</td>}
  
   

</tr> 
))} 
</table>  
</div> 



</ul>
   
    <label>
        message:
    </label>
    <form>
         <input
          type="text" data-testid="username" 
          onChange={(event) => {
            setmessagetext(event.target.value);
          }}
        ></input>
        <button onClick={sendnewmessage}>send</button>

    </form>
</form>   
</div>)
  
}

export default Chat;
