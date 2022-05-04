import React from 'react'
import {useState,useEffect} from 'react'
import { Navigate } from 'react-router-dom';
import axios from "axios";
import connection from "../../config.json";

function ChatListItems(props){
  const [receiverID, setReceiverID] = useState("");
  const [receivername, setReceiverName] = useState("");
  const [showchattoken, setShowChat] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    setTimeout(() => {
        {props.users[0]==props.senderID ? setReceiverID(props.users[1]) :setReceiverID(props.users[0])}
    }, 1);
    console.log(props.users,props.senderID,receiverID)
    axios.post(`${connection.connectionURL}/api/messages/getreceivernames`,{
        receiverID:receiverID,
        },
        { headers: {"Authorization" : `Bearer ${token}`} })
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
         <button style={{
        backgroundColor:  'cornsilk',}} onClick={showChatRoom}> {receiverID}</button>
    <br></br><br></br>
    </div>
  )
}
export default ChatListItems;