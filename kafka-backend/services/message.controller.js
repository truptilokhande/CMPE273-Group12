const express = require("express");
const tagsDb = require("../models/TagModel");
const QuestionsDb = require("../models/question.model");
const Chatroom = require("../models/chatroom.model");
const Message = require("../models/message.model");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const getMessages = async (req, res) => {
    return new Promise(async (resolve, reject) => {
    const senderID = req.body.senderID;
    const receiverID = req.body.receiverID;

    const myquery = { users: { $all: [senderID, receiverID] } };
  
  await Chatroom.find(myquery)
    .then((result) => {
      console.log("sending response");
      if (result.length == 0) {
          console.log("No messages available");
      }
      else{
        //   console.log(result);
          const myquery = {chatRoomID : result[0].chatRoomID}
          Message.find(myquery).then((result) => {
              console.log(result);
              resolve(result)
          }).catch((err) => {
              console.log(err);
              
              
          });
      }
    }).catch((err) =>{
console.log(err);
reject(err)
})
    })
}

const sendMessage = async (req, res) =>  {
    return new Promise(async (resolve, reject) => {
    const senderID = req.body.senderID;
    const receiverID = req.body.receiverID;
    const receiverName = req.body.receiverName;
    const senderName = req.body.senderName;
    const mainMessage = req.body.message;
    const timestamp = Date.now();
    console.log(timestamp);
    const myquery = { users: { $all: [senderID, receiverID] } };
    // const myquery1 = {users: senderID}
    // const myquery2 = {users: receiverID}
    await Chatroom.find(myquery)
      .then((result) => {
        console.log("sending response");
        if (result.length == 0) {
          console.log("create new chat room");
          const chatRoomID = Date.now();
          const users = [senderID, receiverID];
          const usernames = [senderName, receiverName];
          const chatRoom = {
            chatRoomID,
            users,
            usernames,
          };
          const newChatRoom = new Chatroom(chatRoom);
          newChatRoom
            .save()
            .then((result) => {
              console.log(result);
              const chatRoomID = result.chatRoomID;
              const timestamp = Date.now();
              const message = mainMessage;
  
              const sentmessage = {
                chatRoomID,
                senderID,
                receiverID,
                message,
                timestamp,
              };
              if(message){
                const saveMessage = new Message(sentmessage);
                saveMessage
                  .save()
                  .then((result) => {
                    console.log(result);
                    resolve("Message saved.");
                  })
                  .catch((err) => {
                    console.log(err);
                  });

              }
              else{
              resolve("No Message Received");

              }
                
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
        } else {
          console.log(result);
          let errMessage = "chatroom already exist";
          console.log(errMessage);
          const chatRoomID = result[0].chatRoomID;
          const timestamp = Date.now();
          const message = mainMessage;
          const sentmessage = {
            chatRoomID,
            senderID,
            receiverID,
            message,
            timestamp,
          };
          if(message){
            const saveMessage = new Message(sentmessage);
            saveMessage
              .save()
              .then((result) => {
                console.log(result);
                resolve("Message saved.");
              })
              .catch((err) => {
                console.log(err);
              });

          }
          else{
          resolve("No Message Received");

          }

        }
      })
      .catch((err) => {
        console.log("sending error");
        reject(err);
      });
    })
  }

const getChatrooms = async(req, res) => {
    return new Promise(async (resolve, reject) => {
    const senderID = req.body.senderID;
    // const receiverID = req.body.receiverID;

    const myquery = { users: { $in: [senderID] } };
  
  await Chatroom.find(myquery)
    .then((result) => {
      console.log("sending response");
      if (result.length == 0) {
          console.log("No chatroom available");
          resolve("No chatrooms available")
      }
      else{
          resolve(result)
      }
    }).catch((err) =>{
console.log(err);
reject(err);
    })
})

 }
  
//   const getChatrooms = async (req, res) => {
//     return new Promise(async (resolve, reject) => {
//     const senderID = req.body.senderID;
//     // const receiverID = req.body.receiverID;

//     const myquery = { users: { $in: [senderID] } };
  
//   await Chatroom.find(myquery)
//     .then((result) => {
//       console.log("sending response");
//       if (result.length == 0) {
//           console.log("No chatroom available");
//           resolve("No chatrooms available")
//       }
//       else{
//           resolve(result)
//       }
//     }).catch((err) =>{
// console.log(err);
// reject(err);
//     })
//     })
// }
const getReceiverNames = async (req, res) => {
    return new Promise(async (resolve, reject) => {
  const receiverID = req.body.receiverID;
  // const receiverID = req.body.receiverID;

  const myquery = { _id: receiverID };
  console.log("%%%%%%%",receiverID)


    try {
      const receiver = await User.findOne(myquery);
      
      resolve({ success: "true", data: receiver });
      !receiver &&
        reject({ success: "false", message: "error fetching users" });
    } catch (err) {
      reject({ success: "false", message: "error fetching users" });
    
    }
    })


}
async function handle_request(msg) {
    if (msg.path === "get-message") {
      return await getMessages(msg);
    } else if (msg.path === "send-message") {
      return await sendMessage(msg);
    } else if (msg.path === "get-chat") {
      return await getChatrooms(msg);
    } else if (msg.path === "get-name") {
      return await getReceiverNames(msg);
    }
  }
  
  module.exports = {
    handle_request,
  };