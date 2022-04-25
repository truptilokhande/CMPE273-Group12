
import { useEffect } from 'react';
import axios from "axios";
import { useState } from "react";
//var allchats_array=[{chatRoomID:1,users:["user1","user2"]},{chatRoomID:2,users:["user3","user1"]},{chatRoomID:3,users:["user1","user4"]}]
console.log("chat")
var my_id = "1"
function AllChats(){
  console.log("chat")
    const [allchats_array, set_allchats_array] = useState([]);    
    useEffect(() => {
        axios.post('http://localhost:3001'+'/api/messages/getChatrooms',{
        senderID: "1",
        })
        .then(res =>{
          console.log(res)
          set_allchats_array(res.data)
        }).catch(err => {console.log(err)})
    
    
    },[])
  return(
  <div>

    All Your Chats
      <br></br>
      <br></br>
      <br></br>
    <form >
    <ul className='list-group mb-4'>
 


 <div className="block col-2" >
 <table class="center">
 <tr>

         <th>all chats</th>
         
 
 </tr>
 { allchats_array.map(item => (
 <tr> 
     
    
      {item.users[0]==my_id?  <td>{item.users[1]}</td>:  <td>{item.users[0]}</td>}

   

</tr> 
))} 
</table>  
</div> 



</ul>
    </form>

    
</div>)
  
}

export default AllChats;
