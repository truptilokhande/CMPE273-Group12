
import { useEffect } from 'react';
import axios from "axios";
import { useState } from "react";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import "./Chats.css";
import connection from "../../config.json";

import ChatListItems from './ChatListItems';
console.log("chat")
function AllChats({ user}){
  console.log("chat",user._id,typeof(user._id))
    const [allchats_array, set_allchats_array] = useState([]);    
    const [no_chats, set_nochats] = useState("");
    const token = localStorage.getItem("token");  
    useEffect(() => {
        axios.post(`${connection.connectionURL}/api/messages/getChatrooms`,{
        senderID: user._id,
        },
        { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res =>{
          console.log("allchats",res)
          {res.data=="No chatrooms available"?set_nochats(res.data):
          set_allchats_array(res.data)
        }
        }).catch(err => {console.log(err)})
    
    
    },[])
    const showmessages = (e) => {
      e.preventDefault();
  
    };

  return(
  <div class="allchats">

    All Your Chats
      <br></br>
      <br></br>
      <br></br>
    <form >
    <ul className='list-group mb-4'>
 <div>{no_chats}</div>

 <div className="block col-2" >
    
<table class="center">

 { allchats_array.map(item => (
   <ChatListItems users={item.users} senderID={user._id} senderName={user.name} usernames={item.usernames}/>
))} 
</table>   
</div>




</ul>
    </form>

    
</div>)
  
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(AllChats);