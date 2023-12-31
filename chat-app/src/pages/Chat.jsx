import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import styled from "styled-components";
import { contactsRoute,host} from "../utils/api-routes";
import Contacts from "../components/Contacts";
import ChatContainer from "../components/ChatContainer";
import Aside from "../components/Aside";
export default function Chat() {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const leaveChat = ()=>{
    setCurrentChat(undefined)
  }
  const navigate = useNavigate();
  useEffect(() => {
    async function setUser() {
      if (!localStorage.getItem("user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("user")));
        setIsLoaded(true);
      }
    }
    setUser();
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  },[currentUser]);
  useEffect(() => {
    async function setContact() {
      if (currentUser) {
        if (currentUser.isAvatar) {
          const data = await axios.get(`${contactsRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    }
    setContact();
  }, [currentUser]);
  const handleChatChange = (chat) => {
    if (chat) setCurrentChat(chat);
  };
  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {isLoaded && currentChat === undefined ? (
           <Aside currentUser={currentUser}/>
        ) : (
          <ChatContainer currentChat={currentChat} currentUser={currentUser} leaveChat={leaveChat} socket={socket}/>
        )}
      </div>
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
