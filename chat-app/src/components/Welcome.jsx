import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import FriendRequests from "./FriendRequest";
export default function Welcome({ currentUser }) {
  return (
    <Container>
      <img src={Robot} alt="robot" />
      <h1>
        WELCOME, <span>{currentUser.username}</span>
      </h1>
      <h3>Please select a chat to start conversation.</h3>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;