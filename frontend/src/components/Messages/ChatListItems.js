import React from 'react'
import {useState,useEffect} from 'react'
import { Navigate } from 'react-router-dom';
import axios from "axios";
function ChatListItems(props){
  const [receiverID, setReceiverID] = useState("");
  const [receivername, setReceiverName] = useState("");
  const [showchattoken, setShowChat] = useState(false);
  useEffect(() => {
    setTimeout(() => {
        {props.users[0]==props.senderID ? setReceiverID(props.users[1]) :setReceiverID(props.users[0])}
    }, 1);
    console.log(props.users,props.senderID,receiverID)
    axios.post('http://localhost:3001'+'/api/messages/getreceivernames',{
        receiverID:receiverID,
        
        })
        .then(res =>{
          console.log(res.data)
          setReceiverName(res.data)
        }).catch(err => {console.log(err)})

   
    },[])

    function showChatRoom(e){
        e.preventDefault();
        console.log(receiverID);
        localStorage.setItem("receiver",receiverID)
        localStorage.setItem("sender",props.senderID)
        setShowChat(true);

    }
  return (
   
      
    <div>
         {showchattoken && <Navigate to="/chat" />}
        <button onClick={showChatRoom}>{receiverID}</button>

        
    </div>
  )
}
export default ChatListItems;