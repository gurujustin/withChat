/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from 'styled-components';
import axios from "axios";
import { io } from "socket.io-client";
import { useFetchTokenFromApi } from '../../hooks/useClient';
import { useWeb3React } from '../../../packages/wagmi/src/useWeb3React';
import { connect, getAllMessagesRoute, sendMessageRoute, host } from '../../utils/apiRoutes'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

const ChatComponent = () => {
  const socket = useRef();
  const scrollRef = useRef();
  const { account, isConnected } = useWeb3React()
  const [currentUser, setCurrentUser] = useState("")
  const pubChat = process.env.PUBLIC_CHAT
  socket.current = io(host);

  useEffect( () => {
    const connectUser = async() => {
      if (isConnected) {
        const { data } = await axios.post(connect, {address: account})
        setCurrentUser(data.user)
      }
    }

    connectUser()
  }, [account])

  useEffect(() => {

    const fetchData = async () => {
      const response = await axios.post(getAllMessagesRoute, {
        sender: currentUser?._id,
      });
      setMessages(response.data);
    }
    fetchData();
  }, [currentUser]);

  // useEffect(()=>{
  //   if(currentUser){
  //     socket.current.emit("add-user", currentUser._id);
  //   }
  //  },[currentUser]);

  const theme = useTheme()
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      sender: currentUser,
      message: msg,
    });
    const updateTime = Date.now()
    socket.current.emit("send-msg", {
      sender: currentUser,
      message: msg,
      updatedAt: updateTime
    });

    const msgs = [...messages];
    msgs.push({
      fromSelf: true,
      message: msg,
      sender: currentUser,
      updatedAt: updateTime
    });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieved", (msg) => {
        // if (msg.sender.address != account) {
        //   setArrivalMessage({
        //     fromSelf: false,
        //     message: msg.message,
        //     sender: msg.sender,
        //     updatedAt: msg.updatedAt
        //   });
        // }
      })
    }
  }, [socket.current, account]);

  useEffect(()=>{
    arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage]);
  },[arrivalMessage]);

  
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <MessageList scrollRef={ scrollRef } messages={ messages } />
      <MessageInput handleSendMsg={handleSendMsg} />
    </>
  );
};

export default ChatComponent;
