import React,{useState,useEffect} from "react";
import styled from "styled-components";
import Accept from "../components/Accept";
import Reject from "./Reject";
import axios from "axios";
import SearchUsers from '../components/SearchUsers'
import {addFriendRoute, addRemoveAllRequestsRoute, getNonFriends, removeFriendreqRoute}
 from "../utils/api-routes";
export default function FriendRequest() {
  const [friendRequsts,setFriendRequests] = useState([])
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
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
    async function setNonFriends() {
        if (currentUser) {
          const data = await axios.get(`${getNonFriends}/${currentUser._id}`);
          setFriendRequests(data.data);
        } 
    }
    setNonFriends();
  }, [currentUser,friendRequsts]);
  const addFriend = async (contact) => {
    await axios.post(addFriendRoute, {
      from: currentUser._id,
      to: contact._id,
    });
  };
  const removeFriendreq = async (contact)=>{
    await axios.post(removeFriendreqRoute, {
      from: currentUser._id,
      to: contact._id,
    });
  }
  const addRemoveAll = async(condition)=>{
    await axios.get(`${addRemoveAllRequestsRoute}?userId=${currentUser._id}&condition=${condition}`)
    setFriendRequests([])
  }
  return (
    <>
      <Container>
        <SearchUsers />
        <div className="requests">
          <h3>Friend Requests</h3>
        </div>
        <div className="req-contacts">
          {friendRequsts.map((contact, index) => (
            <div className="req-contact" key={index}>
              <div className="req-avatar">
                <img
                  src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                  alt="avatarImage"
                />
              </div>
              <div className="req-username">
                <h3>{contact.username}</h3>
              </div>
              <div className="icons">
                <Accept handleClick={()=>addFriend(contact)}/>
                <Reject handleClick={()=>removeFriendreq(contact)}/>
              </div>
            </div>
          ))}
        </div>
        <div className="accept-all">
          <h3>
            <span onClick={()=>addRemoveAll("accept")}>Accept</span>/<span onClick={()=>addRemoveAll("reject")}>Reject</span> All
          </h3>
        </div>
      </Container>
    </>
  );
}
const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 40% 10% 40% 10%;
  overflow: hidden;
  background-color: #080420;
  .search {
    form {
      display: flex;
      flex-direction: column;
      background-color: #00000076;
      input {
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #4e0eff;
        border-radius: 0.4rem;
        color: white;
        width: 100%;
        font-size: 1rem;
        &:focus {
          border: 0.1rem solid #997af0;
          outline: none;
        }
      }
    }
  }
  .requests {
    padding: 1.5rem;
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .accept-all {
    padding: 1.5rem;
    h3 {
      color: white;
      text-transform: uppercase;
    }
    span {
      cursor: pointer;
      color: #4e0eff;
    }
  }
  .req-contacts {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .req-contact {
      background-color: #ffffff39;
      min-height: 3rem;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      display: flex;
      align-items: center;
      transition: 0.5s ease-in-out;
      .req-avatar {
        img {
          height: 3rem;
        }
      }
      .req-username {
        display: flex;
        justify-content: end;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        h3 {
          color: white;
        }
      }
      .icons {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;
