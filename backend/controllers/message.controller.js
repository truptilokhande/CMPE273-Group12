const express = require("express");
const tagsDb = require("../models/TagModel");
const QuestionsDb = require("../models/question.model");

exports.getMessages = async (req, res) => {
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
          }).catch((err) => {
              console.log(err);
              
          });
      }
    }).catch((err) =>{
console.log(err);
    })

}


exports.sendMessage = async(req, res) =>  {
    const senderID = req.body.senderID;
    const receiverID = req.body.receiverID;
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
          const chatRoom = {
            chatRoomID,
            users,
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
              const saveMessage = new Message(sentmessage);
              saveMessage
                .save()
                .then((result) => {
                  console.log(result);
                  res.status(200).send("Message saved.");
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
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
          const saveMessage = new Message(sentmessage);
          saveMessage
            .save()
            .then((result) => {
              console.log(result);
              res.status(200).send("Message saved.");
            })
            .catch((err3) => {
              res.status(500).send(err3);
            });
        }
      })
      .catch((err) => {
        console.log("sending error");
        res.status(404).send(err);
      });
  }


  exports.getChatrooms = async(req, res) => {
    const senderID = req.body.senderID;
    // const receiverID = req.body.receiverID;

    const myquery = { users: { $in: [senderID] } };
  
  await Chatroom.find(myquery)
    .then((result) => {
      console.log("sending response");
      if (result.length == 0) {
          console.log("No chatroom available");
          res.status(200).send("No chatrooms available")
      }
      else{
          res.status(200).send(result)
      }
    }).catch((err) =>{
console.log(err);
    })

}
  
