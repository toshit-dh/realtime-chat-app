import React,{useState} from 'react'
import styled from 'styled-components'
import Welcome from './Welcome'
import FriendRequest from './FriendRequest'
export default function Aside({currentUser}) {
  return (
    <Container>
            <Welcome currentUser={currentUser}/>
            <FriendRequest />
    </Container>
  )
}
const Container = styled.div`
    height: 85vh;
    width: 100%;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 70% 30%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
`;


