import React from 'react'
import {useState,useEffect} from 'react'
import { Navigate } from 'react-router-dom';
import axios from "axios";
import connection from "../../config.json";

function ChatListItems(props){
  const [receiverID, setReceiverID] = useState("");
  const [sendername, setSenderName] = useState(props.senderName);
  const [receivername, setReceiverName] = useState("");
  const [showchattoken, setShowChat] = useState(false);
  const token = localStorage.getItem("token");
  const [render,setRender] = useState(false)
  console.log(props.users[0],props.users[1],"se",props.senderID,"props",props.usernames)
  useEffect(() => {
    
    setTimeout(() => {
        {props.users[0]==props.senderID ? setReceiverID(props.users[1]) :setReceiverID(props.users[0])}
        {props.usernames[0]==sendername ? setReceiverName(props.usernames[1]) :setReceiverName(props.usernames[0])}
        console.log(props.users,props.senderID,receiverID,"rname",receivername,props)
        
        setRender(true)

    }, 1);
    

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
         {render&&<button className="nav-signup-btn  nav-btn form-input-button" onClick={showChatRoom}> {receivername}</button>
         }
    <br></br><br></br>
    </div>
  )
}
export default ChatListItems;